// components/AppLoader.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useGetCurrentUserQuery } from "../services/auth.service";
import type { AppDispatch, RootState } from "../app/store";

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isSuccess } = useGetCurrentUserQuery(undefined, {
    skip: !!user,
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }
  }, [isSuccess, data, dispatch]);

  return <>{children}</>;
};

export default AppLoader;
