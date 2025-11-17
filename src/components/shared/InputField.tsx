import type { InputHTMLAttributes, ReactNode } from "react";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

type InputFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  error?: FieldError;
  register: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = ({
  id,
  label,
  type = "text",
  placeholder = "",
  icon,
  error,
  register,
  ...props
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-md font-semibold text-black/80">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          className={`pl-${
            icon ? "10" : "3"
          } pr-3 py-2 w-full rounded-md border ${
            error
              ? "border-danger focus:ring-danger"
              : "border-gray-300 focus:ring-indigo-400"
          } focus:outline-none focus:ring-1`}
          {...props}
        />
      </div>
      {error && <p className="text-danger text-md pl-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
