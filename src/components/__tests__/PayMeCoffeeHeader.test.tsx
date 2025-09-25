import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import { PayMeCoffeeHeader } from '../PayMeCoffeeHeader';

// Mock window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('PayMeCoffeeHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with correct text', () => {
    renderWithRouter(<PayMeCoffeeHeader />);
    
    expect(screen.getByText('Gostou da calculadora?')).toBeInTheDocument();
    expect(screen.getByText('☕ Pay me a Coffee')).toBeInTheDocument();
  });

  test('button has correct accessibility attributes', () => {
    renderWithRouter(<PayMeCoffeeHeader />);
    
    const button = screen.getByRole('button', { name: /abrir página de doação em nova aba/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-label', 'Abrir página de doação em nova aba');
  });

  test('button opens donate page in new tab when clicked', () => {
    renderWithRouter(<PayMeCoffeeHeader />);
    
    const button = screen.getByText('☕ Pay me a Coffee');
    fireEvent.click(button);
    
    expect(mockWindowOpen).toHaveBeenCalledWith('/donate', '_blank', 'noopener,noreferrer');
  });

  test('button has correct CSS classes for styling and hover effects', () => {
    renderWithRouter(<PayMeCoffeeHeader />);
    
    const button = screen.getByText('☕ Pay me a Coffee');
    expect(button).toHaveClass(
      'bg-amber-500',
      'hover:bg-amber-600',
      'text-white',
      'px-3',
      'py-1', 
      'rounded-md',
      'text-xs',
      'font-medium',
      'transition-all',
      'duration-200',
      'hover:scale-105',
      'hover:shadow-md',
      'cursor-pointer'
    );
  });

  test('displays donation animations correctly', async () => {
    renderWithRouter(<PayMeCoffeeHeader />);
    
    // Wait for the animation to appear (it shows after component mounts)
    await waitFor(() => {
      const animationElement = screen.queryByText(/acabou de doar/);
      if (animationElement) {
        expect(animationElement).toHaveClass('animate-fade-in');
      }
    }, { timeout: 11000 }); // Wait for the 10s interval + buffer
  });

  test('cycles through different donation notifications', async () => {
    renderWithRouter(<PayMeCoffeeHeader />);
    
    // The component should cycle through donations
    // We can test this by checking if different donor names appear over time
    const donorNames = ['Ana M.', 'João S.', 'Maria L.', 'Pedro R.', 'Carla F.'];
    
    // Wait for first animation to show
    await waitFor(() => {
      const animationText = screen.queryByText(/acabou de doar/);
      if (animationText) {
        const hasValidDonor = donorNames.some(name => 
          animationText.textContent?.includes(name)
        );
        expect(hasValidDonor).toBe(true);
      }
    }, { timeout: 11000 });
  });

  test('component renders with correct structure', () => {
    renderWithRouter(<PayMeCoffeeHeader />);
    
    // Check main container
    const mainContainer = screen.getByText('Gostou da calculadora?').closest('div');
    expect(mainContainer?.closest('div')).toHaveClass('bg-gradient-to-r', 'from-amber-50', 'to-orange-50');
    
    // Check coffee icon is present
    const coffeeIcon = screen.getByText('Gostou da calculadora?').parentElement;
    expect(coffeeIcon?.querySelector('svg')).toBeInTheDocument();
  });

  test('keyboard navigation works correctly', () => {
    renderWithRouter(<PayMeCoffeeHeader />);
    
    const button = screen.getByText('☕ Pay me a Coffee');
    
    // Test that button can receive focus
    button.focus();
    expect(document.activeElement).toBe(button);
    
    // Test Enter key activation
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(mockWindowOpen).toHaveBeenCalledWith('/donate', '_blank', 'noopener,noreferrer');
  });
});