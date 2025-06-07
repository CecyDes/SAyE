import { useEffect, useState } from 'react';
import axios from 'axios';

type ChargingStation = {
  id: number;
  name: string;
  type: 'carga' | 'bateria';
  latitude: number;
  longitude: number;
};

export default function StationList() {
  const [stations, setStations] = useState<ChargingStation[]>([]);

  useEffect(() => {
    axios.get('/api/stations').then((res) => setStations(res.data));
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta estación?')) {
      axios.delete(`/api/stations/${id}`).then(() => {
        setStations((prev) => prev.filter((s) => s.id !== id));
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Lista de Estaciones</h3>
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Latitud</th>
            <th className="p-2 text-left">Longitud</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr key={station.id} className="border-b">
              <td className="p-2">{station.name}</td>
              <td className="p-2 capitalize">{station.type}</td>
              <td className="p-2">{station.latitude.toFixed(6)}</td>
              <td className="p-2">{station.longitude.toFixed(6)}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(station.id)}
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
