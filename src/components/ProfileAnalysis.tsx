import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconSparkles,
  IconChartBar,
  IconMoodHappy,
  IconMoodSmile,
  IconMoodSad,
  IconBulb,
  IconTrendingUp,
  IconAlertCircle,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import type {
  ProfileCompleteness,
  ProfileSentiment,
  ProfileStats,
} from "@/types/ai.types";

interface ProfileAnalysisProps {
  profileStrength: number;
  completeness: ProfileCompleteness;
  sentiment: ProfileSentiment;
  suggestions: string[];
  stats: ProfileStats;
}

const ProfileAnalysis = ({
  profileStrength,
  completeness,
  sentiment,
  suggestions,
  stats,
}: ProfileAnalysisProps) => {
  const getSentimentIcon = (sentimentType: string) => {
    switch (sentimentType) {
      case "POSITIVE":
        return <IconMoodHappy size={24} className="text-green-500" />;
      case "NEUTRAL":
        return <IconMoodSmile size={24} className="text-blue-500" />;
      case "NEGATIVE":
        return <IconMoodSad size={24} className="text-red-500" />;
      default:
        return <IconMoodSmile size={24} className="text-gray-500" />;
    }
  };

  const getSentimentColor = (sentimentType: string) => {
    switch (sentimentType) {
      case "POSITIVE":
        return "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 border-green-200 dark:border-green-800";
      case "NEUTRAL":
        return "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/10 border-blue-200 dark:border-blue-800";
      case "NEGATIVE":
        return "from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10 border-red-200 dark:border-red-800";
      default:
        return "from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/10 border-gray-200 dark:border-gray-800";
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 80) return "text-green-600 dark:text-green-400";
    if (strength >= 60) return "text-blue-600 dark:text-blue-400";
    if (strength >= 40) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getStrengthBgColor = (strength: number) => {
    if (strength >= 80) return "bg-green-500";
    if (strength >= 60) return "bg-blue-500";
    if (strength >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const completenessFields = [
    { name: "Bio", value: completeness.bio, max: 15 },
    { name: "Profile Image", value: completeness.profileImage, max: 15 },
    { name: "Address", value: completeness.address, max: 10 },
    { name: "Profession", value: completeness.profession, max: 10 },
    { name: "Social Links", value: completeness.socialLinks, max: 10 },
    { name: "Offered Skills", value: completeness.offeredSkills, max: 10 },
    { name: "Required Skills", value: completeness.requiredSkills, max: 10 },
  ];

  return (
    <div className="space-y-4">
      {/* Profile Strength Card */}
      <Card className="border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 via-indigo-50/50 to-transparent dark:from-indigo-900/20 dark:via-indigo-900/10 dark:to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <IconSparkles
                size={20}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>
            <div className="flex-1">
              <div className="text-neutral-800 dark:text-neutral-100">
                AI Profile Analysis
              </div>
              <div className="text-xs font-normal text-neutral-500 dark:text-neutral-400 mt-0.5">
                Powered by advanced AI insights
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Profile Strength Score */}
            <div className="text-center space-y-3">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-neutral-200 dark:text-neutral-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 56 * (1 - profileStrength / 100)
                    }`}
                    className={`${getStrengthBgColor(
                      profileStrength
                    )} transition-all duration-1000 ease-out`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-4xl font-bold ${getStrengthColor(
                      profileStrength
                    )}`}
                  >
                    {profileStrength}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Profile Score
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <IconTrendingUp
                  size={16}
                  className={getStrengthColor(profileStrength)}
                />
                <span className="text-neutral-600 dark:text-neutral-400">
                  {profileStrength >= 80
                    ? "Excellent profile!"
                    : profileStrength >= 60
                    ? "Good progress!"
                    : profileStrength >= 40
                    ? "Keep improving!"
                    : "Needs attention"}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                  {stats.rating.toFixed(1)}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Rating
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                  {stats.totalExchanges}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Exchanges
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                  {stats.offeredSkills}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Skills Offered
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                  {stats.requiredSkills}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Skills Wanted
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Profile Completeness */}
        <Card className="border border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 via-purple-50/50 to-transparent dark:from-purple-900/20 dark:via-purple-900/10 dark:to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <IconChartBar
                  size={20}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              <div>
                <div className="text-neutral-800 dark:text-neutral-100">
                  Profile Completeness
                </div>
                <div className="text-xs font-normal text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Breakdown by section
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completenessFields.map((field) => {
                const percentage = (field.value / field.max) * 100;
                const isComplete = field.value === field.max;
                return (
                  <div key={field.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                        {isComplete ? (
                          <IconCheck size={14} className="text-green-500" />
                        ) : (
                          <IconX size={14} className="text-neutral-400" />
                        )}
                        {field.name}
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-xs font-medium">
                        {field.value}/{field.max}
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isComplete ? "bg-green-500" : "bg-purple-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sentiment & Suggestions */}
        <div className="space-y-4">
          {/* Sentiment Card */}
          <Card
            className={`border bg-gradient-to-br ${getSentimentColor(
              sentiment.sentiment
            )}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div
                  className={`p-2 ${
                    sentiment.sentiment === "POSITIVE"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : sentiment.sentiment === "NEUTRAL"
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  } rounded-lg`}
                >
                  {getSentimentIcon(sentiment.sentiment)}
                </div>
                <div>
                  <div className="text-neutral-800 dark:text-neutral-100">
                    Profile Sentiment
                  </div>
                  <div className="text-xs font-normal text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {(sentiment.confidence * 100).toFixed(0)}% confidence
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sentiment.insights.map((insight, index) => (
                  <div
                    key={index}
                    className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                  >
                    <span className="text-neutral-400 mt-0.5">•</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Suggestions Card */}
          <Card className="border border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 via-amber-50/50 to-transparent dark:from-amber-900/20 dark:via-amber-900/10 dark:to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <IconBulb
                    size={20}
                    className="text-amber-600 dark:text-amber-400"
                  />
                </div>
                <div>
                  <div className="text-neutral-800 dark:text-neutral-100">
                    Suggestions
                  </div>
                  <div className="text-xs font-normal text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Ways to improve your profile
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {suggestions.length > 0 ? (
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2.5 bg-white dark:bg-neutral-800/50 rounded-lg border border-amber-200 dark:border-amber-800/50 text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                    >
                      <IconAlertCircle
                        size={16}
                        className="text-amber-500 mt-0.5 flex-shrink-0"
                      />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-neutral-500 dark:text-neutral-400">
                  <IconCheck size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Your profile looks great! 🎉</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileAnalysis;
