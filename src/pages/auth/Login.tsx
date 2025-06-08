import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useState } from "react";
import { AuthForm } from "../../components/ui/auth";

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    console.log("Form submitted ✅", data);
  };

  return (
    <AuthForm
      title="Login"
      subtitle="Enter your email and password to login to your account"
      actionLabel="Login"
      footerText="Don't have an account?"
      footerLinkText="Signup"
      footerLinkTo="/signup"
      onSubmit={handleSubmit(handleLogin)}
    >
      {/* Email */}
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="email"
          className="text-lg lg:text-lg font-semibold text-black/80"
        >
          Email
        </label>
        <div className="relative flex items-center">
          <IconMail className="absolute left-3 text-gray-400" size={18} />
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            {...register("email")}
            className={`pl-10 pr-3 py-2 w-full rounded-md 
    border 
    ${
      errors.email
        ? "border-danger focus:ring-danger"
        : "border-gray-300 focus:ring-indigo-400"
    } 
    focus:outline-none focus:ring-1
  `}
          />
        </div>
        {errors.email && (
          <p className="text-danger text-sm pl-1">{errors.email.message}</p>
        )}
      </div>
      {/* Password */}
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-center">
          <label
            htmlFor="password"
            className="text-lg lg:text-lg font-semibold text-black/80"
          >
            Password
          </label>
          <h2 className="hover:underline cursor-pointer">Forgot Password?</h2>
        </div>
        <div className="relative flex items-center">
          <IconLock className="absolute left-3 text-gray-400" size={18} />
          <button
            className="absolute right-3 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <IconEye size={25} /> : <IconEyeOff size={25} />}
          </button>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="You@123!"
            {...register("password")}
            className={`pl-10 pr-3 py-2 w-full rounded-md 
    border 
    ${
      errors.password
        ? "border-danger focus:ring-danger"
        : "border-gray-300 focus:ring-indigo-400"
    } 
    focus:outline-none focus:ring-1
  `}
          />
        </div>
        {errors.password && (
          <p className="text-danger text-sm pl-1">{errors.password.message}</p>
        )}
      </div>
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
