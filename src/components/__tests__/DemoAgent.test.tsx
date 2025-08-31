import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import DemoAgent from '../DemoAgent';

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

// Mock fetch
global.fetch = vi.fn();

describe('DemoAgent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the demo agent component', () => {
    render(<DemoAgent />);
    
    expect(screen.getByText(/Hi! I'm Nkateko Nkuna/)).toBeInTheDocument();
    expect(screen.getByText('Choose your role')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask me anything...')).toBeInTheDocument();
  });

  it('shows available roles in dropdown', () => {
    render(<DemoAgent />);
    
    const roleSelect = screen.getByRole('combobox');
    fireEvent.click(roleSelect);
    
    expect(screen.getByText('Technical Interviewer')).toBeInTheDocument();
    expect(screen.getByText('HR Recruiter')).toBeInTheDocument();
    expect(screen.getByText('Client')).toBeInTheDocument();
    expect(screen.getByText('General Q&A')).toBeInTheDocument();
  });

  it('validates form before sending message', async () => {
    const { toast } = await import('@/hooks/use-toast');
    render(<DemoAgent />);
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    
    expect(toast).toHaveBeenCalledWith({
      title: 'Missing Information',
      description: 'Please select a role and enter your question.',
      variant: 'destructive',
    });
  });

  it('sends message successfully', async () => {
    const mockResponse = { reply: 'Test response from AI' };
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<DemoAgent />);
    
    // Select role
    const roleSelect = screen.getByRole('combobox');
    fireEvent.click(roleSelect);
    fireEvent.click(screen.getByText('Technical Interviewer'));
    
    // Enter question
    const input = screen.getByPlaceholderText('Ask me anything...');
    fireEvent.change(input, { target: { value: 'Test question' } });
    
    // Send message
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText('Test response from AI')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    (fetch as any).mockRejectedValueOnce(new Error('Network error'));
    const { toast } = await import('@/hooks/use-toast');
    
    render(<DemoAgent />);
    
    // Select role and enter question
    const roleSelect = screen.getByRole('combobox');
    fireEvent.click(roleSelect);
    fireEvent.click(screen.getByText('Technical Interviewer'));
    
    const input = screen.getByPlaceholderText('Ask me anything...');
    fireEvent.change(input, { target: { value: 'Test question' } });
    
    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'Error',
        description: 'Failed to get response. Please try again.',
        variant: 'destructive',
      });
    });
  });
});
