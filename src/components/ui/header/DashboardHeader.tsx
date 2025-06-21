import {
  IconBell,
  IconLayoutDashboard,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import ThemeToggle from "../../shared/ThemeToggle";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DashboardHeader = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="flex justify-between items-center w-full tracking-wide relative">
      {/* Left side: Search */}
      <div className="relative px-3 py-2 rounded-md border border-dark-100/20 shadow focus-within:border-indigo-500 transition-colors duration-200">
        <IconSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500/70 dark:text-white/70"
          size={20}
        />
        <input
          type="search"
          placeholder="Search skills..."
          className="bg-transparent outline-none text-sm pl-8 dark:text-white w-full"
        />
      </div>

      {/* Right side: Icons */}
      <div className="flex items-center gap-1 relative">
        <button className="p-2 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-gray-400/10">
          <IconBell
            className={theme === "dark" ? "text-white" : "text-gray-800"}
            stroke={1}
          />
        </button>

        <ThemeToggle />

        <div
          className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-indigo-400 duration-200"
          onClick={() => setOpenDropdown((prev) => !prev)}
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-9 h-9 object-cover rounded-full"
            />
          ) : (
            <IconUser
              className={theme === "dark" ? "text-white" : "text-gray-800"}
              size={28}
              stroke={1}
            />
          )}
        </div>

        {/* Animated Dropdown */}
        <AnimatePresence>
          {openDropdown && (
            <>
              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute top-10 right-3 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 z-20 border-l border-t border-gray-200 dark:border-gray-700"
              />
              {/* Dropdown box */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute top-12 right-0 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg border dark:border-gray-700 z-10 p-4"
              >
                <div className="flex items-center gap-3">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center text-lg font-semibold">
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <hr className="my-3 border-gray-200 dark:border-gray-700" />
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li className="flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer transition">
                    <IconUser size={16} />
                    My Profile
                  </li>
                  <li className="flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer transition">
                    <IconLayoutDashboard size={16} />
                    My Skills
                  </li>
                  <li className="flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer transition">
                    <IconSearch size={16} />
                    Skill Requests
                  </li>
                  <li className="flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer transition">
                    <IconBell size={16} />
                    Messages
                  </li>
                  <li className="flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer transition">
                    <IconSettings size={16} />
                    Settings
                  </li>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <li className="flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-2 rounded-md cursor-pointer transition">
                    <IconLogout size={16} />
                    Logout
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardHeader;
