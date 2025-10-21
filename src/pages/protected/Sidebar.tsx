import {
  IconLayoutDashboard,
  IconUsers,
  IconUserCircle,
} from "@tabler/icons-react";
import { WebName } from "../../constants/constants";
import { NavLink, useLocation } from "react-router-dom";

export const links = [
  {
    label: "Dashboard",
    icon: <IconLayoutDashboard size={18} />,
    path: "/dashboard",
  },
  {
    label: "Users",
    icon: <IconUsers size={18} />,
    path: "/dashboard/users",
  },
  {
    label: "Profile",
    icon: <IconUserCircle size={18} />,
    path: "/dashboard/profile",
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div>
      <div className="flex items-center space-x-2 p-2 cursor-default">
        <div className="w-12 h-12 overflow-hidden rounded-full flex items-center justify-center bg-white dark:bg-dark-500">
          <img
            src="logo.png"
            alt="Logo"
            className="w-full h-full object-contain scale-[1.8]"
          />
        </div>

        <div className="flex flex-col justify-start items-start">
          <button className="font-semibold text-lg leading-5 text-dark-500/80 dark:text-white">
            {WebName}
          </button>
          <p className="text-sm capitalize text-neutral-800 dark:text-neutral-300 text-balance">
            Skill exchange platform
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="mt-6">
        <h2 className="mb-2 dark:text-neutral-300 text-neutral-700 font-bold">
          Platform
        </h2>
        <nav className="space-y-1">
          {links.map((link) => {
            const pathname = location.pathname;

            // Explicit active logic:
            let isActive = false;
            if (link.path === "/dashboard") {
              // Active only on exact /dashboard
              isActive = pathname === "/dashboard";
            } else {
              // Active if current path starts with link.path
              isActive = pathname.startsWith(link.path);
            }
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-md font-medium ${
                  isActive
                    ? "bg-indigo-100/50 text-indigo-600 dark:bg-indigo-500 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100/50 dark:hover:bg-indigo-950 hover:-translate-x-1 transition-translate duration-200"
                }`}
              >
                {link.icon}
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
