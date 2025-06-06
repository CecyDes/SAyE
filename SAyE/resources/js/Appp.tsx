import * as React from 'react';
import StatsView from './components/StatsView';
import MapView from './components/MapView';
import StationList from './components/StationList';
import RouteList from './components/RouteList';
import { Link } from '@inertiajs/react';
// @ts-ignore
import route from 'ziggy-js';


export default function App() {
  return (
    <div className="flex flex-col h-screen font-sans">
      <header className="bg-indigo-600 text-white p-4 text-center text-2xl font-bold shadow-md">
        Planificación Urbana para Vehículos Eléctricos
      </header>
      
      <nav className="flex space-x-4 bg-white px-4 py-2 shadow">
        <Link href={route('map.view')}>Mapa</Link>
        <Link href={route('factories.index')}>Fábricas</Link>
        <Link href={route('distributors.index')}>Distribuidores</Link>
        <Link href={route('suppliers.index')}>Proveedores</Link>
        <Link href={route('assembly-stations.index')}>Estaciones de Ensamble</Link>
        <Link href={route('shipments.index')}>Envíos</Link>
        <Link href={route('dashboard.index')} className="text-indigo-600 font-semibold">
          Dashboard
        </Link>
      </nav>

      <main className="flex flex-1 overflow-hidden">
        <section className="w-2/3 h-full border-r border-gray-300">
          <MapView />
        </section>

        <aside className="w-1/3 overflow-y-auto bg-gray-50 p-6">
          
          <StatsView />
          <StationList />
          <RouteList />
        </aside>
      </main>
    </div>
  );
}
