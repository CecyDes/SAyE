import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaIndustry, FaCogs } from 'react-icons/fa';

interface AssemblyStation {
  id: number;
  name: string;
  location?: string;
  capacity?: number;
}

export default function AssemblyStationList() {
  const [stations, setStations] = useState<AssemblyStation[]>([]);

  useEffect(() => {
    fetch('/api/assembly-stations')
      .then((res) => res.json())
      .then((data) => setStations(data));
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <FaIndustry className="text-indigo-600" /> Estaciones de Ensamble
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-indigo-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Ubicación</th>
              <th className="px-4 py-2 text-left">Capacidad</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, index) => (
              <tr
                key={station.id}
                className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="px-4 py-2 font-medium text-gray-900">{station.name}</td>
                <td className="px-4 py-2 text-gray-600 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  {station.location || 'No disponible'}
                </td>
                <td className="px-4 py-2 text-gray-600 flex items-center gap-2">
                  <FaCogs className="text-green-600" />
                  {station.capacity ?? 'N/A'}
                </td>
              </tr>
            ))}

            {stations.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No hay estaciones registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}