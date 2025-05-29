import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Publiclayout } from "../layouts";

const Login = lazy(() => import("../pages/auth/Login"));
const Home = lazy(() => import("../pages/public/Home"));

const AppRoutes = () => (
  <Suspense fallback={<div className="text-center mt-8">Loading...</div>}>
    <Routes>
      {/* Public */}
      <Route element={<Publiclayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  </Suspense>
);

export default AppRoutes;
