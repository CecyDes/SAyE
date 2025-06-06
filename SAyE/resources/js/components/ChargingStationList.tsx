import React, { useEffect, useState } from 'react';
import axios from 'axios';

type ChargingStation = {
  id: number;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
};

export default function ChargingStationList() {
  const [stations, setStations] = useState<ChargingStation[]>([]);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const res = await axios.get('/api/stations');
      setStations(res.data);
    } catch (err) {
      console.error('Error al obtener estaciones:', err);
    }
  };

  const deleteStation = async (id: number) => {
    if (confirm('¿Seguro que deseas eliminar esta estación?')) {
      try {
        await axios.delete(`/api/stations/${id}`);
        fetchStations();
      } catch (err) {
        console.error('Error al eliminar estación:', err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Estaciones de Carga</h2>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Latitud</th>
            <th className="border px-4 py-2">Longitud</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr key={station.id}>
              <td className="border px-4 py-2">{station.id}</td>
              <td className="border px-4 py-2">{station.name}</td>
              <td className="border px-4 py-2">{station.type}</td>
              <td className="border px-4 py-2">{station.latitude}</td>
              <td className="border px-4 py-2">{station.longitude}</td>
              <td className="border px-4 py-2 space-x-2">
                {/* Aquí podrías agregar edición si gustas */}
                <button
                  onClick={() => deleteStation(station.id)}
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
