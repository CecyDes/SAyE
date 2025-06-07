import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkedAlt } from 'react-icons/fa';

interface Route {
  id: number;
  name: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
}

export default function RouteList() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/routes')
      .then((response) => {
        setRoutes(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar las rutas:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaMapMarkedAlt className="text-indigo-600" /> Lista de Rutas
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando rutas...</p>
      ) : routes.length === 0 ? (
        <p className="text-gray-500 italic">No hay rutas registradas.</p>
      ) : (
        <div className="space-y-4">
          {routes.map((route) => (
            <div
              key={route.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-indigo-700">{route.name || `Ruta #${route.id}`}</h3>
              <div className="text-sm text-gray-700 mt-1">
                <p><strong>Origen:</strong> ({route.origin_latitude}, {route.origin_longitude})</p>
                <p><strong>Destino:</strong> ({route.destination_latitude}, {route.destination_longitude})</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}