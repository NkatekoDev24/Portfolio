# Analytics System Documentation

## Overview

The portfolio includes a comprehensive analytics system that tracks user interactions, page views, and engagement metrics. This system helps you understand how visitors interact with your portfolio and which features are most popular.

## Features

### 📊 **Real-time Analytics Dashboard**
- **Page Views**: Track total page views across your portfolio
- **Unique Visitors**: Count distinct visitors to your site
- **Demo Agent Interactions**: Monitor AI chat usage and popular interview roles
- **Session Duration**: Average time visitors spend on your site
- **Top Pages**: Most visited sections of your portfolio
- **Recent Activity**: Live feed of user interactions

### 🎯 **Event Tracking**
- **Page Views**: Automatic tracking of page visits
- **Demo Agent Interactions**: Track which roles are most popular
- **Skill Views**: Monitor which skills get the most attention
- **Project Clicks**: See which projects generate the most interest
- **Contact Form Submissions**: Track contact attempts

## How to Access Analytics

### 1. **Via Portfolio Dashboard**
- Navigate to the "Analytics" section in your portfolio
- View real-time metrics and charts
- Filter data by time range (24h, 7d, 30d, 90d)

### 2. **Via API Endpoints**
```bash
# Get analytics data
GET /api/analytics?timeRange=7d

# Track custom events
POST /api/analytics
{
  "event": "custom_event",
  "data": { "key": "value" }
}
```

### 3. **Via Google Analytics**
- Set up Google Analytics 4 property
- Replace `GA_MEASUREMENT_ID` in `index.html` with your actual ID
- View data in Google Analytics dashboard

## Setup Instructions

### 1. **Environment Variables**
Add to your `.env` file:
```bash
# Google Analytics (optional)
GA_MEASUREMENT_ID=your_ga_measurement_id
```

### 2. **Google Analytics Setup**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your portfolio
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Replace `GA_MEASUREMENT_ID` in `index.html`

### 3. **Database Setup (Production)**
For production, replace the in-memory storage with a database:

```typescript
// Example with MongoDB
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('portfolio');
const analytics = db.collection('analytics');
```

## API Reference

### GET `/api/analytics`
Retrieve analytics data for a specific time range.

**Query Parameters:**
- `timeRange` (optional): `1d`, `7d`, `30d`, `90d` (default: `7d`)

**Response:**
```json
{
  "pageViews": 1247,
  "uniqueVisitors": 892,
  "demoAgentInteractions": 156,
  "averageSessionDuration": 4.2,
  "topPages": [
    { "page": "Home", "views": 456 },
    { "page": "Demo Agent", "views": 234 }
  ],
  "topRoles": [
    { "role": "Technical Interviewer", "interactions": 67 },
    { "role": "HR Recruiter", "interactions": 45 }
  ],
  "recentActivity": [
    {
      "action": "Demo Agent Interaction",
      "timestamp": "2024-01-15T10:30:00Z",
      "details": "Technical Interviewer asked about React Native"
    }
  ]
}
```

### POST `/api/analytics`
Track custom analytics events.

**Request Body:**
```json
{
  "event": "demo_agent_interaction",
  "data": {
    "role": "Technical Interviewer",
    "question": "Tell me about your React experience"
  }
}
```

**Supported Events:**
- `page_view`: Track page visits
- `demo_agent_interaction`: Track AI chat usage
- `skill_view`: Track skill section views
- `project_click`: Track project clicks
- `contact_form`: Track contact form submissions

## Dashboard Features

### 📈 **Key Metrics Cards**
- **Page Views**: Total number of page views
- **Unique Visitors**: Number of distinct visitors
- **Demo Agent Interactions**: AI chat usage count
- **Average Session Duration**: Time spent on site

### 📊 **Detailed Analytics**
- **Overview Tab**: Summary of key metrics
- **Top Pages Tab**: Most visited sections with progress bars
- **Demo Agent Tab**: Popular interview roles and usage patterns
- **Recent Activity Tab**: Live feed of user interactions

### ⏰ **Time Range Filtering**
- **Last 24 hours**: Real-time data
- **Last 7 days**: Weekly trends
- **Last 30 days**: Monthly patterns
- **Last 90 days**: Quarterly analysis

## Privacy Considerations

### 🔒 **Data Collection**
- **No Personal Information**: Only anonymous usage data
- **Session-based**: Tracks interactions, not individuals
- **GDPR Compliant**: No cookies or personal identifiers

### 🛡️ **Data Storage**
- **In-Memory**: Data is stored temporarily (resets on server restart)
- **Production**: Use database with data retention policies
- **Anonymization**: All data is anonymized

## Customization

### 🎨 **Styling**
The analytics dashboard uses the same design system as your portfolio:
- Tailwind CSS classes
- shadcn/ui components
- Consistent color scheme and typography

### 📊 **Adding New Metrics**
1. Update the `AnalyticsData` interface
2. Add tracking calls in components
3. Update the dashboard display
4. Add new API endpoints if needed

### 🔧 **Extending Event Tracking**
```typescript
// Add new event types
export const trackCustomEvent = (eventName: string, data: any) => {
  trackEvent("custom_event", { eventName, ...data });
};
```

## Troubleshooting

### Common Issues

1. **Analytics not loading**
   - Check if the analytics API is running
   - Verify network connectivity
   - Check browser console for errors

2. **No data showing**
   - Ensure events are being tracked
   - Check API endpoint responses
   - Verify time range selection

3. **Performance issues**
   - Limit data retention periods
   - Implement pagination for large datasets
   - Use caching for frequently accessed data

### Debug Mode
Enable debug logging by setting:
```bash
DEBUG_ANALYTICS=true
```

## Future Enhancements

### 🚀 **Planned Features**
- **Real-time WebSocket updates**: Live dashboard updates
- **Export functionality**: Download analytics reports
- **Advanced filtering**: Filter by device, location, etc.
- **A/B testing**: Test different portfolio layouts
- **Goal tracking**: Track conversion goals (contact form, downloads)

### 📱 **Mobile Analytics**
- **Mobile-specific metrics**: Touch interactions, scroll depth
- **Performance monitoring**: Load times, error rates
- **Offline tracking**: Queue events when offline

### 🤖 **AI Insights**
- **Trend analysis**: Identify patterns in user behavior
- **Recommendations**: Suggest portfolio improvements
- **Predictive analytics**: Forecast visitor engagement

## Support

For issues or questions about the analytics system:
1. Check the browser console for errors
2. Review the API endpoint responses
3. Verify environment variable configuration
4. Test with the health check endpoint: `/api/analytics/health`
