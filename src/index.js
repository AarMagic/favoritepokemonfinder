import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterPrincipal } from './routers/RouterPrincipal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterPrincipal />
  </React.StrictMode>
);
