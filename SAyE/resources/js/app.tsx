import './bootstrap';
import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './AppLayout';

import Dashboard from './components/Dashboard';
import FactoryList from './components/FactoriesMap';
import DistributorList from './components/DistributorsMap';
import SupplierList from './components/SuppliersMap';
import AssemblyStationList from './components/AssemblyStationsMap';
import ShipmentList from './components/ShipmentMap';
import MapView from './components/MapView';

const App = () => (
  <Router>
    <AppLayout>
      <Routes>
        <Route path="/map" element={<MapView />} />
        <Route path="/factories" element={<FactoryList />} />
        <Route path="/distributors" element={<DistributorList />} />
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/assembly-stations" element={<AssemblyStationList />} />
        <Route path="/shipments" element={<ShipmentList />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AppLayout>
  </Router>
);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);