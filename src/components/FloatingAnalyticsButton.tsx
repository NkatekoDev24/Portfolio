import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingAnalyticsButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-background border rounded-lg shadow-lg text-sm whitespace-nowrap">
            View Portfolio Analytics
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-background"></div>
          </div>
        )}
        
        {/* Floating Button */}
        <Link to="/analytics">
          <Button
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            Analytics
            <Badge variant="secondary" className="ml-2 text-xs">
              Live
            </Badge>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FloatingAnalyticsButton;
