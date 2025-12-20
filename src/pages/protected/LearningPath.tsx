import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import {
  IconSparkles,
  IconRocket,
  IconLoader2,
  IconArrowLeft,
  IconTarget,
  IconBulb,
  IconAlertCircle,
  IconClock,
  IconBook,
  IconCheck,
  IconUsers,
  IconPlus,
  IconRoad,
  IconListCheck,
} from "@tabler/icons-react";
import { useGetLearningPathMutation } from "@/services/ai.service";

const learningPathSkills = [
  // Web Development
  { value: "React", label: "React.js", category: "Web Development" },
  { value: "Vue", label: "Vue.js", category: "Web Development" },
  { value: "Angular", label: "Angular", category: "Web Development" },
  { value: "Node", label: "Node.js", category: "Web Development" },
  { value: "Full Stack", label: "Full Stack Development", category: "Web Development" },
  
  // Data Science & ML
  { value: "Machine Learning", label: "Machine Learning", category: "Data Science & ML" },
  { value: "Data Science", label: "Data Science", category: "Data Science & ML" },
  { value: "Deep Learning", label: "Deep Learning", category: "Data Science & ML" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence", category: "Data Science & ML" },
  
  // Mobile Development
  { value: "React Native", label: "React Native", category: "Mobile Development" },
  { value: "Flutter", label: "Flutter", category: "Mobile Development" },
  { value: "iOS Development", label: "iOS Development", category: "Mobile Development" },
  
  // Backend & Databases
  { value: "MongoDB", label: "MongoDB", category: "Backend & Databases" },
  { value: "PostgreSQL", label: "PostgreSQL", category: "Backend & Databases" },
  { value: "GraphQL", label: "GraphQL", category: "Backend & Databases" },
  
  // DevOps & Cloud
  { value: "Docker", label: "Docker", category: "DevOps & Cloud" },
  { value: "Kubernetes", label: "Kubernetes", category: "DevOps & Cloud" },
  { value: "AWS", label: "AWS", category: "DevOps & Cloud" },
  
  // Design
  { value: "UI Design", label: "UI Design", category: "Design" },
  { value: "UX Design", label: "UX Design", category: "Design" }
];

const LearningPath = () => {
  const [targetSkill, setTargetSkill] = useState("");
  const [getLearningPath, { data, isLoading, error }] =
    useGetLearningPathMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetSkill) {
      getLearningPath({ targetSkill });
    }
  };

  // Group skills by category for organized dropdown
  const groupedSkills = learningPathSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof learningPathSkills>);

  const getPriorityColor = (priority: string) => {
    switch (priority.toUpperCase()) {
      case "CRITICAL":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
      case "HIGH":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300";
      case "MEDIUM":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
      case "LOW":
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
      case "TARGET":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch (priority.toUpperCase()) {
      case "CRITICAL":
        return "border-red-300 dark:border-red-700";
      case "HIGH":
        return "border-orange-300 dark:border-orange-700";
      case "MEDIUM":
        return "border-blue-300 dark:border-blue-700";
      case "LOW":
        return "border-gray-300 dark:border-gray-700";
      case "TARGET":
        return "border-purple-300 dark:border-purple-700";
      default:
        return "border-gray-300 dark:border-gray-700";
    }
  };

  const getReadinessColor = (score: number) => {
    if (score >= 75) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-blue-600 dark:text-blue-400";
    if (score >= 25) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>AI Learning Path</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <IconArrowLeft size={18} /> Back to Dashboard
        </Link>
      </div>

      {/* Header Card */}
      <Card className="border border-indigo-200 dark:border-indigo-800 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
              <IconRocket size={32} className="text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                AI Learning Path Generator
              </CardTitle>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Get a comprehensive, phase-by-phase roadmap to master any skill
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Search Form */}
      <Card className="border border-purple-200 dark:border-purple-800 dark:bg-transparent shadow-md">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="targetSkill"
                className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2"
              >
                What skill do you want to master?
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Select value={targetSkill} onValueChange={setTargetSkill}>
                    <SelectTrigger className="w-full dark:text-neutral-50 h-12 text-base bg-white dark:hover:bg-neutral-800 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700">
                      <div className="flex items-center gap-2 w-full">
                        <IconTarget size={18} className="text-neutral-400  flex-shrink-0" />
                        <SelectValue placeholder="Choose a skill to master..." />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="max-h-[400px] dark:bg-neutral-800 dark:border-neutral-700">
                      {Object.entries(groupedSkills).map(([category, skills]) => (
                        <SelectGroup key={category} className="dark:bg-neutral-800">
                          <SelectLabel className="text-md font-bold text-indigo-800 dark:text-indigo-300 px-2 py-2">
                            {category}
                          </SelectLabel>
                          {skills.map((skill) => (
                            <SelectItem
                              key={skill.value}
                              value={skill.value}
                              className="cursor-pointer dark:text-neutral-100"
                            >
                              {skill.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <button
                  type="submit"
                  disabled={!targetSkill || isLoading}
                  className="px-8 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-neutral-400 disabled:to-neutral-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
                >
                  {isLoading ? (
                    <>
                      <IconLoader2 size={20} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <IconSparkles size={20} />
                      Generate Path
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
              <IconBulb size={16} className="text-indigo-500 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Pro tip:</strong> Select from our curated list of skills.
                Our AI will analyze your current skills and create a comprehensive,
                phase-by-phase learning roadmap tailored to your goals.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="border border-neutral-200 dark:border-neutral-800 dark:bg-transparent">
          <CardContent className="py-20">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <IconLoader2
                  size={64}
                  className="text-indigo-500 animate-spin opacity-80"
                />
                <IconSparkles
                  size={24}
                  className="text-purple-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400 font-medium">
                AI is crafting your personalized learning path...
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                Analyzing your skills and generating recommendations
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
          <CardContent className="py-8 text-center">
            <IconAlertCircle
              size={48}
              className="mx-auto text-red-500 dark:text-red-400 mb-3"
            />
            <p className="text-red-600 dark:text-red-400 font-medium">
              Failed to generate learning path
            </p>
            <p className="text-sm text-red-500 dark:text-red-500 mt-1">
              Please try again with a different skill or check your connection
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {data && !isLoading && (
        <div className="space-y-6">
          {/* Readiness Score Card */}
          <Card className="border border-indigo-200 dark:border-indigo-800 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                <IconTarget className="text-indigo-600 dark:text-indigo-400" />
                Readiness Assessment
              </CardTitle>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Your current readiness to learn{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {targetSkill}
                </span>
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Readiness Score Circle */}
                <div className="flex flex-col items-center justify-center p-6">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-neutral-200 dark:text-neutral-700"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 88}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 88 * (1 - data.readinessScore / 100)
                        }`}
                        className={getReadinessColor(data.readinessScore)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-neutral-900 dark:text-neutral-100">
                        {data.readinessScore}
                      </span>
                      <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                        Readiness Score
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {data.readinessLevel}
                    </span>
                  </div>
                </div>

                {/* Gap Analysis */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <IconListCheck className="text-indigo-600 dark:text-indigo-400" />
                    Gap Analysis
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Total Prerequisites
                      </span>
                      <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {data.gapAnalysis.totalPrerequisites}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                      <span className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
                        <IconCheck size={16} />
                        Skills You Have
                      </span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        {data.gapAnalysis.skillsYouHave}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
                      <span className="text-sm font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
                        <IconBook size={16} />
                        Skills to Learn
                      </span>
                      <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {data.gapAnalysis.skillsToLearn}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
                        <IconClock size={16} />
                        Estimated Time
                      </span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {data.gapAnalysis.estimatedTotalTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Card */}
          <Card className="border dark:bg-transparent border-purple-200 dark:border-purple-800 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 py-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                <IconBulb className="text-purple-600 dark:text-purple-400 " />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Start With */}
                <div>
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
                    <IconRocket size={16} className="text-purple-600 dark:text-purple-400" />
                    Start With
                  </h4>
                  <p className="text-neutral-900 dark:text-neutral-100 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
                    {data.recommendations.startWith}
                  </p>
                </div>

                {/* Study Approach */}
                <div>
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2 flex items-center gap-2">
                    <IconBook size={16} className="text-purple-600 dark:text-purple-400" />
                    Study Approach
                  </h4>
                  <p className="text-neutral-900 dark:text-neutral-100 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
                    {data.recommendations.studyApproach}
                  </p>
                </div>
              </div>

              {/* Focus Areas */}
              <div>
                <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
                  <IconTarget size={16} className="text-purple-600 dark:text-purple-400" />
                  Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.recommendations.focusAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estimated Time */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                    <IconClock size={18} className="text-purple-600 dark:text-purple-400" />
                    Estimated Time to Target Skill
                  </span>
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {data.recommendations.estimatedTimeToTarget}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Path Phases */}
          <Card className="border dark:bg-transparent border-indigo-200 dark:border-indigo-800 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                <IconRoad className="text-indigo-600 dark:text-indigo-400" />
                Phase-by-Phase Learning Path
              </CardTitle>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Follow this structured roadmap from foundation to mastery
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {data.learningPath.map((phase, idx) => (
                  <div key={idx}>
                    {/* Phase Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold shadow-md flex-shrink-0">
                        {phase.phase}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                          {phase.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {phase.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
                            <IconClock size={14} />
                            {phase.duration}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-500">
                            {phase.skills.length} skill{phase.skills.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="ml-[4rem] grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {phase.skills.map((skillItem, skillIdx) => (
                        <Card
                          key={skillIdx}
                          className={`border-2 transition-all hover:shadow-md ${getPriorityBorder(skillItem.priority)} dark:bg-transparent`}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              {/* Skill Name and Priority */}
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 flex-1">
                                  {skillItem.skill}
                                </h4>
                                <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(skillItem.priority)}`}>
                                  {skillItem.priority}
                                </span>
                              </div>

                              {/* Reason */}
                              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                {skillItem.reason}
                              </p>

                              {/* Stats */}
                              <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-700">
                                <div className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
                                  <IconClock size={14} />
                                  <span>{skillItem.estimatedTime}</span>
                                </div>
                                {skillItem.similarityToTarget !== undefined && (
                                  <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                                    <IconTarget size={14} />
                                    <span>{skillItem.similarityToTarget}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Divider between phases */}
                    {idx < data.learningPath.length - 1 && (
                      <div className="mt-8 ml-[1.4rem] border-l-2 border-dashed border-neutral-300 dark:border-neutral-600 h-8" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Card */}
          <Card className="border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
                  <IconBulb size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Find skilled teachers in our community or share your expertise
                  to help others learn. Connect, grow, and master new skills
                  together.
                </p>
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <Link
                    to="/dashboard/users"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <IconUsers size={20} />
                    Find Teachers
                  </Link>
                  <Link
                    to="/dashboard/add-skills"
                    className="px-6 py-3 bg-white dark:bg-neutral-800 border-2 border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  >
                    <IconPlus size={20} />
                    Share Your Skills
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!data && !isLoading && !error && (
        <Card className="border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
          <CardContent className="py-20 text-center">
            <div className="p-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full w-fit mx-auto mb-4">
              <IconRocket size={64} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
              Start Your Learning Journey
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              Select your target skill from the dropdown above to receive a personalized
              AI-generated learning path with phase-by-phase guidance and priority-based
              skill recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LearningPath;
