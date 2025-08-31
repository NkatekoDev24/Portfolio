import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory storage for demo purposes
// In production, use a database like MongoDB, PostgreSQL, or Firebase
let analyticsData = {
  pageViews: 0,
  uniqueVisitors: new Set<string>(),
  demoAgentInteractions: 0,
  sessionDurations: [] as number[],
  pageViewsByPage: {} as Record<string, number>,
  roleInteractions: {} as Record<string, number>,
  recentActivity: [] as Array<{
    action: string;
    timestamp: string;
    details: string;
    sessionId: string;
  }>,
  sessions: {} as Record<string, {
    startTime: number;
    lastActivity: number;
    pageViews: number;
  }>
};

// Helper function to get session ID from request
const getSessionId = (req: VercelRequest): string => {
  return req.headers['x-session-id'] as string || 
         req.cookies?.sessionId || 
         req.headers['user-agent'] || 
         'unknown';
};

// Helper function to get visitor ID
const getVisitorId = (req: VercelRequest): string => {
  return req.headers['x-visitor-id'] as string || 
         req.cookies?.visitorId || 
         req.ip || 
         'unknown';
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Health check endpoint
  if (req.method === 'GET' && req.url === '/api/analytics/health') {
    res.status(200).json({ status: "Analytics API is running" });
    return;
  }

  // Get analytics data
  if (req.method === 'GET') {
    const { timeRange = '7d' } = req.query;
    
    // Calculate time-based filtering
    const now = Date.now();
    const timeRanges = {
      '1d': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000
    };
    
    const cutoffTime = now - (timeRanges[timeRange as keyof typeof timeRanges] || timeRanges['7d']);
    
    // Filter recent activity
    const recentActivity = analyticsData.recentActivity
      .filter(activity => new Date(activity.timestamp).getTime() > cutoffTime)
      .slice(0, 50); // Limit to 50 most recent activities
    
    // Calculate average session duration
    const recentSessions = Object.values(analyticsData.sessions)
      .filter(session => session.lastActivity > cutoffTime);
    
    const avgSessionDuration = recentSessions.length > 0
      ? recentSessions.reduce((sum, session) => sum + (session.lastActivity - session.startTime), 0) / recentSessions.length / 1000 / 60 // Convert to minutes
      : 0;

    const response = {
      pageViews: analyticsData.pageViews,
      uniqueVisitors: analyticsData.uniqueVisitors.size,
      demoAgentInteractions: analyticsData.demoAgentInteractions,
      averageSessionDuration: Math.round(avgSessionDuration * 10) / 10, // Round to 1 decimal
      topPages: Object.entries(analyticsData.pageViewsByPage)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10),
      topRoles: Object.entries(analyticsData.roleInteractions)
        .map(([role, interactions]) => ({ role, interactions }))
        .sort((a, b) => b.interactions - a.interactions),
      recentActivity,
      timeRange
    };

    res.status(200).json(response);
    return;
  }

  // Track analytics events
  if (req.method === 'POST') {
    try {
      const { event, data } = req.body;
      const sessionId = getSessionId(req);
      const visitorId = getVisitorId(req);
      const timestamp = new Date().toISOString();

      // Add visitor to unique visitors set
      analyticsData.uniqueVisitors.add(visitorId);

      // Initialize session if not exists
      if (!analyticsData.sessions[sessionId]) {
        analyticsData.sessions[sessionId] = {
          startTime: Date.now(),
          lastActivity: Date.now(),
          pageViews: 0
        };
      }

      // Update session activity
      analyticsData.sessions[sessionId].lastActivity = Date.now();

      switch (event) {
        case 'page_view':
          analyticsData.pageViews++;
          analyticsData.sessions[sessionId].pageViews++;
          
          if (data.page) {
            analyticsData.pageViewsByPage[data.page] = 
              (analyticsData.pageViewsByPage[data.page] || 0) + 1;
          }
          
          analyticsData.recentActivity.unshift({
            action: 'Page View',
            timestamp,
            details: `Viewed ${data.page || 'unknown page'}`,
            sessionId
          });
          break;

        case 'demo_agent_interaction':
          analyticsData.demoAgentInteractions++;
          
          if (data.role) {
            analyticsData.roleInteractions[data.role] = 
              (analyticsData.roleInteractions[data.role] || 0) + 1;
          }
          
          analyticsData.recentActivity.unshift({
            action: 'Demo Agent Interaction',
            timestamp,
            details: `${data.role || 'Unknown role'} asked: ${data.question?.substring(0, 50)}${data.question?.length > 50 ? '...' : ''}`,
            sessionId
          });
          break;

        case 'skill_view':
          analyticsData.recentActivity.unshift({
            action: 'Skill View',
            timestamp,
            details: `Viewed skill: ${data.skill}`,
            sessionId
          });
          break;

        case 'project_click':
          analyticsData.recentActivity.unshift({
            action: 'Project Click',
            timestamp,
            details: `Clicked on project: ${data.projectName}`,
            sessionId
          });
          break;

        case 'contact_form':
          analyticsData.recentActivity.unshift({
            action: 'Contact Form',
            timestamp,
            details: `Contact form submitted via ${data.method}`,
            sessionId
          });
          break;

        default:
          return res.status(400).json({ error: 'Unknown event type' });
      }

      // Keep only last 1000 activities to prevent memory issues
      if (analyticsData.recentActivity.length > 1000) {
        analyticsData.recentActivity = analyticsData.recentActivity.slice(0, 1000);
      }

      // Clean up old sessions (older than 24 hours)
      const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
      Object.keys(analyticsData.sessions).forEach(sessionId => {
        if (analyticsData.sessions[sessionId].lastActivity < oneDayAgo) {
          delete analyticsData.sessions[sessionId];
        }
      });

      res.status(200).json({ success: true, event, timestamp });
    } catch (error) {
      console.error('Analytics tracking error:', error);
      res.status(500).json({ error: 'Failed to track analytics event' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
