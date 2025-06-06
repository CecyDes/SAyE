// resources/js/components/DistributorsMap.tsx

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const distributorIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/535/535137.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

type Distributor = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export default function DistributorsMap() {
  const [distributors, setDistributors] = useState<Distributor[]>([]);

  useEffect(() => {
    axios.get('/api/distributors').then(res => setDistributors(res.data));
  }, []);

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    const name = prompt('Nombre del distribuidor:');

    if (name) {
      axios.post('/api/distributors', {
        name,
        latitude: lat,
        longitude: lng,
      }).then((res) => {
        setDistributors([...distributors, res.data]);
      });
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
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />

        {distributors.map((distributor) => (
          <Marker
            key={distributor.id}
            position={[distributor.latitude, distributor.longitude]}
            icon={distributorIcon}
            eventHandlers={{
              dblclick: () => {
                const newName = prompt('Nuevo nombre:', distributor.name);
                if (newName) {
                  axios.put(`/api/distributors/${distributor.id}`, {
                    ...distributor,
                    name: newName,
                  }).then((res) => {
                    setDistributors(prev =>
                      prev.map(d => (d.id === distributor.id ? res.data : d))
                    );
                  });
                }
              },
            }}
          >
            <Popup>
              <b>{distributor.name}</b>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
