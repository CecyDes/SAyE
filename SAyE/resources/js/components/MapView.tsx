import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const chargingIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1048/1048310.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const batteryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

type ChargingStation = {
  id: number;
  name: string;
  type: 'carga' | 'bateria';
  latitude: number;
  longitude: number;
};

type RoutePoint = {
  latitude: number;
  longitude: number;
};

type Route = {
  id: number;
  name: string;
  points: RoutePoint[];
};

function ResizeMapOnLoad() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
}

export default function MapView() {
  const [chargingStations, setChargingStations] = useState<ChargingStation[]>([]);
  const [route, setRoute] = useState<RoutePoint[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    axios.get('/api/routes').then((res) => setRoutes(res.data));
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/stations')
      .then((res) => setChargingStations(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    const tipo = prompt('¿Qué deseas agregar? (carga / bateria / ruta)');

    if (tipo === 'carga' || tipo === 'bateria') {
      const name = prompt('Nombre del punto:');
      const nuevaEstacion = { name, type: tipo, latitude: lat, longitude: lng };

      axios.post('http://127.0.0.1:8000/api/stations', nuevaEstacion)
        .then((res) => {
          setChargingStations([...chargingStations, res.data]);
        });
    } else if (tipo === 'ruta') {
      const nuevaRuta = [...route, { latitude: lat, longitude: lng }];
      setRoute(nuevaRuta);

      if (nuevaRuta.length >= 2) {
        const nombreRuta = prompt('Nombre de la ruta:');
        axios.post('http://127.0.0.1:8000/api/routes', {
          name: nombreRuta || 'Ruta sin nombre',
          points: nuevaRuta,
        }).then(() => alert('Ruta guardada exitosamente'));
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
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <ResizeMapOnLoad />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />

        {chargingStations.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={station.type === 'bateria' ? batteryIcon : chargingIcon}
            eventHandlers={{
              dblclick: () => {
                const newName = prompt('Nuevo nombre:', station.name);
                const newType = prompt('Nuevo tipo (carga/bateria):', station.type);
                if (newName && (newType === 'carga' || newType === 'bateria')) {
                  axios.put(`http://127.0.0.1:8000/api/stations/${station.id}`, {
                    ...station,
                    name: newName,
                    type: newType,
                  }).then((res) => {
                    setChargingStations((prev) =>
                      prev.map((s) => (s.id === station.id ? res.data : s))
                    );
                  });
                }
              },
            }}
          >
            <Popup>{station.name}</Popup>
          </Marker>
        ))}

        {routes.map((route) => (
          <Polyline
            key={route.id}
            positions={route.points.map((p) => [p.latitude, p.longitude])}
            color={selectedRoute?.id === route.id ? 'red' : 'blue'}
            eventHandlers={{
              click: () => {
                const confirmEdit = confirm(`¿Editar la ruta "${route.name}"?`);
                if (confirmEdit) {
                  setSelectedRoute(route);
                  setRoute(route.points);
                }
              },
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
