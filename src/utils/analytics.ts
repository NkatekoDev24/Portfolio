// Simple analytics utility for tracking user interactions
export const Analytics = {
  // Track page views
  trackPageView: (page: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: page,
      });
    }
    console.log('Page view:', page);
  },

  // Track custom events
  trackEvent: (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
    console.log('Event:', { action, category, label, value });
  },

  // Track demo agent interactions
  trackDemoAgent: (role: string, questionLength: number) => {
    Analytics.trackEvent('demo_agent_interaction', 'engagement', role, questionLength);
  },

  // Track skill section views
  trackSkillView: (skill: string) => {
    Analytics.trackEvent('skill_view', 'content', skill);
  },

  // Track project clicks
  trackProjectClick: (projectName: string) => {
    Analytics.trackEvent('project_click', 'engagement', projectName);
  },

  // Track contact form submissions
  trackContact: (method: string) => {
    Analytics.trackEvent('contact', 'conversion', method);
  },
};

// Performance monitoring
export const Performance = {
  // Track page load time
  trackPageLoad: () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log('Page load time:', loadTime);
        
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'load',
            value: Math.round(loadTime),
          });
        }
      });
    }
  },

  // Track API response times
  trackApiCall: (endpoint: string, startTime: number) => {
    const duration = performance.now() - startTime;
    console.log(`API call to ${endpoint}:`, duration);
    
    if (window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'api_call',
        value: Math.round(duration),
        event_label: endpoint,
      });
    }
  },
};

// Error tracking
export const ErrorTracking = {
  trackError: (error: Error, context?: string) => {
    console.error('Error tracked:', error, context);
    
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: {
          context: context || 'unknown',
        },
      });
    }
  },
};

// Declare global gtag function
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
