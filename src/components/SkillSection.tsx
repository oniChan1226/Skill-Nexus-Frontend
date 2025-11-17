import React from "react";
import { IconStar, IconPlus, IconTool, IconTarget, IconLoader2 } from "@tabler/icons-react";
import Button from "./shared/Button";

export interface Skill {
  name: string;
  category: string;
  level: string;
  status?: "active" | "paused";
  rating: number;
  requests: number;
  priority?: "High" | "Medium" | "Low"; // ✅ Optional for interested skills
}

interface SkillSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  skills: Skill[];
  isLoading?: boolean;
  onAddClick?: () => void;
  onViewDetails?: (skill: Skill) => void;
}

const SkillCard = ({
  skill,
  onViewDetails,
  isInterest,
}: {
  skill: Skill;
  onViewDetails?: (skill: Skill) => void;
  isInterest?: boolean;
}) => (
  <div className="flex items-center justify-between bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:shadow-md transition-all duration-150">
    {/* Left side */}
    <div>
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-lg">{skill.name}</h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            skill.status === "active"
              ? "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-400"
              : "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
          }`}
        >
          {skill.status}
        </span>

        {/* ✅ Show priority only for interests */}
        {isInterest && skill.priority && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1
            ${
              skill.priority === "High"
                ? "bg-red-100 text-red-700 dark:bg-red-800/40 dark:text-red-400"
                : skill.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/40 dark:text-yellow-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-800/40 dark:text-blue-400"
            }`}
          >
            <IconTarget size={14} /> {skill.priority}
          </span>
        )}
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-start">
        {skill.category} • {skill.level} •{" "}
        <span className="inline-flex items-center gap-1 ml-1">
          <IconStar size={18} fill="gold" stroke={0} /> {skill.rating}
        </span>
      </p>
    </div>

    {/* Right side */}
    <div className="flex items-center gap-3">
      <p className="text-sm text-neutral-500">{skill.requests} requests</p>
      <Button
        className={`!text-sm !px-3 !py-1.5 !bg-indigo-50 dark:!bg-neutral-800 hover:!bg-indigo-100 dark:hover:!bg-indigo-900/40 !text-indigo-600 dark:!text-indigo-300`}
        onClick={() => onViewDetails?.(skill)}
      >
        {isInterest ? "Find Match" : "View Details"}
      </Button>
    </div>
  </div>
);

const SkillSection: React.FC<SkillSectionProps> = ({
  title,
  subtitle,
  buttonText,
  skills,
  isLoading = false,
  onAddClick,
  onViewDetails,
}) => {
  // Detect if this section is about interests
  const isInterest = title.toLowerCase().includes("seeking");

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-neutral-500 text-sm">{subtitle}</p>
        </div>
        <Button
          onClick={onAddClick}
          className="px-3 text-sm py-2 flex items-center gap-1 font-medium hover:scale-105 transition-transform"
        >
          <IconPlus size={18} /> {buttonText}
        </Button>
      </div>

      {/* Skills List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <IconLoader2 size={24} className="animate-spin" />
              <span>Loading skills...</span>
            </div>
          </div>
        ) : skills.length > 0 ? (
          skills.map((skill, index) => (
            <SkillCard
              key={index}
              skill={skill}
              onViewDetails={onViewDetails}
              isInterest={isInterest}
            />
          ))
        ) : (
          <div className="text-center flex flex-col items-center justify-center py-8">
            <div className="relative mb-3">
              <div className="absolute -inset-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-full blur-md opacity-70" />
              <div className="relative bg-white dark:bg-neutral-800 p-4 rounded-full shadow-md">
                <IconTool
                  size={32}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Add Skills & Start Exchanging
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              No skills added yet — let’s fix that!
            </p>
            <Button
              onClick={onAddClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow-md hover:bg-indigo-500 transition"
            >
              <IconPlus size={18} />
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSection;
