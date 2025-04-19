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
 * Initialize Google Analytics
 * @param measurementId - GA Measurement ID (e.g., 'G-XXXXXXXXXX')
 */
export const initializeGA = (measurementId: string): void => {
  // Only initialize in production and if not already loaded
  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics tracking disabled in development mode');
    return;
  }

  // Check if analytics is already loaded - needs proper check for defined property
  if (typeof window !== 'undefined' && window.gtag !== undefined) {
    console.log('Analytics already initialized');
    return;
  }

  try {
    // Create script elements
    const script1 = document.createElement('script');
    script1.async = true;
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
 * Initialize Web Vitals monitoring
 * This function loads the web-vitals package and starts monitoring
 */
export const initWebVitalsMonitoring = (): void => {
  // Only run in production to avoid overhead in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('Web Vitals monitoring disabled in development mode');
    return;
  }

  try {
    // Dynamically import web-vitals for code splitting
    // Dynamically import web-vitals (using actual API)
    import('web-vitals').then((webVitals) => {
      // Use the correct API for web-vitals package
      webVitals.onCLS(reportWebVitals); // Cumulative Layout Shift
      webVitals.onFID(reportWebVitals); // First Input Delay
      webVitals.onFCP(reportWebVitals); // First Contentful Paint
      webVitals.onLCP(reportWebVitals); // Largest Contentful Paint
      webVitals.onTTFB(reportWebVitals); // Time to First Byte
      // Only using the new API style, removing duplicate calls
      
      console.log('Web Vitals monitoring initialized');
    });
  } catch (error) {
    console.error('Failed to initialize Web Vitals monitoring:', error);
  }
};