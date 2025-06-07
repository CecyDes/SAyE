import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import FactoryList from './FactoryList';
import DistributorList from './DistributorList';
import SupplierList from './SupplierList';
import AssemblyStationList from './AssemblyStationList';
import ShipmentList from './ShipmentList';
import ChargingStationList from './ChargingStationList';
import RouteList from './RouteList';

import {
  FaChargingStation,
  FaRoute,
  FaIndustry,
  FaWarehouse,
  FaTruckLoading,
  FaTools,
  FaBoxes,
} from 'react-icons/fa';

export default function Dashboard() {
  const [tab, setTab] = useState('charging-stations');

  const tabs = [
    { label: 'Estaciones', value: 'charging-stations', icon: <FaChargingStation /> },
    { label: 'Rutas', value: 'routes', icon: <FaRoute /> },
    { label: 'Fábricas', value: 'factories', icon: <FaIndustry /> },
    { label: 'Distribuidores', value: 'distributors', icon: <FaWarehouse /> },
    { label: 'Proveedores', value: 'suppliers', icon: <FaTruckLoading /> },
    { label: 'Ensamble', value: 'assembly-stations', icon: <FaTools /> },
    { label: 'Envíos', value: 'shipments', icon: <FaBoxes /> },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Control</h1>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        {/* SIN fondo gris */}
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-6 bg-transparent">
          {tabs.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="flex flex-col items-center justify-center p-3 rounded-md text-sm text-gray-600 hover:bg-gray-100 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="mt-1">{item.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

       
        <div className="mt-12">
          <TabsContent value="charging-stations">
            <ChargingStationList />
          </TabsContent>

          <TabsContent value="routes">
            <RouteList />
          </TabsContent>

          <TabsContent value="factories">
            <FactoryList />
          </TabsContent>

          <TabsContent value="distributors">
            <DistributorList />
          </TabsContent>

          <TabsContent value="suppliers">
            <SupplierList />
          </TabsContent>

          <TabsContent value="assembly-stations">
            <AssemblyStationList />
          </TabsContent>

          <TabsContent value="shipments">
            <ShipmentList />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}