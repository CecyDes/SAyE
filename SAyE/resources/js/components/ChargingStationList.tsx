import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChargingStation } from 'react-icons/fa';

interface ChargingStation {
  id: number;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
}

export default function ChargingStationList() {
  const [stations, setStations] = useState<ChargingStation[]>([]);

  useEffect(() => {
    axios
      .get('/api/stations')
      .then((res) => setStations(res.data))
      .catch((err) => console.error('Error al cargar estaciones:', err));
  }, []);

  const formatCoords = (coord: any) => typeof coord === 'number' ? coord.toFixed(6) : Number(coord).toFixed(6);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FaChargingStation className="text-indigo-600 text-xl" />
        <h2 className="text-2xl font-bold text-gray-800">Estaciones de Carga</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-md text-sm shadow-sm">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800">
              <th className="px-3 py-2 text-left">Nombre</th>
              <th className="px-3 py-2 text-left">Tipo</th>
              <th className="px-3 py-2 text-left">Latitud</th>
              <th className="px-3 py-2 text-left">Longitud</th>
            </tr>
          </thead>
          <tbody>
            {stations.length > 0 ? (
              stations.map((station) => (
                <tr key={station.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-t">{station.name}</td>
                  <td className="px-3 py-2 border-t">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs font-medium ${
                        station.type === 'carga'
                          ? 'bg-blue-500'
                          : station.type === 'bateria'
                          ? 'bg-green-500'
                          : 'bg-gray-400'
                      }`}
                    >
                      {station.type}
                    </span>
                  </td>
                  <td className="px-3 py-2 border-t">{formatCoords(station.latitude)}</td>
                  <td className="px-3 py-2 border-t">{formatCoords(station.longitude)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
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