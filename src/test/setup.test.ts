import { describe, it, expect } from 'vitest';

/**
 * SIMPLE SANITY TEST
 * 
 * This is the simplest possible test to verify:
 * 1. Vitest is working
 * 2. Test files are discovered
 * 3. Assertions work
 * 
 * If this test passes, your testing setup is correct!
 */

describe('Testing Setup', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true);
  });

  it('should perform basic math', () => {
    expect(2 + 2).toBe(4);
  });

  it('should work with arrays', () => {
    const skills = ['React', 'TypeScript', 'Node.js'];
    expect(skills).toHaveLength(3);
    expect(skills).toContain('React');
  });

  it('should work with objects', () => {
    const user = { name: 'John', email: 'john@example.com' };
    expect(user).toHaveProperty('name');
    expect(user.name).toBe('John');
  });
});
