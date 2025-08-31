import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const HiddenAdminAccess = () => {
  const [showAccess, setShowAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let keySequence = '';
    let timeout: NodeJS.Timeout;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger on Ctrl+Shift+A (or Cmd+Shift+A on Mac)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setShowAccess(true);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const handleAccessAnalytics = () => {
    navigate('/analytics');
    setShowAccess(false);
  };

  if (!showAccess) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border rounded-lg p-6 max-w-sm w-full shadow-xl">
        <div className="text-center mb-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Admin Access</h3>
          <p className="text-sm text-muted-foreground">
            Access your private analytics dashboard
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleAccessAnalytics}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Go to Analytics Dashboard
          </button>
          
          <button
            onClick={() => setShowAccess(false)}
            className="w-full bg-muted hover:bg-muted/80 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
        
        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>💡 Tip: Press Ctrl+Shift+A (or Cmd+Shift+A) to access this menu</p>
        </div>
      </div>
    </div>
  );
};

export default HiddenAdminAccess;
