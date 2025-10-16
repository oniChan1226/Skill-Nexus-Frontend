import { IconCalendar, IconMail, IconUser } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../schemas/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AuthForm } from "../../components/ui/auth";
import { useRegisterUserMutation } from "../../services/auth.service";
import type { SignupFormData } from "../../types/auth.types";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../features/auth/authSlice";
import { handleServerErrorsGeneric } from "../../utils/handlers";
import UsernameField from "../../components/shared/UsernameField";
import InputField from "../../components/shared/InputField";
import PasswordField from "../../components/shared/PasswordField";

const signupFieldMap: Record<string, keyof SignupFormData> = {
  password: "password",
  email: "email",
  age: "age",
  agreement: "agreement",
};

const Signup = () => {
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    setError,
    setValue,
    handleSubmit,
    clearErrors,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (data: SignupFormData) => {
    setLoading(true);
    try {
      const response = await registerUser(data).unwrap();
      toast.success(response?.message);
      dispatch(setUser(response?.user));
      navigate("/dashboard", { replace: true }); // TODO: go to profile setup
    } catch (error: any) {
      handleServerErrorsGeneric<SignupFormData>(
        error,
        setError,
        toast.error,
        signupFieldMap
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Create an account"
      subtitle="Join us today and explore new opportunities"
      actionLabel="Create account"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkTo="/login"
      isLoading={loading}
      loaderFallbackText="Registering"
      onSubmit={handleSubmit(handleSignup)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Name */}
        <InputField
          id="name"
          label="Name"
          placeholder="John"
          icon={<IconUser size={18} />}
          error={errors.name}
          register={register("name")}
        />
        {/* Age */}
        <InputField
          id="age"
          label="Age"
          placeholder="25"
          type="number"
          icon={<IconCalendar size={18} />}
          error={errors.age}
          register={register("age", { valueAsNumber: true })}
        />
      </div>
      {/* Email */}
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        icon={<IconMail size={18} />}
        error={errors.email}
        register={register("email")}
        autoComplete="email"
      />
      {/* Password */}
      <PasswordField
        id="password"
        error={errors.password}
        forgotPassword={false}
        register={register("password")}
      />

      <div className="flex justify-start items-center space-x-2 text-xs md:text-sm">
        <input
          type="checkbox"
          {...register("agreement")}
          id="agreement"
          className="scale-125 accent-indigo-500 cursor-pointer"
        />
        <label htmlFor="agreement" className="cursor-pointer">
          I agree to the{" "}
          <span className="hover:underline">terms of service</span> and{" "}
          <span className="hover:underline">privacy policy</span>
        </label>
      </div>
      {errors.agreement && (
        <p className="text-danger text-md pl-1">{errors.agreement.message}</p>
      )}
    </AuthForm>
  );
};

export default Signup;
