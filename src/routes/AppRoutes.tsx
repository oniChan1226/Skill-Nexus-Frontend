import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthLayout, DashboardLayout, Publiclayout } from "../layouts";
import Loading from "../pages/public/Loading";
import NotFound from "../pages/NotFound";
import AuthGuard from "./AuthGuard";

// Auth
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));

// Public
const Home = lazy(() => import("../pages/public/Home"));

// Protected
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));

const AppRoutes = () => (
  <Suspense fallback={<Loading />}>
      <Routes>
        {/* 404 Handler */}
        <Route path="*" element={<NotFound />} />
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/* Public */}
        <Route element={<Publiclayout />}>
          <Route index element={<Home />} />
        </Route>
        {/* Protected */}
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
  </Suspense>
);

export default AppRoutes;
