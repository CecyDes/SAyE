import { useEffect, useState } from 'react';
import { FaBox, FaMapMarkerAlt, FaTruck, FaIndustry } from 'react-icons/fa';

interface Shipment {
  id: number;
  component_type: string;
  quantity: number;
  shipped_at?: string;
  delivered_at?: string;
  supplier?: { name: string };
  distributor?: { name: string };
  assembly_station?: { name: string };
}

export default function ShipmentList() {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    fetch('/api/shipments')
      .then((res) => res.json())
      .then((data) => setShipments(data));
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <FaTruck className="text-indigo-600" /> Envíos Registrados
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Componente</th>
              <th className="px-4 py-2 text-left">Cantidad</th>
              <th className="px-4 py-2 text-left">Proveedor</th>
              <th className="px-4 py-2 text-left">Distribuidor</th>
              <th className="px-4 py-2 text-left">Estación de Ensamble</th>
              <th className="px-4 py-2 text-left">Enviado</th>
              <th className="px-4 py-2 text-left">Entregado</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment, index) => (
              <tr
                key={shipment.id}
                className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-2">
                  <FaBox className="text-blue-600" />
                  {shipment.component_type}
                </td>
                <td className="px-4 py-2">{shipment.quantity}</td>
                <td className="px-4 py-2 text-gray-700">
                  <FaIndustry className="inline-block mr-1 text-gray-500" />
                  {shipment.supplier?.name || 'N/A'}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  <FaMapMarkerAlt className="inline-block mr-1 text-gray-500" />
                  {shipment.distributor?.name || 'N/A'}
                </td>
                <td className="px-4 py-2 text-gray-700">
                  <FaMapMarkerAlt className="inline-block mr-1 text-gray-500" />
                  {shipment.assembly_station?.name || 'N/A'}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {shipment.shipped_at ? new Date(shipment.shipped_at).toLocaleDateString() : '—'}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {shipment.delivered_at ? new Date(shipment.delivered_at).toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}

            {shipments.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No hay envíos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}