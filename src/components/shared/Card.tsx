import type { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card = ({ className, children }: CardProps) => {
  return <div className={`${className}`}>{children}</div>;
};

export const CardHeader = ({ className, children }: CardProps) => {
  return <div className={`${className}`}>{children}</div>;
};

export const CardTitle = ({ className, children }: CardProps) => {
  return <h3 className={`${className}`}>{children}</h3>;
};

export const CardContent = ({ children }: { children: ReactNode }) => {
  return <h3>{children}</h3>;
};

export const CardDescription = ({ children, className = "" }: CardProps) => (
  <p className={`${className}`}>{children}</p>
);

export default Card;
