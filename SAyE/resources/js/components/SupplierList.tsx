import { useEffect, useState } from 'react';
import { FaIndustry, FaCheckCircle } from 'react-icons/fa';

interface Supplier {
  id: number;
  name: string;
  component_type: string;
  reliability?: number; // 1 a 5 por ejemplo
}

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    fetch('/api/suppliers')
      .then((res) => res.json())
      .then((data) => setSuppliers(data));
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <FaIndustry className="text-indigo-600" /> Lista de Proveedores
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suppliers.map((supplier) => (
          <li
            key={supplier.id}
            className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-indigo-700 mb-1">{supplier.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Producto: <span className="font-medium">{supplier.component_type}</span>
            </p>

            <div className="text-sm text-gray-600 flex items-center gap-2">
              Confiabilidad:
              {[...Array(5)].map((_, i) => (
                <FaCheckCircle
                  key={i}
                  className={i < (supplier.reliability ?? 0) ? 'text-green-500' : 'text-gray-300'}
                />
              ))}
            </div>
          </li>
        ))}
        {suppliers.length === 0 && (
          <li className="col-span-full text-center text-gray-500">No hay proveedores registrados.</li>
        )}
      </ul>
    </div>
  );
}