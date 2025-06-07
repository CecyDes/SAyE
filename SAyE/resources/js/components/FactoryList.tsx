import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaIndustry } from 'react-icons/fa';

interface Factory {
  id: number;
  name: string;
  location?: string;
  capacity?: number;
}

export default function FactoryList() {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/factories')
      .then(response => {
        setFactories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar fábricas:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <FaIndustry className="text-indigo-600" />
        Fábricas Registradas
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando fábricas...</p>
      ) : factories.length === 0 ? (
        <p className="text-gray-500">No hay fábricas registradas.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {factories.map(factory => (
            <li
              key={factory.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-1">{factory.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Ubicación:</strong> {factory.location || 'No especificada'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Capacidad:</strong> {factory.capacity ?? 'No especificada'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}