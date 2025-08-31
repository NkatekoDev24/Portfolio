import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageCircle, 
  Eye, 
  Clock, 
  TrendingUp,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AnalyticsSummary {
  pageViews: number;
  uniqueVisitors: number;
  demoAgentInteractions: number;
  averageSessionDuration: number;
}

const AnalyticsSummary = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary>({
    pageViews: 0,
    uniqueVisitors: 0,
    demoAgentInteractions: 0,
    averageSessionDuration: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics?timeRange=7d');
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData({
            pageViews: data.pageViews,
            uniqueVisitors: data.uniqueVisitors,
            demoAgentInteractions: data.demoAgentInteractions,
            averageSessionDuration: data.averageSessionDuration
          });
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Portfolio Analytics
          </CardTitle>
          <CardDescription>Loading analytics data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Portfolio Analytics
            </CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </div>
          <Link to="/analytics">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Eye className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{analyticsData.pageViews.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Page Views</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-100">
              <Users className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{analyticsData.uniqueVisitors.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Visitors</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-100">
              <MessageCircle className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{analyticsData.demoAgentInteractions}</p>
              <p className="text-xs text-muted-foreground">AI Chats</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-orange-100">
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{analyticsData.averageSessionDuration}m</p>
              <p className="text-xs text-muted-foreground">Avg. Time</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Real-time data
            </Badge>
            <Link to="/analytics">
              <Button variant="ghost" size="sm" className="text-xs">
                View detailed analytics →
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSummary;
