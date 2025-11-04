import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconStar,
  IconTrophy,
  IconLoader2,
  IconUserCircle,
  IconBriefcase,
  IconCalendar,
  IconX,
  IconExchange,
  IconCheck,
} from "@tabler/icons-react";
import { useGetUsersForTradingQuery } from "@/services/trading.service";
import { useState } from "react";
import Button from "@/components/shared/Button";
import type { UserForTrading, TradingSkill } from "@/types/trading.types";

// Trade Skills Modal Component
const TradeSkillsModal = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: UserForTrading;
}) => {
  const [selectedOfferedSkill, setSelectedOfferedSkill] =
    useState<TradingSkill | null>(null);
  const [selectedRequiredSkill, setSelectedRequiredSkill] =
    useState<TradingSkill | null>(null);

  const handleSubmit = () => {
    if (selectedOfferedSkill && selectedRequiredSkill) {
      console.log("Trade Request:", {
        teachSkill: selectedOfferedSkill,
        learnSkill: selectedRequiredSkill,
        withUser: user.user._id,
      });
      // TODO: Implement actual API call
      alert(
        `Trade request sent!\nYou'll teach: ${selectedOfferedSkill.name}\nYou'll learn: ${selectedRequiredSkill.name}`
      );
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <IconExchange size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Trade Skills with {user.user.name}
                </h2>
                <p className="text-sm text-white/80">
                  Select skills to exchange
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <IconX size={24} className="text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
              How it works:
            </h3>
            <ol className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1 list-decimal list-inside">
              <li>Select a skill you want to teach from your offered skills</li>
              <li>Select a skill you want to learn from {user.user.name}'s offered skills</li>
              <li>Submit your trade request and wait for approval</li>
            </ol>
          </div>

          {/* Select Skill to Teach */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-bold">
                1
              </span>
              Select Skill You'll Teach
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Choose from your offered skills:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* TODO: Replace with actual user's offered skills */}
              {[
                { _id: "1", name: "React Development", proficiencyLevel: "expert", categories: ["Frontend"] },
                { _id: "2", name: "Node.js", proficiencyLevel: "intermediate", categories: ["Backend"] },
              ].map((skill: any) => (
                <button
                  key={skill._id}
                  onClick={() => setSelectedOfferedSkill(skill)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedOfferedSkill?._id === skill._id
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {skill.name}
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {skill.proficiencyLevel && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              skill.proficiencyLevel === "expert"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : skill.proficiencyLevel === "intermediate"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {skill.proficiencyLevel}
                          </span>
                        )}
                        {skill.categories?.map((cat: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedOfferedSkill?._id === skill._id && (
                      <IconCheck
                        size={20}
                        className="text-indigo-600 dark:text-indigo-400 flex-shrink-0"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Select Skill to Learn */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-bold">
                2
              </span>
              Select Skill You Want to Learn
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
              Choose from {user.user.name}'s offered skills:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {user.offeredSkills.map((skill) => (
                <button
                  key={skill._id}
                  onClick={() => setSelectedRequiredSkill(skill)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedRequiredSkill?._id === skill._id
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {skill.name}
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {skill.proficiencyLevel && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              skill.proficiencyLevel === "expert"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : skill.proficiencyLevel === "intermediate"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {skill.proficiencyLevel}
                          </span>
                        )}
                        {skill.categories?.map((cat, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedRequiredSkill?._id === skill._id && (
                      <IconCheck
                        size={20}
                        className="text-purple-600 dark:text-purple-400 flex-shrink-0"
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trade Summary */}
          {selectedOfferedSkill && selectedRequiredSkill && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                Trade Summary:
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <IconExchange
                    size={16}
                    className="text-indigo-600 dark:text-indigo-400"
                  />
                  <span className="text-neutral-700 dark:text-neutral-300">
                    You'll teach:{" "}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {selectedOfferedSkill.name}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <IconExchange
                    size={16}
                    className="text-purple-600 dark:text-purple-400"
                  />
                  <span className="text-neutral-700 dark:text-neutral-300">
                    You'll learn:{" "}
                    <span className="font-semibold text-purple-600 dark:text-purple-400">
                      {selectedRequiredSkill.name}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 p-6 rounded-b-xl">
          <div className="flex justify-end gap-3">
            <Button
              onClick={onClose}
              variant="secondary"
              className="!px-6 !py-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedOfferedSkill || !selectedRequiredSkill}
              className="!px-6 !py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconExchange size={18} />
              Send Trade Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main User Detail Component
const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // For now, fetch from the list and filter by ID
  // TODO: Replace with useGetUserForTradingByIdQuery when backend endpoint is ready
  const { data, isLoading, error } = useGetUsersForTradingQuery({
    page: 1,
    limit: 100,
  });

  const user = data?.users.find((u) => u._id === userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <IconLoader2
            size={48}
            className="text-indigo-600 dark:text-indigo-400 animate-spin"
          />
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading user details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
          <CardContent className="py-8 text-center">
            <p className="text-red-600 dark:text-red-400">
              User not found or failed to load.
            </p>
            <Button
              onClick={() => navigate("/dashboard/users")}
              variant="secondary"
              className="mt-4"
            >
              Back to Users
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <BreadcrumbLink asChild>
                <Link to="/dashboard/users">Users</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{user.user.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link
          to="/dashboard/users"
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <IconArrowLeft size={18} /> Back to Users
        </Link>
      </div>

      {/* User Profile Card */}
      <Card className="border border-neutral-200 dark:border-neutral-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white rounded-t-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {user.user.profileImage ? (
                <img
                  src={user.user.profileImage}
                  alt={user.user.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <IconUserCircle size={48} className="text-white" />
                </div>
              )}
              <div>
                <CardTitle className="text-2xl font-bold text-white">
                  {user.user.name}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1 text-white/90">
                  <IconBriefcase size={16} />
                  <span className="text-sm">
                    {user.user.profession || "Skill Exchanger"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                <IconStar size={18} fill="currentColor" />
                <span className="font-semibold">{user.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                <IconTrophy size={18} />
                <span className="text-sm">{user.totalExchanges} exchanges</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            <IconCalendar size={16} />
            <span>
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full !py-3 flex items-center justify-center gap-2"
          >
            <IconExchange size={20} />
            Trade Skills with {user.user.name}
          </Button>
        </CardContent>
      </Card>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Offered Skills */}
        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-md">
          <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20">
            <CardTitle className="text-lg font-semibold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <IconBriefcase
                  size={20}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>
              Skills They Offer ({user.offeredSkills.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {user.offeredSkills.length > 0 ? (
              <div className="space-y-3">
                {user.offeredSkills.map((skill) => (
                  <div
                    key={skill._id}
                    className="p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                  >
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {skill.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.proficiencyLevel && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            skill.proficiencyLevel === "expert"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : skill.proficiencyLevel === "intermediate"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {skill.proficiencyLevel}
                        </span>
                      )}
                      {skill.categories?.map((cat, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    {skill.description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-500 text-center py-8">
                No offered skills yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Required Skills */}
        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-md">
          <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
            <CardTitle className="text-lg font-semibold text-purple-900 dark:text-purple-200 flex items-center gap-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <IconExchange
                  size={20}
                  className="text-purple-600 dark:text-purple-400"
                />
              </div>
              Skills They Want ({user.requiredSkills.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {user.requiredSkills.length > 0 ? (
              <div className="space-y-3">
                {user.requiredSkills.map((skill) => (
                  <div
                    key={skill._id}
                    className="p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                  >
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {skill.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.learningPriority && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            skill.learningPriority === "high"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : skill.learningPriority === "medium"
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                          }`}
                        >
                          {skill.learningPriority} priority
                        </span>
                      )}
                      {skill.categories?.map((cat, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    {skill.description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-500 text-center py-8">
                No required skills yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trade Skills Modal */}
      <TradeSkillsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default UserDetail;
