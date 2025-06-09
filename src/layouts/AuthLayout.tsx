import { Outlet } from "react-router-dom";
import { AuthHero } from "../components/ui/auth";

const AuthLayout = () => {
  return (
    <main className="bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 dark:bg-dark-600 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 min-h-screen flex justify-center items-center">
      <div className="bg-white/70 max-w-[100rem] p-3 md:p-5 rounded-lg w-[95%] h-[95vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden gap-4">
        {/* Left Panel */}
        <div className="hidden lg:flex h-full w-full rounded-3xl overflow-hidden">
          <AuthHero />
        </div>

        {/* Right Panel */}
        <div className="h-full w-full flex flex-col justify-center items-center">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
