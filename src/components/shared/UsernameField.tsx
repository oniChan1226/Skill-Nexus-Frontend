import { IconUserCode } from "@tabler/icons-react";
import type{ FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label?: string;
  suggestions?: string[];
  error?: FieldError;
  register: UseFormRegisterReturn;
  onSuggestionClick: (suggestion: string) => void;
};

const UsernameField = ({
  label = "Username",
  suggestions = [],
  error,
  register,
  onSuggestionClick,
}: Props) => {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor="username"
        className="text-lg lg:text-lg font-semibold text-black/80"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <IconUserCode className="absolute left-3 text-gray-400" size={18} />
        <input
          id="username"
          placeholder="johndoe123"
          {...register}
          className={`pl-10 pr-3 py-2 w-full rounded-md 
            border 
            ${error ? "border-danger focus:ring-danger" : "border-gray-300 focus:ring-indigo-400"} 
            focus:outline-none focus:ring-1
          `}
        />
      </div>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {suggestions.map((s, i) => (
            <span
              key={i}
              onClick={() => onSuggestionClick(s)}
              className="bg-indigo-100/40 hover:bg-indigo-100/60 duration-200 text-black/80 px-2 py-1 rounded-md cursor-pointer"
            >
              {s}
            </span>
          ))}
        </div>
      )}
      {error && (
        <p className="text-danger text-md pl-1">{error.message}</p>
      )}
    </div>
  );
};

export default UsernameField;
