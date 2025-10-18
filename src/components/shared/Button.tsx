import type React from "react";

type ButtonVariant = 
  | "primary"
  | "secondary"
  | "gray"
  | "info"
  | "warning"
  | "danger"
  | "custom"
  | "light";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "rounded-lg cursor-pointer duration-300";

  const variantClasses = {
    primary: "bg-indigo-500 hover:bg-indigo-600 text-white/90",
    secondary: "text-indigo-700 bg-neutral-50 hover:bg-neutral-100 border-1 border-indigo-300 sahdow-sm",
    gray: "hover:bg-gray-600 text-white",
    info: "bg-blue-500 hover:bg-blue-600 text-white",
    warning: "bg-yellow-400 hover:bg-yellow-500 text-black",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    light: "hover:bg-gray-100 text-gray-800 dark:text-white/90 dark:hover:bg-dark-400/30 dark:border-dark-300",
    custom: "",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;