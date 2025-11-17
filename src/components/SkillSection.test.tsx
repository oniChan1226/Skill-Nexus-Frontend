import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SkillSection from './SkillSection';
import { createMockStore } from '@/test/testUtils';
import type { Skill } from './SkillSection';

/**
 * TEST SUITE: SkillSection Component
 * 
 * This component displays a list of skills with add/view actions.
 * Tests cover different states: loading, empty, with data.
 */
describe('SkillSection Component', () => {
  const mockSkills: Skill[] = [
    {
      name: 'React',
      category: 'Frontend',
      level: 'Expert',
      status: 'active',
      rating: 4.5,
      requests: 10,
    },
    {
      name: 'Node.js',
      category: 'Backend',
      level: 'Intermediate',
      status: 'active',
      rating: 4.0,
      requests: 5,
    },
  ];

  const defaultProps = {
    title: 'Skills I Offer',
    subtitle: 'Manage your offered skills',
    buttonText: 'Add Skill',
    skills: mockSkills,
  };

  const renderSkillSection = (props = {}) => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <SkillSection {...defaultProps} {...props} />
        </BrowserRouter>
      </Provider>
    );
  };

  /**
   * TEST: Renders with skills
   * 
   * WHAT: Displays skill cards when data is provided
   * WHY: Core functionality - showing user's skills
   */
  it('should render skills list', () => {
    renderSkillSection();
    
    expect(screen.getByText('Skills I Offer')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Add Skill')).toBeInTheDocument();
  });

  /**
   * TEST: Empty state
   * 
   * WHAT: Shows fallback UI when no skills exist
   * WHY: Better UX - guides user to add skills
   * HOW: Pass empty array and check for empty state message
   */
  it('should show empty state when no skills', () => {
    renderSkillSection({ skills: [] });
    
    expect(screen.getByText(/Add Skills & Start Exchanging/i)).toBeInTheDocument();
    expect(screen.getByText(/No skills added yet/i)).toBeInTheDocument();
  });

  /**
   * TEST: Loading state
   * 
   * WHAT: Shows spinner while fetching data
   * WHY: Provides feedback during async operations
   * HOW: Pass isLoading prop and check for loading text
   */
  it('should show loading state', () => {
    renderSkillSection({ isLoading: true, skills: [] });
    
    expect(screen.getByText(/Loading skills/i)).toBeInTheDocument();
  });

  /**
   * TEST: Skill details display
   * 
   * WHAT: Verifies all skill information is shown
   * WHY: Ensures data is properly displayed
   */
  it('should display skill details correctly', () => {
    renderSkillSection();
    
    // Check skill details
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText(/Frontend/i)).toBeInTheDocument();
    expect(screen.getByText(/Expert/i)).toBeInTheDocument();
    expect(screen.getByText(/10 requests/i)).toBeInTheDocument();
  });

  /**
   * TEST: Priority badges for required skills
   * 
   * WHAT: Shows priority when it's a "seeking" skill
   * WHY: Different display for offered vs required skills
   */
  it('should show priority for required skills', () => {
    const requiredSkills: Skill[] = [
      {
        name: 'Python',
        category: 'Backend',
        level: 'Beginner',
        rating: 0,
        requests: 0,
        priority: 'High',
      },
    ];

    renderSkillSection({
      title: "Skills I'm Seeking",
      skills: requiredSkills,
    });
    
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });
});
