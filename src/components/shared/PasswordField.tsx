import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type PasswordFieldProps = {
  id: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  forgotPassword: boolean;
  register: UseFormRegisterReturn;
};

const PasswordField = ({
  id,
  label = "Password",
  placeholder = "You@123!",
  forgotPassword = true,
  error,
  register,
}: PasswordFieldProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex justify-between items-center">
        <label
          htmlFor={id}
          className="text-lg font-semibold text-black/80"
        >
          {label}
        </label>
        {forgotPassword && <h2 className="hover:underline cursor-pointer text-sm">
          Forgot Password?
        </h2>}
      </div>
      <div className="relative flex items-center">
        <IconLock className="absolute left-3 text-gray-400" size={18} />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 text-gray-400 cursor-pointer"
        >
          {show ? <IconEye size={20} /> : <IconEyeOff size={20} />}
        </button>
        <input
          type={show ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          {...register}
          className={`pl-10 pr-3 py-2 w-full rounded-md border ${
            error ? "border-danger focus:ring-danger" : "border-gray-300 focus:ring-indigo-400"
          } focus:outline-none focus:ring-1`}
        />
      </div>
      {error && <p className="text-danger text-md pl-1">{error.message}</p>}
    </div>
  );
};

export default PasswordField;
