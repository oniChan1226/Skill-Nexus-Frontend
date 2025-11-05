import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconStar,
  IconUsers,
  IconTrophy,
  IconLoader2,
  IconArrowBadgeRight,
} from "@tabler/icons-react";
import { useGetUsersForTradingQuery } from "@/services/trading.service";
import { useState } from "react";
import type { UserForTrading } from "@/types/trading.types";

const UserCard = ({ user }: { user: UserForTrading }) => {
  const [showAllOffered, setShowAllOffered] = useState(false);
  const [showAllRequired, setShowAllRequired] = useState(false);
  const navigate = useNavigate();

  const displayedOfferedSkills = showAllOffered
    ? user.offeredSkills
    : user.offeredSkills.slice(0, 3);

  const displayedRequiredSkills = showAllRequired
    ? user.requiredSkills
    : user.requiredSkills.slice(0, 3);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-lg hover:border-indigo-400/40 transition-all duration-300 p-5">
      {/* Glow border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/10 via-transparent to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3">
          <img
            src={user.user.profileImage}
            alt={user.user.name}
            className="w-14 h-14 rounded-full border-2 border-indigo-200 dark:border-indigo-700 object-cover shadow-sm"
          />
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
              {user.user.name}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {user.user.profession || "Skill Exchanger"}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1 text-amber-500">
            <IconStar size={16} fill="currentColor" />
            <span className="text-sm font-medium">
              {user.rating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-indigo-500 font-semibold">
            <IconTrophy size={14} />
            <span className="text-xs">{user.totalExchanges} exchanges</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent my-4" />

      {/* Offered Skills */}
      {/* Offered Skills */}
      {user.offeredSkills.length > 0 && (
        <div className="relative z-10 mt-3">
          <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full shadow-sm" />
            Offers to Teach
          </h4>

          {/* Skill Chips */}
          <div className="flex flex-wrap gap-2">
            {displayedOfferedSkills.map((skill) => (
              <div
                key={skill._id}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-indigo-100/60 to-indigo-50/40 dark:from-indigo-900/50 dark:to-indigo-800/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/30 dark:border-indigo-700/50 backdrop-blur-md shadow-sm hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                {skill.name}
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {user.offeredSkills.length > 3 && (
            <button
              onClick={() => setShowAllOffered(!showAllOffered)}
              className="block text-xs text-indigo-600 dark:text-indigo-400 hover:underline mt-3 font-medium"
            >
              {showAllOffered
                ? "Show less"
                : `+${user.offeredSkills.length - 3} more`}
            </button>
          )}
        </div>
      )}

      {/* Required Skills */}
      {user.requiredSkills.length > 0 && (
        <div className="relative z-10 mt-6">
          <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-sm" />
            Wants to Learn
          </h4>

          {/* Skill Chips */}
          <div className="flex flex-wrap gap-2">
            {displayedRequiredSkills.map((skill) => (
              <div
                key={skill._id}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-purple-100/60 to-pink-50/40 dark:from-purple-900/50 dark:to-pink-900/40 text-purple-700 dark:text-pink-300 border border-purple-200/30 dark:border-pink-700/40 backdrop-blur-md shadow-sm hover:shadow-pink-500/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                {skill.name}
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {user.requiredSkills.length > 3 && (
            <button
              onClick={() => setShowAllRequired(!showAllRequired)}
              className="block text-xs text-purple-600 dark:text-pink-400 hover:underline mt-3 font-medium"
            >
              {showAllRequired
                ? "Show less"
                : `+${user.requiredSkills.length - 3} more`}
            </button>
          )}
        </div>
      )}

      {/* Action Button */}
      {/* Action Button */}
      <div className="relative z-10 mt-5">
        <button
          onClick={() => navigate(`/dashboard/users/${user._id}`)}
          className="
      w-full rounded-lg px-4 py-2.5 text-sm font-medium
      bg-indigo-50 hover:bg-indigo-100
      dark:bg-neutral-800 dark:hover:bg-neutral-700
      text-neutral-800 dark:text-neutral-100
      border border-indigo-50 dark:border-neutral-700
      shadow-sm hover:shadow-md
      transition-all duration-300 ease-out
      flex items-center justify-center gap-2
      
    "
        >
          <span>View Details</span>
          <IconArrowBadgeRight
            size={18}
            className="group-hover:translate-x-0.5 group-hover:scale-110 transition-transform duration-300"
          />
        </button>
      </div>
    </div>
  );
};

const Users = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetUsersForTradingQuery({
    page,
    limit: 10,
  });

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
              <BreadcrumbPage>Users</BreadcrumbPage>
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
      <Card className="border border-neutral-200 dark:border-neutral-800 shadow-md bg-gradient-to-br from-indigo-50 to-white dark:from-neutral-900 dark:to-neutral-950">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <IconUsers
                size={28}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Skill Exchange Community
              </CardTitle>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Connect with users who want to exchange skills. Find your
                perfect learning partner!
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <IconLoader2
              size={48}
              className="text-indigo-600 dark:text-indigo-400 animate-spin"
            />
            <p className="text-neutral-600 dark:text-neutral-400">
              Loading users...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
          <CardContent className="py-8 text-center">
            <p className="text-red-600 dark:text-red-400">
              Failed to load users. Please try again later.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Users Grid */}
      {data?.users && data.users.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 capitalize">
            {data.users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>

          {/* Pagination */}
          {data.pagination && data.pagination.totalPages > 0 && (
            <div className="flex items-center justify-center gap-2 py-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="!px-2 !py-1 border-1 rounded-md text-sm font-medium transition-colors cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/50 dark:border-neutral-700"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: data.pagination.totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      page === i + 1
                        ? "bg-indigo-600 text-white dark:bg-indigo-500"
                        : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setPage((p) => Math.min(data.pagination.totalPages, p + 1))
                }
                disabled={page === data.pagination.totalPages}
                className="!px-2 !py-1 border-1 rounded-md text-sm font-medium transition-colors cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/50 dark:border-neutral-700"
              >
                Next
              </button>
            </div>
          )}

          {/* Stats Footer */}
          <Card className="border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900">
            <CardContent className="py-4">
              <div className="flex items-center justify-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                <span>
                  Page {data.pagination.page} of {data.pagination.totalPages}
                </span>
                <span>•</span>
                <span>{data.pagination.totalUsers} total users</span>
                <span>•</span>
                <span>Showing {data.users.length} users</span>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty State */}
      {data?.users && data.users.length === 0 && (
        <Card className="border border-neutral-200 dark:border-neutral-800">
          <CardContent className="py-20 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                <IconUsers
                  size={48}
                  className="text-neutral-400 dark:text-neutral-600"
                />
              </div>
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                No Users Found
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                There are no users available for skill trading at the moment.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Users;
