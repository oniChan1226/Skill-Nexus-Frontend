import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthLayout, DashboardLayout, Publiclayout } from "../layouts";
import Loading from "../pages/public/Loading";
import NotFound from "../pages/NotFound";
import AuthGuard from "./AuthGuard";
import ProfileSetup from "@/pages/protected/ProfileSetup";
import AddSkills from "@/pages/protected/AddSkills";
import TradeSkillRequest from "@/pages/protected/TradeSkillRequest";

// Auth
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));

// Public
const Home = lazy(
  () => import(/* webpackPrefetch: true */ "../pages/public/Home")
);

// Protected
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Profile = lazy(() => import("../pages/protected/Profile"));
const Users = lazy(() => import("../pages/protected/Users"));
const UserDetail = lazy(() => import("../pages/protected/UserDetail"));

const AppRoutes = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
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
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserDetail />} />
          <Route path="trade-skill-request" element={<TradeSkillRequest />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/settings" element={<ProfileSetup />} />
          <Route path="skills" element={<AddSkills />} />
        </Route>
      </Route>
      {/* 404 Handler */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
