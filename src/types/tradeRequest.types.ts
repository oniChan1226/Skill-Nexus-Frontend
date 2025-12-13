/**
 * TRADE REQUEST TYPES
 * 
 * Matches backend TradeRequest model for skill barter system
 */

export interface TradeRequestUser {
  _id: string;
  name: string;
  profileImage: string;
}

export interface TradeRequestSkill {
  _id: string;
  name: string;
}

export interface TradeRequest {
  _id: string;
  sender: TradeRequestUser;
  receiver: TradeRequestUser;
  senderOfferedSkill: TradeRequestSkill;
  receiverOfferedSkill: TradeRequestSkill;
  message?: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  completedBy: string[];
  createdAt: string;
  updatedAt: string;
}

// API Request/Response types
export interface CreateTradeRequestPayload {
  receiverId: string;
  senderOfferedSkillId: string;
  receiverOfferedSkillId: string;
  message?: string;
}

export interface UpdateTradeStatusPayload {
  status: "accepted" | "rejected" | "completed";
}

export interface TradeRequestResponse {
  statusCode: number;
  trade: TradeRequest;
  message: string;
  success: boolean;
}

export interface TradeRequestsResponse {
  statusCode: number;
  trades: TradeRequest[];
  message: string;
  success: boolean;
}
