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
