// resources/js/components/ShipmentsMap.tsx

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const factoryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/809/809957.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const assemblyIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2942/2942846.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
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
    axios.get('/api/factories').then((res) => setFactories(res.data));
    axios.get('/api/assembly-stations').then((res) => setAssemblies(res.data));
    axios.get('/api/shipments').then((res) => setShipments(res.data));
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
          axios
            .post('/api/shipments', {
              factory_id: selectedFactory.id,
              assembly_station_id: nearestAssembly.id,
              component,
            })
            .then((res) => {
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
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[19.4326, -99.1332]}
        zoom={12}
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
            <Popup>{factory.name}</Popup>
          </Marker>
        ))}

        {assemblies.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={assemblyIcon}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        ))}

        {shipments.map((shipment) => (
          <Polyline
            key={shipment.id}
            positions={[
              [shipment.factory.latitude, shipment.factory.longitude],
              [shipment.assembly_station.latitude, shipment.assembly_station.longitude],
            ]}
            color="green"
          />
        ))}
      </MapContainer>
    </div>
  );
}
