import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Track page views automatically
export const usePageViewTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "page_view",
        data: {
          page: location.pathname || "Home",
          title: document.title,
        },
      }),
    }).catch(console.error); // Don't block on analytics errors
  }, [location]);

  return null;
};

// Track specific events
export const trackEvent = async (event: string, data: any) => {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event,
        data,
      }),
    });
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Track skill views
export const trackSkillView = (skill: string) => {
  trackEvent("skill_view", { skill });
};

// Track project clicks
export const trackProjectClick = (projectName: string) => {
  trackEvent("project_click", { projectName });
};

// Track contact form submissions
export const trackContactForm = (method: string) => {
  trackEvent("contact_form", { method });
};

// Track demo agent interactions
export const trackDemoAgentInteraction = (role: string, question: string) => {
  trackEvent("demo_agent_interaction", { role, question });
};
