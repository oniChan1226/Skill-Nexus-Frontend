import { IconMail } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthForm } from "../../components/ui/auth";
import { useLoginUserMutation } from "../../services/auth.service";
import type { LoginFormData } from "../../types/auth.types";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { setUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { handleServerErrorsGeneric } from "../../utils/handlers";
import InputField from "../../components/shared/InputField";
import PasswordField from "../../components/shared/PasswordField";

const loginFieldMap: Record<string, keyof LoginFormData> = {
  password: "password",
  email: "credential",
  username: "credential",
};

const Login = () => {

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data).unwrap();
  console.log("response", response?.user);

      toast.success(response?.message);
      dispatch(setUser(response?.user));
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      handleServerErrorsGeneric<LoginFormData>(
        error,
        setError,
        toast.error,
        loginFieldMap
      );
    }
  };

  return (
    <AuthForm
      title="Login"
      subtitle="Enter your email and password to login to your account"
      actionLabel="Login"
      footerText="Don't have an account?"
      footerLinkText="Signup"
      footerLinkTo="/signup"
      isLoading={isLoading}
      loaderFallbackText="Loggin in"
      onSubmit={handleSubmit(handleLogin)}
    >
      {/* Cred */}
      <InputField
        id="credential"
        label="Credential"
        type="text"
        placeholder="Email or username"
        icon={<IconMail size={18} />}
        error={errors.credential}
        register={register("credential")}
        autoComplete="email"
      />
      {/* Password */}
      <PasswordField
        id="password"
        error={errors.password}
        forgotPassword={true}
        register={register("password")}
      />
      <div className="flex justify-start items-center space-x-2 mb-4">
        <input
          type="checkbox"
          name="remember"
          id="remember"
          className="scale-125 accent-indigo-500 cursor-pointer"
        />
        <label htmlFor="remember" className=" cursor-pointer">
          Remember me
        </label>
      </div>
    </AuthForm>
  );
};

export default Login;
