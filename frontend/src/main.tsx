import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeGA, initWebVitalsMonitoring } from './utils/analytics';

// Measurement ID - would come from environment variables in a real app
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Render the app immediately without waiting for analytics
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Defer analytics initialization until after content renders
// This improves Largest Contentful Paint (LCP) by reducing render-blocking operations
const deferAnalytics = () => {
  // Initialize analytics with deferred loading
  initializeGA(GA_MEASUREMENT_ID, false);
  initWebVitalsMonitoring(false);
};

// Use requestIdleCallback or fallback to setTimeout for deferring non-critical operations
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(deferAnalytics, { timeout: 4000 });
  } else {
    // Wait until first meaningful paint is likely complete
    setTimeout(deferAnalytics, 2000);
  }
}
