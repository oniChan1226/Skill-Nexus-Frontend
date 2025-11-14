# Testing Guide for Skill Nexus

## 📚 Table of Contents
1. [Why Testing Matters](#why-testing-matters)
2. [Testing Stack](#testing-stack)
3. [Running Tests](#running-tests)
4. [Test Structure](#test-structure)
5. [Writing Tests](#writing-tests)
6. [Testing Patterns](#testing-patterns)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Why Testing Matters

Testing is crucial for:
- **Confidence**: Know your code works before deployment
- **Documentation**: Tests show how components should behave
- **Refactoring Safety**: Change code without breaking features
- **Bug Prevention**: Catch issues early in development
- **Team Collaboration**: Clear expectations for component behavior

---

## Testing Stack

### Core Tools
- **Vitest**: Fast test runner (like Jest but for Vite)
- **Testing Library**: Tests components like users interact with them
- **jest-dom**: Custom matchers for DOM assertions

### Why This Stack?
- **Vitest** integrates seamlessly with Vite (your build tool)
- **Testing Library** promotes good practices (test behavior, not implementation)
- **jest-dom** makes assertions readable (`toBeInTheDocument()` vs manual DOM checks)

---

## Running Tests

### Basic Commands

```bash
# Run all tests once
npm run test

# Run tests in watch mode (reruns on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm run test Button.test.tsx

# Run tests matching a pattern
npm run test:watch -- --grep="should render"
```

### Coverage Report

After running `npm run test:coverage`, open `coverage/index.html` in your browser to see:
- Which files are tested
- Which lines of code are covered
- Which branches (if/else) are tested

---

## Test Structure

### Anatomy of a Test File

```typescript
import { describe, it, expect } from 'vitest';

/**
 * describe: Groups related tests together
 * "Button Component" will show in test output
 */
describe('Button Component', () => {
  
  /**
   * it/test: Individual test case
   * Should read like a sentence: "Button Component should render with text"
   */
  it('should render with text', () => {
    // Arrange: Set up test data and render component
    const { getByText } = render(<Button>Click Me</Button>);
    
    // Act: Perform user action (if needed)
    // (not needed for this test)
    
    // Assert: Verify expected outcome
    expect(getByText('Click Me')).toBeInTheDocument();
  });
});
```

### AAA Pattern (Arrange, Act, Assert)

**Arrange**: Set up test conditions
```typescript
const user = userEvent.setup();
const mockFn = vi.fn();
render(<Component onSubmit={mockFn} />);
```

**Act**: Perform actions
```typescript
await user.type(screen.getByLabelText('Name'), 'John');
await user.click(screen.getByRole('button', { name: 'Submit' }));
```

**Assert**: Verify results
```typescript
expect(mockFn).toHaveBeenCalledWith({ name: 'John' });
```

---

## Writing Tests

### 1. Component Rendering Tests

**Purpose**: Verify component displays correctly

```typescript
it('should render button with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});
```

**Key Learning**: Use `screen.getByText()` to find elements by their content (how users see them).

---

### 2. User Interaction Tests

**Purpose**: Test clicks, typing, form submission

```typescript
it('should call onClick when clicked', async () => {
  const handleClick = vi.fn(); // Mock function to track calls
  const user = userEvent.setup(); // Setup user simulation
  
  render(<Button onClick={handleClick}>Click Me</Button>);
  
  await user.click(screen.getByText('Click Me'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

**Key Learning**: 
- `vi.fn()` creates a spy function you can track
- `userEvent` simulates real user interactions (better than fireEvent)
- Always `await` user actions (they're async)

---

### 3. Form Validation Tests

**Purpose**: Ensure validation works

```typescript
it('should show validation errors', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  
  // Submit empty form
  await user.click(screen.getByRole('button', { name: 'Login' }));
  
  // Wait for async validation
  await waitFor(() => {
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });
});
```

**Key Learning**: 
- Use `waitFor()` for async operations (validation, API calls)
- Test what users see (error messages), not internal state

---

### 4. API/Redux Integration Tests

**Purpose**: Test components connected to Redux store

```typescript
it('should fetch and display user data', async () => {
  const store = createMockStore(); // Custom helper from testUtils
  
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  
  // Wait for API call to complete
  await waitFor(() => {
    expect(screen.getByText('Welcome, John')).toBeInTheDocument();
  });
});
```

**Key Learning**:
- Wrap component in `<Provider>` for Redux
- Mock API responses in test setup
- Test the final UI, not API call details

---

### 5. Conditional Rendering Tests

**Purpose**: Test different UI states

```typescript
describe('SkillSection', () => {
  it('should show loading state', () => {
    render(<SkillSection isLoading={true} skills={[]} />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
  
  it('should show empty state', () => {
    render(<SkillSection isLoading={false} skills={[]} />);
    expect(screen.getByText(/No skills/i)).toBeInTheDocument();
  });
  
  it('should show skills list', () => {
    const skills = [{ name: 'React', level: 'Expert' }];
    render(<SkillSection isLoading={false} skills={skills} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
```

**Key Learning**: Test all UI states (loading, empty, error, success)

---

## Testing Patterns

### Pattern 1: Helper Functions

Reduce repetition with render helpers:

```typescript
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

// Now each test is cleaner
it('should render', () => {
  renderButton();
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});

it('should handle click', () => {
  const onClick = vi.fn();
  renderButton({ onClick });
  // ...
});
```

---

### Pattern 2: Mock API Responses

Control API behavior in tests:

```typescript
// In testUtils.ts
export const mockApiSuccess = (data: any) => {
  return Promise.resolve({ data });
};

export const mockApiError = (message: string) => {
  return Promise.reject({ message });
};

// In test file
vi.mock('@/services/user.service', () => ({
  useGetUserQuery: () => ({
    data: { name: 'John', email: 'john@example.com' },
    isLoading: false,
    isError: false,
  }),
}));
```

---

### Pattern 3: Testing Custom Hooks

```typescript
import { renderHook } from '@testing-library/react';

it('should return formatted date', () => {
  const { result } = renderHook(() => useFormattedDate('2024-01-01'));
  expect(result.current).toBe('January 1, 2024');
});
```

---

## Best Practices

### ✅ DO's

1. **Test user behavior, not implementation**
   ```typescript
   // ✅ Good: Tests what user sees
   expect(screen.getByText('Welcome')).toBeInTheDocument();
   
   // ❌ Bad: Tests internal state
   expect(component.state.isLoggedIn).toBe(true);
   ```

2. **Use semantic queries**
   ```typescript
   // ✅ Priority order:
   screen.getByRole('button', { name: 'Submit' })  // Best
   screen.getByLabelText('Email')                  // Good for forms
   screen.getByText('Welcome')                     // Good for content
   screen.getByTestId('custom-element')            // Last resort
   ```

3. **Test accessibility**
   ```typescript
   // Ensures screen readers work
   expect(screen.getByRole('button')).toBeInTheDocument();
   expect(screen.getByLabelText('Email')).toBeRequired();
   ```

4. **Keep tests independent**
   - Each test should run alone
   - Use `beforeEach` to reset state
   - Don't rely on test execution order

5. **Make tests readable**
   ```typescript
   // ✅ Clear test names
   it('should show error when email is invalid', ...)
   
   // ❌ Vague test names
   it('works correctly', ...)
   ```

---

### ❌ DON'Ts

1. **Don't test implementation details**
   ```typescript
   // ❌ Bad: Testing internal function calls
   expect(component.handleSubmit).toHaveBeenCalled();
   
   // ✅ Good: Testing result of submission
   expect(screen.getByText('Success!')).toBeInTheDocument();
   ```

2. **Don't use arbitrary waits**
   ```typescript
   // ❌ Bad: Fragile and slow
   await new Promise(resolve => setTimeout(resolve, 1000));
   
   // ✅ Good: Wait for specific condition
   await waitFor(() => expect(screen.getByText('Loaded')).toBeInTheDocument());
   ```

3. **Don't test external libraries**
   - Don't test React Router, Redux, etc.
   - Test YOUR code that uses them

4. **Don't skip error cases**
   - Test happy path AND error scenarios
   - Test edge cases (empty lists, max values, etc.)

---

## Troubleshooting

### "Property 'toBeInTheDocument' does not exist"

**Cause**: TypeScript doesn't know about jest-dom matchers

**Fix**: Ensure `src/test/vitest.d.ts` exists with:
```typescript
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
}
```

---

### "Unable to find element with text..."

**Cause**: Element not in DOM or text doesn't match exactly

**Fix**:
1. Use `screen.debug()` to see current DOM
2. Use regex for partial matches: `getByText(/Welcome/i)`
3. Check if element is async: wrap in `waitFor()`

```typescript
// Debug what's in the DOM
screen.debug();

// Wait for async elements
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

---

### "Warning: An update to Component inside a test was not wrapped in act()"

**Cause**: State update happened outside React's knowledge

**Fix**: Use `waitFor()` or ensure async operations complete
```typescript
await waitFor(() => {
  expect(screen.getByText('Updated')).toBeInTheDocument();
});
```

---

### Tests fail but component works in browser

**Cause**: Missing mocks or wrong test environment

**Fix**:
1. Check if APIs are mocked
2. Verify all providers are wrapped (Redux, Router)
3. Mock browser APIs (localStorage, window.matchMedia)

---

## Common Matchers Cheatsheet

### DOM Matchers
```typescript
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toBeDisabled()
expect(element).toBeEnabled()
expect(element).toHaveClass('active')
expect(element).toHaveAttribute('href', '/home')
```

### Form Matchers
```typescript
expect(input).toHaveValue('John')
expect(checkbox).toBeChecked()
expect(input).toBeRequired()
expect(input).toHaveDisplayValue('John')
```

### Text Matchers
```typescript
expect(element).toHaveTextContent('Hello')
expect(element).toContainHTML('<span>Hello</span>')
```

### Function Matchers
```typescript
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledTimes(2)
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
expect(mockFn).toHaveBeenLastCalledWith('arg')
```

---

## Next Steps

1. **Run existing tests**: `npm run test:watch`
2. **Add tests for your components**: Start with simple ones (Button, Card)
3. **Aim for 80%+ coverage**: Focus on critical paths
4. **Test after you code**: Write component → Write test → Refactor
5. **Learn by example**: Study the test files we created

---

## Resources

- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Docs](https://vitest.dev/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Query Priority](https://testing-library.com/docs/queries/about#priority)

---

## Questions?

- **What should I test?**: User-facing behavior (clicks, form submission, displayed data)
- **How many tests?**: Enough to feel confident changing code
- **Test before or after coding?**: Either works - find your flow
- **Mock everything?**: Only external dependencies (APIs, timers, browser APIs)

Happy Testing! 🧪✨
