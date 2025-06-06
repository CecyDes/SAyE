import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import FactoryList from '../components/FactoriesMap';
import DistributorList from '../components/DistributorsMap';
import SupplierList from '../components/SuppliersMap';
import AssemblyStationList from '../components/AssemblyStationsMap';
import ShipmentList from '../components/ShipmentMap';
import ChargingStationList from '../components/ChargingStationList';
import RouteList from '../components/RouteList';

export default function Dashboard() {
  const [tab, setTab] = useState('charging-stations');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Control</h1>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1">
          <TabsTrigger value="charging-stations">Estaciones</TabsTrigger>
          <TabsTrigger value="routes">Rutas</TabsTrigger>
          <TabsTrigger value="factories">Fábricas</TabsTrigger>
          <TabsTrigger value="distributors">Distribuidores</TabsTrigger>
          <TabsTrigger value="suppliers">Proveedores</TabsTrigger>
          <TabsTrigger value="assembly-stations">Ensamble</TabsTrigger>
          <TabsTrigger value="shipments">Envíos</TabsTrigger>
        </TabsList>

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
      </Tabs>
    </div>
  );
}
