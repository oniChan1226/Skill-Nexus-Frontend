import { IconBell, IconSearch } from "@tabler/icons-react";
import ThemeToggle from "../../shared/ThemeToggle";
import Breadcrumbs from "../../shared/Breadcrumbs";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";


const DashboardHeader = () => {
    const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <div className="flex justify-between items-center w-full">
      {/* Left side: Breadcrumb */}
      <Breadcrumbs />

      {/* Right side: Search + Icons */}
      <div className="flex items-center gap-1">
        <div className="bg-transparent px-2 py-1 rounded-md shadow border-dark-100/20 border-1 relative">
            <IconSearch className="absolute text-dark-500/70 dark:text-white/70"/>
          <input
            type="search"
            placeholder="Search skills..."
            className="bg-transparent outline-none text-sm pl-8 dark:text-white"
          />
        </div>
        <button className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400/10">
          <IconBell className={theme === "dark" ? "text-white" : "text-gray-800"} stroke={1}/>

        </button>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default DashboardHeader;
