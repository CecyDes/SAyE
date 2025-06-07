import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, Popup, Tooltip } from 'react-leaflet';
import * as L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const factoryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/891/891419.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

type Factory = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

type AssemblyStation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

type Shipment = {
  id: number;
  factory_id: number;
  assembly_station_id: number;
  component: string;
  factory: Factory;
  assembly_station: AssemblyStation;
};

export default function ShipmentsMap() {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [assemblies, setAssemblies] = useState<AssemblyStation[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedFactory, setSelectedFactory] = useState<Factory | null>(null);

  useEffect(() => {
    axios.get('/api/factories').then(res => setFactories(res.data));
    axios.get('/api/assembly-stations').then(res => setAssemblies(res.data));
    axios.get('/api/shipments').then(res => setShipments(res.data));
  }, []);

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    if (!selectedFactory) {
      const nearestFactory = factories.find(
        (f) => Math.abs(f.latitude - lat) < 0.01 && Math.abs(f.longitude - lng) < 0.01
      );
      if (nearestFactory) {
        setSelectedFactory(nearestFactory);
        alert(`Fábrica seleccionada: ${nearestFactory.name}`);
      }
    } else {
      const nearestAssembly = assemblies.find(
        (a) => Math.abs(a.latitude - lat) < 0.01 && Math.abs(a.longitude - lng) < 0.01
      );
      if (nearestAssembly) {
        const component = prompt('¿Qué componente se envía?');
        if (component) {
          axios.post('/api/shipments', {
            factory_id: selectedFactory.id,
            assembly_station_id: nearestAssembly.id,
            component,
          }).then(res => {
            setShipments([...shipments, res.data]);
            setSelectedFactory(null);
            alert('Envío registrado');
          });
        }
      }
    }
  };

  function MapClickHandler() {
    useMapEvents({ click: handleMapClick });
    return null;
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[19.4326, -99.1332]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />

        {factories.map((factory) => (
          <Marker
            key={factory.id}
            position={[factory.latitude, factory.longitude]}
            icon={factoryIcon}
          >
            <Popup>
              <b>Fábrica:</b> {factory.name}
            </Popup>
          </Marker>
        ))}

        {shipments.map((shipment) => (
          <Polyline
            key={shipment.id}
            positions={[
              [shipment.factory.latitude, shipment.factory.longitude],
              [shipment.assembly_station.latitude, shipment.assembly_station.longitude],
            ]}
            pathOptions={{ color: 'orange', weight: 4, dashArray: '5, 5' }}
          >
            <Tooltip sticky>
              Componente: <b>{shipment.component}</b><br />
              Origen: {shipment.factory.name}<br />
              Destino: {shipment.assembly_station.name}
            </Tooltip>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
}