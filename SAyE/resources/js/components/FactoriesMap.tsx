import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import * as L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const factoryIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1483/1483645.png',
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

export default function FactoriesMap() {
  const [factories, setFactories] = useState<Factory[]>([]);

  useEffect(() => {
    axios.get('/api/factories').then((res) => setFactories(res.data));
  }, []);

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    const name = prompt('Nombre de la fábrica:');

    if (name) {
      axios
        .post('/api/factories', {
          name,
          latitude: lat,
          longitude: lng,
        })
        .then((res) => {
          setFactories([...factories, res.data]);
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

        {factories.map((factory) => (
          <Marker
            key={factory.id}
            position={[factory.latitude, factory.longitude]}
            icon={factoryIcon}
            eventHandlers={{
              dblclick: () => {
                const newName = prompt('Nuevo nombre:', factory.name);
                if (newName) {
                  axios
                    .put(`/api/factories/${factory.id}`, {
                      ...factory,
                      name: newName,
                    })
                    .then((res) => {
                      setFactories((prev) =>
                        prev.map((f) => (f.id === factory.id ? res.data : f))
                      );
                    });
                }
              },
            }}
          >
            <Popup>
              <b>{factory.name}</b>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
