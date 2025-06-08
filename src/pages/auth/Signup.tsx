import {
  IconCalendar,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconUser,
  IconUserCode,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../schemas/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useState } from "react";
import { AuthForm } from "../../components/ui/auth";

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = async (data: SignupFormData) => {
    console.log("Form submitted ✅", data);
  };

  return (
    <AuthForm
      title="Create an account"
      subtitle="Join us today and explore new opportunities"
      actionLabel="Create account"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkTo="/login"
      onSubmit={handleSubmit(handleSignup)}
    >
      <div className="grid grid-cols-2 gap-2">
        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="fullName"
            className="text-lg lg:text-lg font-semibold text-black/80"
          >
            Name
          </label>
          <div className="relative flex items-center">
            <IconUser className="absolute left-3 text-gray-400" size={18} />
            <input
              type="text"
              id="fullName"
              placeholder="John"
              {...register("fullName")}
              className={`pl-10 pr-3 py-2 w-full rounded-md 
    border 
    ${
      errors.fullName
        ? "border-danger focus:ring-danger"
        : "border-gray-300 focus:ring-indigo-400"
    } 
    focus:outline-none focus:ring-1
  `}
            />
          </div>
          {errors.fullName && (
            <p className="text-danger text-sm pl-1">
              {errors.fullName.message}
            </p>
          )}
        </div>
        {/* Age */}
        <div className="flex flex-col">
          <label
            htmlFor="age"
            className="text-lg lg:text-lg font-semibold text-black/80"
          >
            Age
          </label>
          <div className="relative flex items-center">
            <IconCalendar className="absolute left-3 text-gray-400" size={18} />
            <input
              type="name"
              id="age"
              placeholder=""
              {...register("age")}
              className={`pl-10 pr-3 py-2 w-full rounded-md 
    border 
    ${
      errors.age
        ? "border-danger focus:ring-danger"
        : "border-gray-300 focus:ring-indigo-400"
    } 
    focus:outline-none focus:ring-1
  `}
            />
          </div>
          {errors.age && (
            <p className="text-danger text-sm pl-1">{errors.age.message}</p>
          )}
        </div>
      </div>
      {/* Username */}
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="username"
          className="text-lg lg:text-lg font-semibold text-black/80"
        >
          Username
        </label>
        <div className="relative flex items-center">
          <IconUserCode className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            id="username"
            placeholder="johndoe123"
            {...register("username")}
            className={`pl-10 pr-3 py-2 w-full rounded-md 
    border 
    ${
      errors.username
        ? "border-danger focus:ring-danger"
        : "border-gray-300 focus:ring-indigo-400"
    } 
    focus:outline-none focus:ring-1
  `}
          />
        </div>
        {errors.username && (
          <p className="text-danger text-sm pl-1">{errors.username.message}</p>
        )}
      </div>
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
          name="agreement"
          id="agreement"
          className="scale-125 accent-indigo-500 cursor-pointer"
        />
        <label htmlFor="agreement" className="cursor-pointer">
          I agree to the{" "}
          <span className="hover:underline">terms of service</span> and{" "}
          <span className="hover:underline">privacy policy</span>
        </label>
      </div>
    </AuthForm>
  );
};

export default Signup;
