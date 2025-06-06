import React from 'react';

interface SidebarProps {
  setView: (view: 'mapa' | 'estadisticas' | 'rv') => void;
}

export default function Sidebar({ setView }: SidebarProps) {
  return (
    <div className="w-48 bg-gray-800 text-white p-4 flex flex-col space-y-4">
      <h2 className="text-xl font-bold mb-4">C Carga</h2>
      <button onClick={() => setView('mapa')} className="hover:bg-gray-700 rounded px-3 py-2 text-left">
        Mapa
      </button>
      <button onClick={() => setView('estadisticas')} className="hover:bg-gray-700 rounded px-3 py-2 text-left">
        Estadísticas
      </button>
      <button onClick={() => setView('rv')} className="hover:bg-gray-700 rounded px-3 py-2 text-left">
        Vista RV
      </button>
    </div>
  );
}
