import type React from "react";
import type { ReactNode } from "react";

interface BadgeProps {
  className?: string;
  children: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ className = "", children }) => {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ${className}`}
    >
      {children}
    </div>
  );
};

export default Badge;
