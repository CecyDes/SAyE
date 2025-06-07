import { useEffect, useState } from 'react';
import axios from 'axios';

type ChargingStation = {
  id: number;
  name: string;
  type: 'carga' | 'bateria';
};

type Route = {
  id: number;
  name: string;
  points: { latitude: number; longitude: number }[];
};

export default function StatsView() {
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    axios.get('/api/stations').then((res) => setStations(res.data));
    axios.get('/api/routes').then((res) => setRoutes(res.data));
  }, []);

  const cargaCount = stations.filter((s) => s.type === 'carga').length;
  const bateriaCount = stations.filter((s) => s.type === 'bateria').length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Estadísticas</h2>

      <div className="bg-white p-4 rounded shadow">
        <p><strong>Total de estaciones:</strong> {stations.length}</p>
        <p><strong>Tipo carga:</strong> {cargaCount}</p>
        <p><strong>Tipo batería:</strong> {bateriaCount}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <p><strong>Rutas Existentes:</strong> {routes.length}</p>
      </div>
    </div>
  );
}
