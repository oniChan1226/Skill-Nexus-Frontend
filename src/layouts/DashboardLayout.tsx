import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/protected/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHeader from "../components/ui/header/DashboardHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="h-screen w-screen overflow-hidden bg-teal-50 dark:bg-dark-600 selection:bg-indigo-200 dark:selection:bg-indigo-500">

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
      <div className="grid md:grid-cols-[16rem_1fr] md:grid-rows-[4rem_1fr] h-full">
        {/* Sidebar (Fixed) */}
        <aside className="hidden md:block row-span-2 bg-white dark:bg-dashboard-50 p-4 border-r-[1px] border-gray-200 dark:border-gray-800">
          <Sidebar />
        </aside>

        {/* Header (Fixed) */}
        <header className="bg-white/90 dark:bg-dashboard-50 py-6 border-b border-dashboard-300 shadow-md flex items-center justify-between">
          <DashboardHeader />
        </header>

        {/* Scrollable Content */}
        <main className="overflow-y-auto px-4 py-6 bg-white/90 dark:bg-dashboard-50 dark:text-white text-black/90">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
