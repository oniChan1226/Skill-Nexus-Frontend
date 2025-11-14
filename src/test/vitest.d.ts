/**
 * VITEST TYPE DEFINITIONS
 * 
 * WHY: Extends Vitest's Assertion interface with jest-dom matchers
 * This tells TypeScript about custom matchers like .toBeInTheDocument()
 * Without this, you'll get "Property 'toBeInTheDocument' does not exist" errors
 */

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers {}
}
