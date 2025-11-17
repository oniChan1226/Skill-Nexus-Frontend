import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/services/auth.service';
import { userApi } from '@/services/user.service';
import { skillsApi } from '@/services/skills.service';
import { tradingApi } from '@/services/trading.service';
import authReducer from '@/features/auth/authSlice';
import themeReducer from '@/features/ui/themeSlice';

/**
 * Creates a mock Redux store for testing
 * You can pass initial state to customize the store for specific tests
 */
export function createMockStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [skillsApi.reducerPath]: skillsApi.reducer,
      [tradingApi.reducerPath]: tradingApi.reducer,
      auth: authReducer,
      theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        userApi.middleware,
        skillsApi.middleware,
        tradingApi.middleware
      ),
    preloadedState,
  });
}

/**
 * Mock user data for testing
 */
export const mockUser = {
  _id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  age: 25,
  isVerified: true,
  role: 'user',
  address: {
    country: 'USA',
    city: 'New York',
  },
  profession: 'Software Developer',
  bio: 'Test bio',
  profileImage: 'https://example.com/avatar.jpg',
  socialLinks: {
    github: 'https://github.com/testuser',
    linkedin: 'https://linkedin.com/in/testuser',
  },
};

/**
 * Mock skill data for testing
 */
export const mockOfferedSkill = {
  _id: 'skill-1',
  name: 'React Development',
  proficiencyLevel: 'expert' as const,
  description: 'Expert in React',
  categories: ['Frontend', 'JavaScript'],
  metrics: {
    totalRequests: 10,
    acceptedRequests: 8,
    completedRequests: 5,
  },
};

export const mockRequiredSkill = {
  _id: 'skill-2',
  name: 'Machine Learning',
  learningPriority: 'high' as const,
  description: 'Want to learn ML',
  categories: ['AI', 'Python'],
};

/**
 * Mock trading user data
 */
export const mockTradingUser = {
  _id: 'trading-user-1',
  rating: 4.5,
  totalExchanges: 12,
  createdAt: '2024-01-01T00:00:00.000Z',
  user: {
    _id: 'user-1',
    name: 'Jane Doe',
    profileImage: 'https://example.com/jane.jpg',
    profession: 'Web Developer',
  },
  offeredSkills: [mockOfferedSkill],
  requiredSkills: [mockRequiredSkill],
};
