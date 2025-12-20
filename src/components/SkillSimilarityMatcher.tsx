import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconSparkles,
  IconArrowRight,
  IconLoader2,
  IconAlertCircle,
  IconRocket,
  IconCheck,
} from "@tabler/icons-react";
import { useState } from "react";
import { useCalculateSkillSimilarityMutation } from "@/services/ai.service";
import type { TradingSkill } from "@/types/trading.types";

interface SkillMatch {
  mySkill: string;
  theirSkill: string;
  score: number;
  interpretation: string;
  type: "i-can-teach" | "i-want-learn";
}

interface SkillSimilarityMatcherProps {
  myOfferedSkills: TradingSkill[];
  myRequiredSkills: TradingSkill[];
  theirOfferedSkills: TradingSkill[];
  theirRequiredSkills: TradingSkill[];
  userName: string;
}

const SkillSimilarityMatcher = ({
  myOfferedSkills,
  myRequiredSkills,
  theirOfferedSkills,
  theirRequiredSkills,
  userName,
}: SkillSimilarityMatcherProps) => {
  const [matches, setMatches] = useState<SkillMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [calculateSimilarity] = useCalculateSkillSimilarityMutation();

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return "from-green-500 to-emerald-500";
    if (score >= 0.5) return "from-blue-500 to-cyan-500";
    if (score >= 0.3) return "from-orange-500 to-amber-500";
    return "from-red-500 to-rose-500";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 0.7) return "text-green-600 dark:text-green-400";
    if (score >= 0.5) return "text-blue-600 dark:text-blue-400";
    if (score >= 0.3) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const analyzeSkillMatches = async () => {
    setIsAnalyzing(true);
    const foundMatches: SkillMatch[] = [];

    try {
      // Compare my offered skills with their required skills (what I can teach them)
      for (const mySkill of myOfferedSkills) {
        for (const theirSkill of theirRequiredSkills) {
          const result = await calculateSimilarity({
            skill1: mySkill.name,
            skill2: theirSkill.name,
          }).unwrap();

          if (result.similarityScore >= 0.3) {
            foundMatches.push({
              mySkill: mySkill.name,
              theirSkill: theirSkill.name,
              score: result.similarityScore,
              interpretation: result.interpretation,
              type: "i-can-teach",
            });
          }
        }
      }

      // Compare my required skills with their offered skills (what they can teach me)
      for (const mySkill of myRequiredSkills) {
        for (const theirSkill of theirOfferedSkills) {
          const result = await calculateSimilarity({
            skill1: mySkill.name,
            skill2: theirSkill.name,
          }).unwrap();

          if (result.similarityScore >= 0.3) {
            foundMatches.push({
              mySkill: mySkill.name,
              theirSkill: theirSkill.name,
              score: result.similarityScore,
              interpretation: result.interpretation,
              type: "i-want-learn",
            });
          }
        }
      }

      // Sort by score (highest first)
      foundMatches.sort((a, b) => b.score - a.score);
      setMatches(foundMatches);
      setHasAnalyzed(true);
    } catch (error) {
      console.error("Error analyzing skills:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canAnalyze =
    (myOfferedSkills.length > 0 && theirRequiredSkills.length > 0) ||
    (myRequiredSkills.length > 0 && theirOfferedSkills.length > 0);

  if (!canAnalyze) {
    return (
      <Card className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
        <CardContent className="py-8 text-center">
          <IconAlertCircle
            size={40}
            className="mx-auto text-neutral-400 dark:text-neutral-600 mb-2"
          />
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            No skills available to compare. Add skills to see AI-powered matches!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <IconSparkles
              size={20}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </div>
          <div>
            <div className="text-neutral-800 dark:text-neutral-100">
              AI Skill Match Analysis
            </div>
            <div className="text-xs font-normal text-neutral-500 dark:text-neutral-400 mt-0.5">
              Find perfect skill exchange opportunities
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {!hasAnalyzed ? (
          <div className="text-center py-8">
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full w-fit mx-auto mb-4">
              <IconRocket
                size={48}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
              Discover Skill Matches
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
              Use AI to analyze compatibility between your skills and {userName}'s
              skills. Find the best opportunities for skill exchange!
            </p>
            <button
              onClick={analyzeSkillMatches}
              disabled={isAnalyzing}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-neutral-400 disabled:to-neutral-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {isAnalyzing ? (
                <>
                  <IconLoader2 size={20} className="animate-spin" />
                  Analyzing Skills...
                </>
              ) : (
                <>
                  <IconSparkles size={20} />
                  Analyze Skill Matches
                </>
              )}
            </button>
          </div>
        ) : (
          <>
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <IconLoader2
                  size={48}
                  className="text-indigo-500 animate-spin mb-3"
                />
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  AI is analyzing skill compatibility...
                </p>
              </div>
            ) : matches.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    {matches.length} Potential Match{matches.length !== 1 ? "es" : ""}{" "}
                    Found
                  </h4>
                  <button
                    onClick={analyzeSkillMatches}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    Re-analyze
                  </button>
                </div>

                <div className="space-y-3">
                  {matches.map((match, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white dark:bg-neutral-800/50 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      {/* Match Type Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            match.type === "i-can-teach"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                          }`}
                        >
                          {match.type === "i-can-teach"
                            ? "You Can Teach"
                            : "You Can Learn"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-bold ${getScoreTextColor(
                              match.score
                            )}`}
                          >
                            {(match.score * 100).toFixed(0)}%
                          </span>
                          <div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${getScoreColor(
                              match.score
                            )} shadow-md`}
                          />
                        </div>
                      </div>

                      {/* Skills Comparison */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 text-center">
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                            {match.type === "i-can-teach" ? "Your Skill" : "You Need"}
                          </div>
                          <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                            {match.mySkill}
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <div
                            className={`p-2 rounded-full bg-gradient-to-r ${getScoreColor(
                              match.score
                            )} shadow-lg`}
                          >
                            <IconArrowRight size={16} className="text-white" />
                          </div>
                        </div>

                        <div className="flex-1 text-center">
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                            {match.type === "i-can-teach"
                              ? `${userName} Needs`
                              : `${userName} Offers`}
                          </div>
                          <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm px-3 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                            {match.theirSkill}
                          </div>
                        </div>
                      </div>

                      {/* Interpretation */}
                      <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-2 text-xs">
                          <IconCheck
                            size={14}
                            className={getScoreTextColor(match.score)}
                          />
                          <span className="text-neutral-600 dark:text-neutral-400">
                            <strong className={getScoreTextColor(match.score)}>
                              {match.interpretation}
                            </strong>{" "}
                            - Great opportunity for skill exchange!
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <IconAlertCircle
                  size={40}
                  className="mx-auto text-neutral-400 dark:text-neutral-600 mb-2"
                />
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-1">
                  No Strong Matches Found
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  The AI couldn't find skills with high similarity scores (≥30%).
                </p>
                <button
                  onClick={analyzeSkillMatches}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Try Again
                </button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillSimilarityMatcher;
