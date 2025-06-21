// components/ui/header/Breadcrumbs.tsx
import { IconChevronRight } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1 text-sm ">
      <Link to="/dashboard" className="text-gray-500/80 dark:text-white/80 font-medium">
        Skill Nexus
      </Link>
      {paths.map((segment, idx) => {
        const fullPath = "/" + paths.slice(0, idx + 1).join("/");
        const label = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

        return (
          <div key={fullPath} className="flex items-center gap-1">
            <IconChevronRight size={16} className="text-indigo-500"/>
            <Link
              to={fullPath}
              className={`${
                idx === paths.length - 1
                  ? "text-black dark:text-white"
                  : "text-gray-600 dark:text-gray-300"
              } capitalize`}
            >
              {label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
