import {
  IconBell,
  IconLayoutDashboard,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import ThemeToggle from "../../shared/ThemeToggle";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogoutUserMutation } from "../../../services/auth.service";
import { NavLink, useNavigate } from "react-router-dom";
import { links } from "@/pages/protected/Sidebar";

const DashboardHeader = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      navigate("/login");
      console.log(res);
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return (
    <header className="flex items-center justify-between w-full px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-500 relative">
      {/* === LEFT: Logo === */}
      <div className="flex items-center gap-1">
        <img
          src="logo.png"
          alt="Skill Nexus"
          className="w-14 h-8 object-cover rounded"
        />
        <h1 className="font-semibold text-lg text-gray-800 dark:text-white tracking-wide">
          Skill Nexus
        </h1>
      </div>

      {/* === RIGHT: Controls === */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <IconX size={22} className="text-gray-800 dark:text-white" />
          ) : (
            <IconMenu2 size={22} className="text-gray-800 dark:text-white" />
          )}
        </button>

        {/* Search (desktop only) */}
        <div className="hidden md:flex items-center relative border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 w-64 focus-within:border-indigo-500 transition-colors duration-200">
          <IconSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            size={18}
          />
          <input
            type="search"
            placeholder="Search skills..."
            className="bg-transparent pl-8 w-full text-sm outline-none dark:text-white"
          />
        </div>

        {/* Bell */}
        <button className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <IconBell
            className={theme === "dark" ? "text-white" : "text-gray-700"}
            stroke={1.5}
            size={22}
          />
        </button>

        {/* Theme toggle */}
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>

        {/* User profile */}
        <div className="relative">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-indigo-400 duration-200 overflow-hidden"
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <IconUser
                className={theme === "dark" ? "text-white" : "text-gray-800"}
                size={26}
                stroke={1.2}
              />
            )}
          </div>

          {/* === User Dropdown === */}
          <AnimatePresence>
            {openDropdown && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-11 right-4 w-3.5 h-3.5 bg-white dark:bg-gray-800 rotate-45 border-l border-t border-gray-200 dark:border-gray-600 z-20"
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-14 right-0 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-10 p-4"
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
                    {[
                      { icon: <IconUser size={16} />, label: "My Profile" },
                      {
                        icon: <IconLayoutDashboard size={16} />,
                        label: "My Skills",
                      },
                      { icon: <IconSearch size={16} />, label: "Skill Requests" },
                      { icon: <IconBell size={16} />, label: "Messages" },
                      { icon: <IconSettings size={16} />, label: "Settings" },
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer transition"
                      >
                        {item.icon}
                        {item.label}
                      </li>
                    ))}
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <li
                      onClick={handleLogout}
                      className="flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-2 rounded-md cursor-pointer transition"
                    >
                      <IconLogout size={16} />
                      {isLoading ? "Logging out..." : "Logout"}
                    </li>
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* === Mobile Dropdown Menu === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md border-t border-gray-200 dark:border-gray-700 z-40 md:hidden"
          >
            <ul className="flex flex-col px-4 py-3 space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive
                        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500 dark:text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DashboardHeader;
