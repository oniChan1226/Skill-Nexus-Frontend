import { Card } from "@/components/ui/card";
import {
  IconStar,
  IconTrophy,
  IconSparkles,
  IconMapPin,
  IconBriefcase,
  IconCheck,
  IconMessageCircle,
} from "@tabler/icons-react";
import type { Teacher } from "@/types/ai.types";
import { useNavigate } from "react-router-dom";

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  const navigate = useNavigate();

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case "expert":
        return "from-green-500 to-emerald-500 text-white";
      case "intermediate":
        return "from-blue-500 to-cyan-500 text-white";
      case "beginner":
        return "from-orange-500 to-amber-500 text-white";
      default:
        return "from-gray-500 to-slate-500 text-white";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
    if (score >= 60) return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
    if (score >= 40) return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20";
    return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
  };

  return (
    <Card className="group relative overflow-hidden bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 shadow-md hover:shadow-xl transition-all duration-300">
      {/* AI Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold shadow-lg">
          <IconSparkles size={12} />
          <span>AI Match</span>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={teacher.user.profileImage}
              alt={teacher.user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200 dark:border-indigo-700 shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white dark:border-neutral-900 rounded-full flex items-center justify-center">
              <IconCheck size={14} className="text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 truncate">
              {teacher.user.name}
            </h3>
            
            {/* Location & Bio */}
            <div className="mt-1 space-y-1">
              {(teacher.user.address?.city || teacher.user.address?.country) && (
                <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <IconMapPin size={12} />
                  <span>
                    {[teacher.user.address.city, teacher.user.address.country]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-amber-500">
                <IconStar size={14} fill="currentColor" />
                <span className="text-xs font-semibold">
                  {teacher.rating > 0 ? teacher.rating.toFixed(1) : "New"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-indigo-500">
                <IconTrophy size={14} />
                <span className="text-xs font-semibold">
                  {teacher.totalExchanges} exchanges
                </span>
              </div>
            </div>
          </div>

          {/* Teacher Score */}
          <div className={`flex-shrink-0 px-3 py-2 rounded-xl ${getScoreColor(teacher.teacherScore)} border border-current/20`}>
            <div className="text-center">
              <div className="text-2xl font-bold">{teacher.teacherScore}</div>
              <div className="text-[10px] font-medium uppercase">Score</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />

        {/* Skill Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
              <IconBriefcase size={14} />
              Teaching
            </h4>
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getProficiencyColor(
                teacher.skill.proficiencyLevel
              )} shadow-md`}
            >
              {teacher.skill.proficiencyLevel}
            </div>
          </div>

          <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
            <h5 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
              {teacher.skill.name}
            </h5>
            {teacher.skill.description && (
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                {teacher.skill.description}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {teacher.user.bio && (
          <div className="pt-2">
            <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
              {teacher.user.bio}
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => navigate(`/dashboard/users/${teacher.user.id}`)}
          className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <IconMessageCircle size={16} />
          <span>Connect with Teacher</span>
        </button>
      </div>
    </Card>
  );
};

export default TeacherCard;
