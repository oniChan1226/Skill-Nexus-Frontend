import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Publiclayout } from "../layouts";
import Loading from "../pages/public/Loading";

const Login = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));

// Public
const Home = lazy(() => import("../pages/public/Home"));

const AppRoutes = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {/* Public */}
      <Route element={<Publiclayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route />
    </Routes>
  </Suspense>
);

export default AppRoutes;
