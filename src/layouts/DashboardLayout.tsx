import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Sidebar from "../pages/protected/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import type { RootState } from "../app/store";
import { IconMenu } from "@tabler/icons-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Toasts */}
      <ToastContainer theme={theme === "dark" ? "dark" : "light"} />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-blue-500 p-4 text-white">
        <span className="text-lg font-semibold">Dashboard</span>
        <button onClick={toggleSidebar}>
          <IconMenu size={24} />
        </button>
      </div>

      {/* Sidebar (mobile + desktop) */}
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

      {/* Static Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-blue-600 text-white p-4">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
