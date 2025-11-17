import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Button from './Button';
import { createMockStore } from '@/test/testUtils';

/**
 * TEST SUITE: Button Component
 * 
 * This tests the shared Button component that's used throughout the app.
 * We test different variants, states, and interactions.
 */
describe('Button Component', () => {
  /**
   * Helper function to render Button with all necessary providers
   * 
   * WHY? Components often need Redux store and Router context
   * This wrapper provides both so we don't repeat code in each test
   */
  const renderButton = (props = {}) => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Button {...props}>Click Me</Button>
        </BrowserRouter>
      </Provider>
    );
  };

  /**
   * TEST: Basic rendering
   * 
   * WHAT: Checks if button renders with text content
   * WHY: Ensures component doesn't crash and displays correctly
   * HOW: Uses screen.getByText to find the button by its text
   */
  it('should render button with text', () => {
    renderButton();
    
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
  });

  /**
   * TEST: Click handler
   * 
   * WHAT: Verifies onClick prop is called when clicked
   * WHY: Ensures button functionality works
   * HOW: 
   * - vi.fn() creates a mock function we can track
   * - userEvent simulates user interaction
   * - toHaveBeenCalledTimes checks if function was called
   */
  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    renderButton({ onClick: handleClick });
    
    const button = screen.getByText('Click Me');
    button.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * TEST: Disabled state
   * 
   * WHAT: Checks if disabled prop prevents clicks
   * WHY: Important for UX - disabled buttons shouldn't trigger actions
   * HOW: Check for disabled attribute and ensure onClick isn't called
   */
  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn();
    renderButton({ onClick: handleClick, disabled: true });
    
    const button = screen.getByText('Click Me');
    expect(button).toBeDisabled();
    
    button.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  /**
   * TEST: Variant prop
   * 
   * WHAT: Checks if variant prop applies correct CSS classes
   * WHY: Ensures styling variants work correctly
   * HOW: Check className contains expected variant class
   */
  it('should apply variant classes', () => {
    const { rerender } = renderButton({ variant: 'secondary' });
    let button = screen.getByText('Click Me');
    expect(button.className).toContain('secondary');
    
    // Test another variant
    rerender(
      <Provider store={createMockStore()}>
        <BrowserRouter>
          <Button variant="primary">Click Me</Button>
        </BrowserRouter>
      </Provider>
    );
    button = screen.getByText('Click Me');
    expect(button.className).toContain('primary');
  });

  /**
   * TEST: Custom className
   * 
   * WHAT: Verifies custom classes can be added
   * WHY: Allows flexibility for custom styling
   */
  it('should accept custom className', () => {
    renderButton({ className: 'custom-class' });
    const button = screen.getByText('Click Me');
    expect(button.className).toContain('custom-class');
  });
});
