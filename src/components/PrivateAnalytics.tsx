import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Analytics from '../pages/Analytics';

const PrivateAnalytics = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simple password check - you can change this to any password you want
  const CORRECT_PASSWORD = 'nkateko2024'; // Change this to your preferred password

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      // Store authentication in sessionStorage (clears when browser closes)
      sessionStorage.setItem('analytics_authenticated', 'true');
    } else {
      setError('Incorrect password. Please try again.');
    }

    setIsLoading(false);
  };

  // Check if already authenticated from sessionStorage
  useEffect(() => {
    const authenticated = sessionStorage.getItem('analytics_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    sessionStorage.removeItem('analytics_authenticated');
  };

  if (isAuthenticated) {
    return (
      <div className="relative">
        {/* Logout button */}
        <div className="absolute top-4 right-4 z-50">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="bg-background/80 backdrop-blur-sm"
          >
            <Lock className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        
        {/* Analytics component */}
        <Analytics />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Private Analytics</CardTitle>
            <CardDescription>
              This page is restricted to portfolio owner only
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Checking...' : 'Access Analytics'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <Link to="/">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Portfolio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>🔒 This area is protected and only accessible to the portfolio owner.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivateAnalytics;
