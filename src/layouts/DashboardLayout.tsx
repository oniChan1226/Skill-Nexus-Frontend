import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/protected/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu } from "@tabler/icons-react";
import DashboardHeader from "../components/ui/header/DashboardHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="h-screen w-screen overflow-hidden bg-teal-50 dark:bg-dark-600">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-blue-500 p-4 text-white">
        <span className="text-lg font-semibold">Dashboard</span>
        <button onClick={toggleSidebar}>
          <IconMenu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-y-0 left-0 w-64 bg-blue-600 text-white z-50 md:hidden p-4"
          >
            <button
              onClick={toggleSidebar}
              className="mb-4 text-white hover:text-gray-200"
            >
              Close
            </button>
            <Sidebar />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Grid Layout for Desktop */}
      <div className="hidden md:grid grid-cols-[16rem_1fr] grid-rows-[4rem_1fr] h-full">
        {/* Sidebar (Fixed) */}
        <aside className="row-span-2 bg-white dark:bg-dark-500 p-4 border-r-[1px] border-gray-200 dark:border-gray-800">
          <Sidebar />
        </aside>

        {/* Header (Fixed) */}
        <header className="bg-white/90 dark:bg-dark-500 p-4 shadow-md flex items-center justify-between rounded-tl-xl">
          <DashboardHeader />
        </header>

        {/* Scrollable Content */}
        <main className="overflow-y-auto p-4 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:bg-dark-600 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 dark:text-white text-black/90">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
