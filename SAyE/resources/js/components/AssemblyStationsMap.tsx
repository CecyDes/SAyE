import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import * as L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const assemblyIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2563/2563827.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

type AssemblyStation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export default function AssemblyStationsMap() {
  const [stations, setStations] = useState<AssemblyStation[]>([]);

  useEffect(() => {
    axios.get('/api/assembly-stations').then((res) => setStations(res.data));
  }, []);

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    const name = prompt('Nombre de la estación de ensamblaje:');

    if (name) {
      axios
        .post('/api/assembly-stations', {
          name,
          latitude: lat,
          longitude: lng,
        })
        .then((res) => {
          setStations([...stations, res.data]);
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

        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.latitude, station.longitude]}
            icon={assemblyIcon}
            eventHandlers={{
              dblclick: () => {
                const newName = prompt('Nuevo nombre:', station.name);
                if (newName) {
                  axios
                    .put(`/api/assembly-stations/${station.id}`, {
                      ...station,
                      name: newName,
                    })
                    .then((res) => {
                      setStations((prev) =>
                        prev.map((s) => (s.id === station.id ? res.data : s))
                      );
                    });
                }
              },
            }}
          >
            <Popup>
              <b>{station.name}</b>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
