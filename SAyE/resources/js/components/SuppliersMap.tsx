import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import * as L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Dialog } from '@headlessui/react';

const supplierIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [35, 35],
  iconAnchor: [17.5, 35],
  popupAnchor: [0, -30],
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier> & { latitude: number; longitude: number }>({
    name: '',
    component_type: '',
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    axios.get('/api/suppliers').then(res => setSuppliers(res.data));
  }, []);

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setNewSupplier({ name: '', component_type: '', latitude: lat, longitude: lng });
    setDialogOpen(true);
  };

  const saveSupplier = async () => {
    if (!newSupplier.name || !newSupplier.component_type) return;

    const res = await axios.post('/api/suppliers', newSupplier);
    setSuppliers([...suppliers, res.data]);
    setDialogOpen(false);
  };

  function MapClickHandler() {
    useMapEvents({ click: handleMapClick });
    return null;
  }

  const updateSupplier = async (supplier: Supplier) => {
    const newName = prompt('Nuevo nombre del proveedor:', supplier.name);
    const newType = prompt('Nuevo tipo de componente:', supplier.component_type);
    if (newName && newType) {
      const res = await axios.put(`/api/suppliers/${supplier.id}`, {
        ...supplier,
        name: newName,
        component_type: newType,
      });
      setSuppliers(prev => prev.map(s => (s.id === supplier.id ? res.data : s)));
    }
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[19.4326, -99.1332]}
        zoom={12}
        className="z-0"
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
              dblclick: () => updateSupplier(supplier),
            }}
          >
            <Popup>
              <div className="text-sm">
                <strong className="text-indigo-600">{supplier.name}</strong><br />
                <span className="text-gray-700">Componente:</span> {supplier.component_type}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modal para agregar proveedor */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md space-y-4">
            <Dialog.Title className="text-lg font-bold text-gray-800">Agregar Proveedor</Dialog.Title>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Nombre del proveedor"
                className="w-full p-2 border rounded"
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Tipo de componente"
                className="w-full p-2 border rounded"
                value={newSupplier.component_type}
                onChange={(e) => setNewSupplier({ ...newSupplier, component_type: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setDialogOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
              <button onClick={saveSupplier} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Guardar</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}