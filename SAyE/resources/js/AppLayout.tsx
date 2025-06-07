import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaMapMarkedAlt,
  FaIndustry,
  FaWarehouse,
  FaTruck,
  FaTools,
  FaThList,
  FaTachometerAlt,
} from 'react-icons/fa';

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();

   const navItems = [
      { to: '/map', label: 'Mapa', icon: <FaMapMarkedAlt /> },
      { to: '/factories', label: 'Fábricas', icon: <FaIndustry /> },
      { to: '/distributors', label: 'Distribuidores', icon: <FaWarehouse /> },
      { to: '/suppliers', label: 'Proveedores', icon: <FaTruck /> },
      { to: '/assembly-stations', label: 'Estaciones de Ensamble', icon: <FaTools /> },
      { to: '/shipments', label: 'Envíos', icon: <FaThList /> },
      { to: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
    ];

  return (
    <div className="flex flex-col h-screen font-sans">
      <header className="bg-[#661923] text-white p-4 text-center text-2xl font-bold shadow-md">
        <h1 className="text-3xl font-semibold"> 🚗 Proyecciones Proyecto Olina 🚗</h1>
      </header>

      <nav className="flex flex-wrap gap-4 bg-white px-6 py-3 shadow items-center justify-center text-xl font-medium">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
              location.pathname === item.to
                ? 'bg-indigo-100 text-indigo-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <main className="flex-1 overflow-auto bg-gray-50 p-4">{children}</main>
    </div>
  );
}

