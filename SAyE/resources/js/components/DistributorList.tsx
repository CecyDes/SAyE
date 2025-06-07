import { useEffect, useState } from 'react';
import { FaTruckLoading } from 'react-icons/fa';

interface Distributor {
  id: number;
  name: string;
  location?: string;
  capacity?: number;
}

export default function DistributorList() {
  const [distributors, setDistributors] = useState<Distributor[]>([]);

  useEffect(() => {
    fetch('/api/distributors')
      .then((res) => res.json())
      .then((data) => setDistributors(data));
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <FaTruckLoading className="text-indigo-600" /> Distribuidores Registrados
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {distributors.map((distributor) => (
          <li
            key={distributor.id}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-1">{distributor.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Ubicación:</strong>{' '}
              {distributor.location || 'No especificada'}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Capacidad:</strong>{' '}
              {distributor.capacity ? `${distributor.capacity} unidades` : 'No especificada'}
            </p>
          </li>
        ))}
        {distributors.length === 0 && (
          <li className="col-span-full text-center text-gray-500">
            No hay distribuidores disponibles.
          </li>
        )}
      </ul>
    </div>
  );
}