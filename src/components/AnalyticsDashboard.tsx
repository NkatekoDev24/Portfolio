import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageCircle, 
  Eye, 
  MousePointer, 
  Clock, 
  TrendingUp,
  Download,
  Share2,
  Calendar,
  BarChart3
} from 'lucide-react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  demoAgentInteractions: number;
  averageSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  topRoles: Array<{ role: string; interactions: number }>;
  recentActivity: Array<{ action: string; timestamp: string; details: string }>;
}

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    demoAgentInteractions: 0,
    averageSessionDuration: 0,
    topPages: [],
    topRoles: [],
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  // Fetch real analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      
      try {
        const response = await fetch(`/api/analytics?timeRange=${timeRange}`);
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data);
        } else {
          console.error('Failed to fetch analytics data');
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const StatCard = ({ title, value, icon: Icon, description, trend }: {
    title: string;
    value: string | number;
    icon: any;
    description?: string;
    trend?: { value: number; isPositive: boolean };
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="flex items-center text-xs">
            <TrendingUp className={`h-3 w-3 mr-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`} />
            <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-muted-foreground ml-1">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Track your portfolio performance and user engagement
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Report
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-2">
        <Badge 
          variant={timeRange === '1d' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setTimeRange('1d')}
        >
          Last 24 hours
        </Badge>
        <Badge 
          variant={timeRange === '7d' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setTimeRange('7d')}
        >
          Last 7 days
        </Badge>
        <Badge 
          variant={timeRange === '30d' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setTimeRange('30d')}
        >
          Last 30 days
        </Badge>
        <Badge 
          variant={timeRange === '90d' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setTimeRange('90d')}
        >
          Last 90 days
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Page Views"
          value={analyticsData.pageViews.toLocaleString()}
          icon={Eye}
          description="Total page views"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Unique Visitors"
          value={analyticsData.uniqueVisitors.toLocaleString()}
          icon={Users}
          description="Unique visitors"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Demo Agent Interactions"
          value={analyticsData.demoAgentInteractions}
          icon={MessageCircle}
          description="AI chat interactions"
          trend={{ value: 23, isPositive: true }}
        />
        <StatCard
          title="Avg. Session Duration"
          value={`${analyticsData.averageSessionDuration}m`}
          icon={Clock}
          description="Average time on site"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
          <TabsTrigger value="interactions">Demo Agent</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analyticsData.topPages.map((page, index) => (
                    <div key={page.page} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{page.page}</span>
                      <span className="text-sm text-muted-foreground">{page.views} views</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demo Agent Usage</CardTitle>
                <CardDescription>Most popular interview roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analyticsData.topRoles.map((role) => (
                    <div key={role.role} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{role.role}</span>
                      <span className="text-sm text-muted-foreground">{role.interactions} interactions</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Performance</CardTitle>
              <CardDescription>Detailed page view analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{page.page}</div>
                      <div className="text-xs text-muted-foreground">{page.views} views</div>
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(page.views / analyticsData.topPages[0].views) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Demo Agent Analytics</CardTitle>
              <CardDescription>AI interaction patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topRoles.map((role, index) => (
                  <div key={role.role} className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{role.role}</div>
                      <div className="text-xs text-muted-foreground">{role.interactions} interactions</div>
                    </div>
                    <Badge variant="secondary">{Math.round((role.interactions / analyticsData.demoAgentInteractions) * 100)}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest user interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">{activity.details}</div>
                      <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
