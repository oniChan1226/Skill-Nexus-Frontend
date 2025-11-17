import {
  IconCamera,
  IconStar,
  IconMail,
  IconMapPin,
  IconBriefcase,
  IconUser,
  IconTrophy,
  IconCalendar,
  IconBadge,
  IconSettings,
} from "@tabler/icons-react";
import { shallowEqual, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import Button from "@/components/shared/Button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth, shallowEqual);
  if (!user) return <div>User not found</div>;

  return (
    <section className="max-w-7xl mx-auto space-y-8">
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
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Link to={"settings"}>
          <Button className="px-6 py-2 flex items-center space-x-2 group transition-all duration-300">
            <IconSettings className="transition-transform duration-300 group-hover:rotate-180" />
            <span className="font-semibold">Edit</span>
          </Button>
        </Link>
      </div>

      {/* === Banner === */}
      <div className="flex py-5 px-4 items-center justify-between border border-indigo-200/50 bg-gradient-to-br from-indigo-50/70 to-white/60 dark:from-indigo-950/60 dark:to-neutral-900/60 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden">
        {/* Avatar */}
        <div className=" left-6 flex items-center justify-center gap-4">
          <div className="relative">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="User Avatar"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-xl border-4 border-indigo-100 dark:border-indigo-700"
              />
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-indigo-100 dark:border-indigo-700">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </div>
            )}
            <button
              className="absolute bottom-1 right-1 bg-white/80 p-1.5 rounded-full shadow-md hover:scale-105 transition"
              title="Change photo"
            >
              <IconCamera size={25} className="text-indigo-600" />
            </button>
          </div>

          <div className="">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
              <IconMail size={15} /> {user.email}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end gap-4 text-sm">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
              <IconBadge size={14} /> Verified
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              <IconCalendar size={14} /> Joined{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "2024"}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-center">
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                128
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Projects
              </p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                4.8
              </p>
              <div className="flex items-center justify-center text-yellow-500">
                <IconStar size={16} fill="currentColor" />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Top 3%
              </p>
              <div className="flex items-center justify-center text-indigo-500">
                <IconTrophy size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Profile Info Cards === */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-900/90 rounded-xl p-5 shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Rating
            </h3>
            <IconStar color="orange" fill="orange" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">
            {4.8}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Average user rating
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900/90 rounded-xl p-5 shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              City
            </h3>
            <IconMapPin className="text-indigo-500" />
          </div>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {user.address?.city || "Not specified"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Current location
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900/90 rounded-xl p-5 shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Profession
            </h3>
            <IconBriefcase className="text-indigo-500" />
          </div>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {user.profession || "Not Specified"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Primary role
          </p>
        </div>
      </div>

      {/* === About Section === */}
      <div className="bg-white dark:bg-neutral-900/90 rounded-xl p-6 shadow hover:shadow-lg transition">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <IconUser size={20} /> About
        </h3>
        <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
          {user.bio ||
            "Bio not provided. Please update your profile to add a brief description about yourself."}
        </p>
      </div>
    </section>
  );
};

export default Profile;
