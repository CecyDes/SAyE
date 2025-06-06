import './bootstrap';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Appp';
import '../css/app.css';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
