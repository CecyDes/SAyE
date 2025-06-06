import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Route = {
  id: number;
  name: string;
  points: { latitude: number; longitude: number }[];
};

export default function RouteList() {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    axios.get('/api/routes').then((res) => setRoutes(res.data));
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta ruta?')) {
      axios.delete(`/api/routes/${id}`).then(() => {
        setRoutes((prev) => prev.filter((r) => r.id !== id));
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Lista de Rutas</h3>
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Puntos</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route.id} className="border-b">
              <td className="p-2">{route.name}</td>
              <td className="p-2">{route.points.length}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(route.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
