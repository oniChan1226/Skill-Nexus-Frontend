import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthLayout, Publiclayout } from "../layouts";
import Loading from "../pages/public/Loading";

// Auth
const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));

// Public
const Home = lazy(() => import("../pages/public/Home"));

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
    </Routes>
  </Suspense>
);

export default AppRoutes;
