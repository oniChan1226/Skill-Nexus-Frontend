import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/auth.service";
import type { RootState } from "../app/store";
import { useMemo } from "react";

const AuthGuard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const shouldSkip = Boolean(user);
  const { data, isLoading, isFetching } = useGetCurrentUserQuery(undefined, {
    skip: shouldSkip,
  });

  const resolvedUser = useMemo(() => user || data?.user, [user, data?.user]);

  if (isLoading || isFetching) {
    return <div className="h-screen grid place-content-center">Checking user...</div>;
  }

  if (!resolvedUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
