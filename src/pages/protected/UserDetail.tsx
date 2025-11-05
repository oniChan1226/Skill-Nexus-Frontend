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
  IconBriefcase,
  IconCalendar,
  IconExchange,
  IconMapPin,
  IconPoint,
  IconPointFilled,
} from "@tabler/icons-react";
import { useGetUserForTradingByIdQuery } from "@/services/trading.service";
import { useState } from "react";
import Button from "@/components/shared/Button";
import TradeSkillsModal from "@/components/TradeModal";
import type { DetailedUserForTrading } from "@/types/trading.types";

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!userId) {
    return <div>Nikal Bharway</div>;
  }

  const { data, isLoading, error } = useGetUserForTradingByIdQuery(
    userId as string
  );

  const user: DetailedUserForTrading | undefined = data?.skillProfile;
  const isActive = true;

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <IconLoader2
          size={48}
          className="text-indigo-500 animate-spin opacity-80"
        />
        <p className="mt-3 text-neutral-500">Loading user details...</p>
      </div>
    );

  if (error || !user)
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <Card className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
          <CardContent className="py-10 text-center">
            <p className="text-red-600 dark:text-red-400 font-medium">
              User not found or failed to load.
            </p>
            <Button
              onClick={() => navigate("/dashboard/users")}
              variant="secondary"
              className="mt-5"
            >
              Back to Users
            </Button>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="space-y-10 max-w-7xl mx-auto md:px-4 pb-20">
      {/* Breadcrumb + Back link */}
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
              <BreadcrumbPage>{user.userId.name}</BreadcrumbPage>
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

      <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm bg-white/70 dark:bg-neutral-900/60 backdrop-blur-sm">
        <CardHeader className="pb-0">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user.userId.profileImage}
                  alt={user.userId.name}
                  className="w-20 h-20 rounded-xl object-cover border border-neutral-200 dark:border-neutral-700"
                />
                {isActive && (
                  <span className="absolute bottom-1 right-1 block w-3 h-3 animate-pulse bg-green-500 border-2 border-white dark:border-neutral-900 rounded-full"></span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">
                  {user.userId.name}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  <IconBriefcase size={16} />
                  <span>
                    {user.userId.profession || "Independent Professional"}
                  </span>
                  <IconMapPin size={16} />
                  <span>
                    {user.userId.address.city}, {user.userId.address.country}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 dark:bg-neutral-800 px-3 py-1.5 bg-yellow-50 font-semibold text-yellow-500 rounded-full">
                <IconStar size={16} />
                <span className="text-sm">{user.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5 dark:bg-neutral-800 bg-indigo-50 text-indigo-500 font-semibold px-3 py-1.5 rounded-full">
                <IconTrophy size={16} />
                <span className="text-sm">{user.totalExchanges} trades</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
            <IconCalendar size={16} />
            <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl">
              <p className="text-sm text-yellow-500">Pending Requests</p>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                {user.metrics.pendingRequests}
              </h3>
            </div>
            <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl">
              <p className="text-sm text-green-500">Accepted Requests</p>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                {user.metrics.acceptedRequests}
              </h3>
            </div>
            <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl">
              <p className="text-sm text-indigo-500">Completed</p>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                {user.metrics.completedRequests}
              </h3>
            </div>
            <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl">
              <p className="text-sm text-red-500">Rejected</p>
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                {user.metrics.rejectedRequests}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white dark:text-neutral-900 dark:bg-white text-sm font-medium py-3 transition-all duration-500 hover:bg-neutral-800 overflow-hidden dark:hover:bg-white/90"
          >
            {/* Soft sweeping light effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10  to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1500ms] ease-out"></span>

            <IconExchange
              size={18}
              className="mr-1 transition-transform duration-500 group-hover:rotate-90"
            />
            <span className="relative z-10">
              Trade Skills with {user.userId.name}
            </span>
          </button>
        </CardContent>
      </Card>

      {/* Skills Section */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {/* Offered Skills */}
        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm bg-white/80 dark:bg-neutral-900/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
              <IconBriefcase size={18} className="text-indigo-500" />
              Offered Skills ({user.offeredSkills.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {user.offeredSkills.length ? (
              user.offeredSkills.map((skill) => (
                <div
                  key={skill._id}
                  className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {skill.name}
                    </span>
                    {skill.proficiencyLevel && (
                      <span className="text-xs text-neutral-500 capitalize">
                        {skill.proficiencyLevel}
                      </span>
                    )}
                  </div>
                  {skill.description && (
                    <p className="text-sm text-neutral-500 mt-1">
                      {skill.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-neutral-500 text-center py-8">
                No offered skills yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Required Skills */}
        <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm bg-white/80 dark:bg-neutral-900/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
              <IconExchange size={18} className="text-indigo-500" />
              Required Skills ({user.requiredSkills.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {user.requiredSkills.length ? (
              user.requiredSkills.map((skill) => (
                <div
                  key={skill._id}
                  className="p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {skill.name}
                    </span>
                    {skill.learningPriority && (
                      <span className="text-xs text-neutral-500 capitalize">
                        {skill.learningPriority} priority
                      </span>
                    )}
                  </div>
                  {skill.description && (
                    <p className="text-sm text-neutral-500 mt-1">
                      {skill.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-neutral-500 text-center py-8">
                No required skills yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trade Modal */}
      <TradeSkillsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default UserDetail;
