import React from 'react';
import StatsView from './components/StatsView';
import MapView from './components/MapView';
import StationList from './components/StationList';
import RouteList from './components/RouteList';

export default function App() {
  return (
    <div className="flex flex-col h-screen font-sans">
      <header className="bg-indigo-600 text-white p-4 text-center text-2xl font-bold shadow-md">
        Planificación Urbana para Vehículos Eléctricos
      </header>

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
