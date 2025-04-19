import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeGA, initWebVitalsMonitoring } from './utils/analytics';

// Initialize Google Analytics with a placeholder measurement ID
// In a real app, this would come from environment variables
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
initializeGA(GA_MEASUREMENT_ID);

// Initialize Web Vitals monitoring
initWebVitalsMonitoring();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
