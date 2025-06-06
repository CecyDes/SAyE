// resources/js/components/SuppliersMap.tsx

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const supplierIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

type Supplier = {
  id: number;
  name: string;
  component_type: string;
  latitude: number;
  longitude: number;
};

export default function SuppliersMap() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    axios.get('/api/suppliers').then(res => setSuppliers(res.data));
  }, []);

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    const name = prompt('Nombre del proveedor:');
    const component_type = prompt('Tipo de componente (motor, batería, etc):');

    if (name && component_type) {
      axios.post('/api/suppliers', {
        name,
        component_type,
        latitude: lat,
        longitude: lng,
      }).then((res) => {
        setSuppliers([...suppliers, res.data]);
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

        {suppliers.map((supplier) => (
          <Marker
            key={supplier.id}
            position={[supplier.latitude, supplier.longitude]}
            icon={supplierIcon}
            eventHandlers={{
              dblclick: () => {
                const newName = prompt('Nuevo nombre:', supplier.name);
                const newType = prompt('Nuevo tipo de componente:', supplier.component_type);
                if (newName && newType) {
                  axios.put(`/api/suppliers/${supplier.id}`, {
                    ...supplier,
                    name: newName,
                    component_type: newType,
                  }).then((res) => {
                    setSuppliers(prev =>
                      prev.map(s => (s.id === supplier.id ? res.data : s))
                    );
                  });
                }
              },
            }}
          >
            <Popup>
              <b>{supplier.name}</b><br />
              Componente: {supplier.component_type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
