// components/AppLoader.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useGetCurrentUserQuery } from "../services/auth.service";
import Loading from "../pages/public/Loading";
import type { AppDispatch, RootState } from "../app/store";

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading, isSuccess } = useGetCurrentUserQuery(undefined, {
    skip: !!user,
  });

  useEffect(() => {
    console.log("yo");
    if (isSuccess && data?.user) {
      console.log("going");
      dispatch(setUser(data.user));
    }
  }, [isSuccess, data, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AppLoader;
