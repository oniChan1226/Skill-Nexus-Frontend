import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconBulb,
  IconSparkles,
  IconRocket,
  IconAlertCircle,
  IconCheck,
  IconClock,
  IconLock,
} from "@tabler/icons-react";
import type {
  SkillRecommendation,
  LearningPathStep,
} from "@/types/ai.types";

interface AIRecommendationsProps {
  recommendations: SkillRecommendation[];
  learningPath: LearningPathStep[];
  currentSkills: {
    offered: number;
    required: number;
  };
}

const AIRecommendations = ({
  recommendations,
  learningPath,
  currentSkills,
}: AIRecommendationsProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <IconCheck size={16} className="text-green-500" />;
      case "in-progress":
        return <IconClock size={16} className="text-blue-500" />;
      case "pending":
        return <IconLock size={16} className="text-orange-500" />;
      default:
        return <IconClock size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "in-progress":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      case "pending":
        return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800";
    }
  };

  // Show empty state if no skills are added
  if (currentSkills.offered === 0 && currentSkills.required === 0) {
    return (
      <Card className="border border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 via-amber-50/50 to-transparent dark:from-amber-900/10 dark:via-amber-900/5 dark:to-transparent">
        <CardContent className="py-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-amber-100 dark:bg-amber-900/20 rounded-full">
              <IconBulb size={48} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                Get AI-Powered Recommendations
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Add your skills to receive personalized learning recommendations
                and a custom learning path tailored to your goals.
              </p>
            </div>
            <div className="flex gap-2 text-sm text-neutral-500 dark:text-neutral-400 pt-2">
              <span className="px-3 py-1 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
                {currentSkills.offered} skills offered
              </span>
              <span className="px-3 py-1 bg-white dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-700">
                {currentSkills.required} skills needed
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Skill Recommendations */}
      <Card className="border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 via-indigo-50/50 to-transparent dark:from-indigo-900/10 dark:via-indigo-900/5 dark:to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <IconSparkles size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <div className="text-neutral-800 dark:text-neutral-100">
                AI Skill Recommendations
              </div>
              <div className="text-xs font-normal text-neutral-500 dark:text-neutral-400 mt-0.5">
                Based on your profile and goals
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length > 0 ? (
            <div className="space-y-2.5">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="group p-3 bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <IconBulb
                        size={18}
                        className="text-indigo-500 group-hover:text-indigo-600 transition-colors"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm">
                        {rec.skill}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                        {rec.reason}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
              <IconAlertCircle size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recommendations available yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="border border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 via-purple-50/50 to-transparent dark:from-purple-900/10 dark:via-purple-900/5 dark:to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <IconRocket size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-neutral-800 dark:text-neutral-100">
                Your Learning Path
              </div>
              <div className="text-xs font-normal text-neutral-500 dark:text-neutral-400 mt-0.5">
                Personalized roadmap to success
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {learningPath.length > 0 ? (
            <div className="space-y-3">
              {learningPath.map((step, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg transition-all duration-200 ${getStatusColor(
                    step.status
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getStatusIcon(step.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 text-sm">
                          {step.skill}
                        </h4>
                        <span className="text-xs px-2 py-0.5 bg-white dark:bg-neutral-800 rounded-full text-neutral-600 dark:text-neutral-400 capitalize">
                          {step.status}
                        </span>
                      </div>
                      {step.prerequisites.length > 0 && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                          <span className="font-medium">Prerequisites:</span>
                          <span>{step.prerequisites.join(", ")}</span>
                        </div>
                      )}
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5">
                        {step.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
              <IconAlertCircle size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No learning path available yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIRecommendations;
