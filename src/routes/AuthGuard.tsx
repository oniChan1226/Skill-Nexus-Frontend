import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const user = useSelector((state: RootState) => state.auth?.user);

  if (!user) return <Navigate to="/" replace/>;

  return <Outlet />;
};

export default AuthGuard;
