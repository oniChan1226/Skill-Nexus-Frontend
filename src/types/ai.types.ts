// AI Skill Recommendations Types
export interface SkillRecommendation {
  skill: string;
  reason: string;
}

export interface LearningPathStep {
  skill: string;
  prerequisites: string[];
  status: "ready" | "pending" | "in-progress";
  recommendation: string;
}

export interface CurrentSkillsCount {
  offered: number;
  required: number;
}

export interface AIRecommendationsResponse {
  statusCode: number;
  recommendations: SkillRecommendation[];
  learningPath: LearningPathStep[];
  currentSkills: CurrentSkillsCount;
  message: string;
  success: boolean;
}

// AI Profile Analysis Types
export interface ProfileCompleteness {
  bio: number;
  profileImage: number;
  address: number;
  profession: number;
  socialLinks: number;
  offeredSkills: number;
  requiredSkills: number;
}

export interface ProfileSentiment {
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  confidence: number;
  insights: string[];
}

export interface ProfileStats {
  rating: number;
  totalExchanges: number;
  offeredSkills: number;
  requiredSkills: number;
}

export interface ProfileAnalysisResponse {
  statusCode: number;
  profileStrength: number;
  completeness: ProfileCompleteness;
  sentiment: ProfileSentiment;
  suggestions: string[];
  stats: ProfileStats;
  message: string;
  success: boolean;
}

// AI Teacher Search Types
export interface TeacherUser {
  id: string;
  name: string;
  profileImage: string;
  bio: string;
  address: {
    city?: string;
    country?: string;
  };
}

export interface TeacherSkill {
  name: string;
  proficiencyLevel: "beginner" | "intermediate" | "expert";
  description: string;
}

export interface Teacher {
  user: TeacherUser;
  skill: TeacherSkill;
  rating: number;
  totalExchanges: number;
  teacherScore: number;
}

export interface FindTeachersResponse {
  statusCode: number;
  teachers: Teacher[];
  message: string;
  success: boolean;
}

// AI Skill Similarity Types
export interface SkillSimilarityRequest {
  skill1: string;
  skill2: string;
}

export interface SkillSimilarityResponse {
  statusCode: number;
  skill1: string;
  skill2: string;
  similarityScore: number;
  interpretation: string;
  method: string;
  message: string;
  success: boolean;
}

// AI Learning Path Types
export interface LearningPathSkill {
  skill: string;
  reason: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "TARGET";
  estimatedTime: string;
  similarityToTarget: number;
}

export interface LearningPathPhase {
  phase: number;
  title: string;
  description: string;
  duration: string;
  skills: LearningPathSkill[];
}

export interface LearningPathRecommendations {
  startWith: string;
  focusAreas: string[];
  leverageExisting: string[];
  studyApproach: string;
  estimatedTimeToTarget: string;
}

export interface GapAnalysis {
  totalPrerequisites: number;
  skillsYouHave: number;
  skillsToLearn: number;
  estimatedTotalTime: string;
}

export interface LearningPathRequest {
  targetSkill: string;
}

export interface LearningPathResponse {
  statusCode: number;
  targetSkill: string;
  readinessScore: number;
  readinessLevel: string;
  currentSkillsCount: number;
  learningPath: LearningPathPhase[];
  recommendations: LearningPathRecommendations;
  mentorsAvailable: any[];
  gapAnalysis: GapAnalysis;
  message: string;
  success: boolean;
}
