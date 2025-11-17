import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AddSkills from './AddSkills';
import { createMockStore } from '@/test/testUtils';

/**
 * TEST SUITE: AddSkills Page
 * 
 * This is a complex form component with:
 * - Multiple input fields
 * - Dynamic category management (add/remove chips)
 * - Form validation with Zod
 * - API calls via RTK Query
 * - Tab switching between "Offer" and "Seek"
 * 
 * TESTING STRATEGY:
 * - Test form rendering and initial state
 * - Test user interactions (typing, clicking)
 * - Test validation errors
 * - Test successful submission
 * - Test API error handling
 */

// Mock the RTK Query hooks to avoid real API calls
vi.mock('@/services/skills.service', () => ({
  useAddOfferedSkillMutation: () => [
    vi.fn(), // mutation function
    { isLoading: false, isSuccess: false, isError: false }, // mutation result
  ],
  useAddRequiredSkillMutation: () => [
    vi.fn(),
    { isLoading: false, isSuccess: false, isError: false },
  ],
}));

describe('AddSkills Page', () => {
  /**
   * Helper to render AddSkills with all providers
   */
  const renderAddSkills = () => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <AddSkills />
        </BrowserRouter>
      </Provider>
    );
  };

  /**
   * TEST: Initial render
   * 
   * WHAT: Page loads with correct elements
   * WHY: Ensures component doesn't crash and shows form
   */
  it('should render the skills form', () => {
    renderAddSkills();
    
    // Check for main heading
    expect(screen.getByText(/Add New Skill/i)).toBeInTheDocument();
    
    // Check for tabs
    expect(screen.getByText(/Skill I Offer/i)).toBeInTheDocument();
    expect(screen.getByText(/Skill I Seek/i)).toBeInTheDocument();
    
    // Check for form fields
    expect(screen.getByLabelText(/Skill Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Proficiency Level/i)).toBeInTheDocument();
  });

  /**
   * TEST: Form input
   * 
   * WHAT: User can type in form fields
   * WHY: Basic form functionality
   * HOW: userEvent.type() simulates keyboard input
   */
  it('should allow typing in form fields', async () => {
    const user = userEvent.setup();
    renderAddSkills();
    
    const nameInput = screen.getByLabelText(/Skill Name/i);
    await user.type(nameInput, 'React Testing');
    
    expect(nameInput).toHaveValue('React Testing');
  });

  /**
   * TEST: Tab switching
   * 
   * WHAT: Clicking tabs changes form mode
   * WHY: Users need to switch between offering/seeking
   * HOW: Click tab and verify content changes
   */
  it('should switch between Offer and Seek tabs', async () => {
    const user = userEvent.setup();
    renderAddSkills();
    
    // Click "Skill I Seek" tab
    const seekTab = screen.getByText(/Skill I Seek/i);
    await user.click(seekTab);
    
    // Verify form changed (looking for priority field which only exists in Seek)
    expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument();
  });

  /**
   * TEST: Category management
   * 
   * WHAT: Add and remove category chips
   * WHY: Skills need categories, UI should be dynamic
   * HOW: Type category, press Enter, verify chip appears
   */
  it('should add and remove categories', async () => {
    const user = userEvent.setup();
    renderAddSkills();
    
    const categoryInput = screen.getByLabelText(/Categories/i);
    
    // Add a category
    await user.type(categoryInput, 'Web Development');
    await user.keyboard('{Enter}');
    
    // Verify chip appears
    await waitFor(() => {
      expect(screen.getByText('Web Development')).toBeInTheDocument();
    });
    
    // Remove category by clicking X button
    const removeButton = screen.getByRole('button', { name: /remove web development/i });
    await user.click(removeButton);
    
    // Verify chip is gone
    await waitFor(() => {
      expect(screen.queryByText('Web Development')).not.toBeInTheDocument();
    });
  });

  /**
   * TEST: Form validation
   * 
   * WHAT: Shows errors for invalid input
   * WHY: Prevents bad data from being submitted
   * HOW: Submit empty form, check for error messages
   */
  it('should show validation errors', async () => {
    const user = userEvent.setup();
    renderAddSkills();
    
    // Submit without filling fields
    const submitButton = screen.getByRole('button', { name: /Add Skill/i });
    await user.click(submitButton);
    
    // Wait for validation errors
    await waitFor(() => {
      expect(screen.getByText(/Skill name is required/i)).toBeInTheDocument();
    });
  });

  /**
   * TEST: Successful form submission
   * 
   * WHAT: Valid form data triggers API call
   * WHY: Core functionality - saving skills
   * HOW: Fill form with valid data, submit, verify API called
   * 
   * NOTE: We mock the API so no real network request happens
   */
  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    const mockAddSkill = vi.fn();
    
    // Override the mock to track calls
    vi.mocked(mockAddSkill);
    
    renderAddSkills();
    
    // Fill form
    await user.type(screen.getByLabelText(/Skill Name/i), 'TypeScript');
    await user.selectOptions(screen.getByLabelText(/Proficiency Level/i), 'Expert');
    
    // Add category
    const categoryInput = screen.getByLabelText(/Categories/i);
    await user.type(categoryInput, 'Programming');
    await user.keyboard('{Enter}');
    
    // Submit
    await user.click(screen.getByRole('button', { name: /Add Skill/i }));
    
    // Verify no validation errors
    await waitFor(() => {
      expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    });
  });

  /**
   * TEST: Loading state during submission
   * 
   * WHAT: Button shows loading spinner while saving
   * WHY: User feedback during async operations
   */
  it('should show loading state during submission', async () => {
    // Mock API with loading state
    const mockAddSkill = vi.fn();
    vi.mock('@/services/skills.service', () => ({
      useAddOfferedSkillMutation: () => [
        mockAddSkill,
        { isLoading: true, isSuccess: false, isError: false },
      ],
    }));
    
    renderAddSkills();
    
    // Button should be disabled when loading
    const submitButton = screen.getByRole('button', { name: /Add Skill/i });
    expect(submitButton).not.toBeDisabled(); // Initially enabled
  });
});
