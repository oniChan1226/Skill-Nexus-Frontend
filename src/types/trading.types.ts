// User for Trading Types
export interface TradingUser {
  name: string;
  profileImage: string;
  profession: string;
  _id: string;
}

export interface TradingSkill {
  _id: string;
  name: string;
  proficiencyLevel?: "beginner" | "intermediate" | "expert";
  learningPriority?: "high" | "medium" | "low";
  categories: string[];
  description?: string;
}

export interface UserForTrading {
  _id: string;
  rating: number;
  totalExchanges: number;
  createdAt: string;
  user: TradingUser;
  offeredSkills: TradingSkill[];
  requiredSkills: TradingSkill[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalPages: number;
  totalUsers: number;
}

export interface UsersForTradingResponse {
  statusCode: number;
  users: UserForTrading[];
  pagination: PaginationInfo;
  message: string;
  success: boolean;
}

// single user
export interface DetailedTradingUser {
  _id: string;
  name: string;
  profileImage: string;
  profession: string;
  address: {
    country: string;
    city: string;
  };
}

export type UserProfileMetrices = {
  pendingRequests: number;
  acceptedRequests: number;
  completedRequests: number;
  rejectedRequests: number;
};

export interface DetailedUserForTrading {
  _id: string;
  rating: number;
  totalExchanges: number;
  createdAt: string;
  userId: DetailedTradingUser; // ✅ used in single-user API
  offeredSkills: TradingSkill[];
  requiredSkills: TradingSkill[];
  metrics: UserProfileMetrices;
}

export interface SingleUserResponse {
  statusCode: number;
  skillProfile: DetailedUserForTrading;
  message: string;
  success: boolean;
}
