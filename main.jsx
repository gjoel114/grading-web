import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import router
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>   {/* ✅ Wrap everything here */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
