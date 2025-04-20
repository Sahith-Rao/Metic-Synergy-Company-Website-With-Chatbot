// Define metric type for web-vitals
interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  delta: number;
}

// Define our own report handler type
type MetricReportHandler = (metric: WebVitalsMetric) => void;

// Type definition for Google Analytics
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

/**
 * Initialize Google Analytics with performance optimization
 * @param measurementId - GA Measurement ID (e.g., 'G-XXXXXXXXXX')
 * @param immediate - Whether to load immediately (default: false)
 */
export const initializeGA = (measurementId: string, immediate = false): void => {
  // Only initialize in production and if not already loaded
  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics tracking disabled in development mode');
    return;
  }

  // Check if analytics is already loaded
  if (typeof window !== 'undefined' && window.gtag !== undefined) {
    console.log('Analytics already initialized');
    return;
  }

  // Function to actually load the analytics scripts
  const loadAnalytics = () => {
    try {
      // Create script elements
      const script1 = document.createElement('script');
      script1.async = true;
      script1.defer = true; // Add defer attribute
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', { 
          send_page_view: false,
          anonymize_ip: true
        });
      `;

      // Append to document head
      document.head.appendChild(script1);
      document.head.appendChild(script2);
      
      console.log('Analytics initialized successfully');
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  };

  // Determine when to load analytics based on network and immediate flag
  if (immediate) {
    // Load immediately if requested
    loadAnalytics();
  } else {
    // Check if requestIdleCallback is available
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      // Use requestIdleCallback to defer loading until browser is idle
      window.requestIdleCallback(() => loadAnalytics(), { timeout: 5000 });
    } else {
      // Fallback to setTimeout for browsers without requestIdleCallback
      setTimeout(loadAnalytics, 2000); // Defer by 2 seconds
    }
  }
};

/**
 * Track page views in Google Analytics
 * @param path - Current page path
 * @param title - Page title
 */
export const trackPageView = (path: string, title: string): void => {
  if (!window.gtag) return;
  
  try {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_path: path
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

/**
 * Track custom events in Google Analytics
 * @param category - Event category
 * @param action - Event action
 * @param label - Event label (optional)
 * @param value - Event value (optional)
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  if (!window.gtag) return;
  
  try {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

/**
 * Track 404 errors
 * @param path - Path that resulted in 404
 * @param referrer - Referring URL (if available)
 */
export const track404Error = (path: string, referrer?: string): void => {
  if (!window.gtag) return;
  
  try {
    window.gtag('event', '404_error', {
      event_category: 'Error',
      event_label: path,
      referrer: referrer || document.referrer || 'direct'
    });
    
    // Also log to console for development
    console.warn(`404 Error: ${path} (Referrer: ${referrer || document.referrer || 'direct'})`);
  } catch (error) {
    console.error('Error tracking 404:', error);
  }
};

/**
 * Report Core Web Vitals metrics to Google Analytics
 * Usage: Pass this function to the web-vitals reportWebVitals function
 * @param metric - Web Vitals metric
 */
export const reportWebVitals: MetricReportHandler = (metric) => {
  // Log to console in all environments for debugging
  console.log(`Web Vital: ${metric.name} = ${metric.value}`);
  
  // Only send to GA in production
  if (!window.gtag) return;
  
  try {
    // Send to Google Analytics as an event
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true, // Don't affect bounce rate
      metric_id: metric.id, // Unique ID for this measurement
      metric_value: metric.value, // Raw metric value
      metric_delta: metric.delta // Delta since last report
    });
  } catch (error) {
    console.error('Error reporting Web Vitals:', error);
  }
};

/**
 * Initialize Web Vitals monitoring with performance optimization
 * @param immediate - Whether to initialize immediately (default: false)
 */
export const initWebVitalsMonitoring = (immediate = false): void => {
  // Only run in production to avoid overhead in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Web Vitals monitoring disabled in development mode');
    return;
  }

  // Function to actually initialize web vitals
  const initVitals = () => {
    try {
      // Dynamically import web-vitals for code splitting
      import('web-vitals').then((webVitals) => {
        // Only monitor key metrics that don't impact performance negatively
        webVitals.onCLS(reportWebVitals); // Cumulative Layout Shift
        webVitals.onLCP(reportWebVitals); // Largest Contentful Paint
        
        // Defer less critical metrics to later
        setTimeout(() => {
          webVitals.onFID(reportWebVitals); // First Input Delay
          webVitals.onFCP(reportWebVitals); // First Contentful Paint
          webVitals.onTTFB(reportWebVitals); // Time to First Byte
        }, 3000);
        
        console.log('Web Vitals monitoring initialized');
      });
    } catch (error) {
      console.error('Failed to initialize Web Vitals monitoring:', error);
    }
  };

  // Determine when to initialize based on immediate flag
  if (immediate) {
    // Initialize immediately if requested
    initVitals();
  } else {
    // Wait for load event before initializing
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        // If document is already loaded, use requestIdleCallback
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => initVitals(), { timeout: 3000 });
        } else {
          setTimeout(initVitals, 2000);
        }
      } else {
        // Otherwise wait for window load event
        window.addEventListener('load', () => {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => initVitals(), { timeout: 3000 });
          } else {
            setTimeout(initVitals, 2000);
          }
        });
      }
    }
  }
};