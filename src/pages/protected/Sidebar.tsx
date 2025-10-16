import {
  IconLayoutDashboard,
  IconUsers,
  IconUserCircle,
} from "@tabler/icons-react";
import { WebName } from "../../constants/constants";
import { NavLink } from "react-router-dom";

export const links = [
  {
    label: "Dashboard",
    icon: <IconLayoutDashboard size={18} />,
    path: "/dashboard",
  },
  {
    label: "Users",
    icon: <IconUsers size={18} />,
    path: "/users",
  },
  {
    label: "Profile",
    icon: <IconUserCircle size={18} />,
    path: "profile",
  },
];

const Sidebar = () => {
  return (
    <div className=" ">
      <div className="flex items-center space-x-2 p-2 cursor-default">
        {/* <IconUsers
          className=" bg-indigo-500 rounded-lg p-2 text-white"
          stroke={2}
          size={32}
        /> */}
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
      <div className=" mt-6">
        <h2 className="mb-2 dark:text-neutral-300 text-neutral-700 font-bold">
          Platform
        </h2>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
            key={link.path}
            to={link.path}
            end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-md font-medium ${
                  isActive
                    ? "bg-indigo-100/50 text-indigo-600 dark:bg-indigo-500 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-x-1 transition-translate duration-200"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
