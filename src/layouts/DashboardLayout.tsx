import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/protected/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHeader from "../components/ui/header/DashboardHeader";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="h-screen w-screen overflow-hidden selection:bg-indigo-200 selection:text-indigo-700">
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

  {/* Layout */}
  <div className="flex flex-col md:grid md:grid-cols-[16rem_1fr] md:grid-rows-[3.5rem_1fr] h-full">
    {/* Sidebar */}
    <aside className="hidden md:block row-span-2 bg-white dark:bg-neutral-950 p-4 border-r-[1px] border-gray-200 dark:border-gray-800">
      <Sidebar />
    </aside>

    {/* Header */}
    <div className="bg-white/90 dark:bg-neutral-950 border-b border-dashboard-300 shadow-md flex items-center justify-between">
      <DashboardHeader />
    </div>

    {/* Scrollable Content */}
    <main className="overflow-y-auto p-4 md:p-5 lg:p-8 bg-white/90 dark:bg-neutral-950 dark:text-white text-black/90 h-full">
      <Outlet />
    </main>
  </div>
</div>

  );
};

export default DashboardLayout;
