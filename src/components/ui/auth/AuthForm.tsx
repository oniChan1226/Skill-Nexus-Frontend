import { IconBrandGithub, IconMail } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "../../shared/Button";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  actionLabel: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const AuthLayout = ({
  title,
  subtitle,
  actionLabel,
  footerText,
  footerLinkText,
  footerLinkTo,
  onSubmit,
  children,
}: AuthLayoutProps) => {
  return (
    <section className="bg-white dark:bg-white/90 p-8 xl:p-12 rounded-md border-gray-200/80 shadow-sm border w-[95%] mx-auto">
      {/* Headings */}
      <div className="flex flex-col justify-center items-center space-y-2 mb-6">
        <h2 className="text-3xl lg:text-4xl font-semibold text-black/90">
          {title}
        </h2>
        <p className="text-gray-600/80 tracking-wide xl:text-lg">{subtitle}</p>
      </div>

      {/* OAuth Buttons */}
      <div className="flex justify-center items-center space-x-3">
        <button className="flex justify-center items-center border w-full py-2 rounded border-gray-300 my-2 hover:bg-black/5 duration-200">
          <IconBrandGithub className="h-full" stroke={2} />
          <span className="pl-2 font-semibold">Github</span>
        </button>
        <button className="flex justify-center items-center border w-full py-2 rounded border-gray-300 my-2 hover:bg-black/5 duration-200">
          <IconMail className="h-full" />
          <span className="pl-2 font-semibold">Google</span>
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center my-4 gap-4 text-gray-500 text-sm">
        <span className="flex-1 h-px bg-gray-300" />
        OR CONTINUE WITH
        <span className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={onSubmit}>
        {children}
        <Button
          variant="custom"
          type="submit"
          className="w-full py-2 text-xl border-gray-300 bg-indigo-500 text-white border hover:bg-indigo-500/90"
        >
          {actionLabel}
        </Button>
      </form>

      {/* Footer */}
      <h3 className="text-center mt-3 text-black/90 tracking-wide">
        {footerText}{" "}
        <Link to={footerLinkTo} className="font-semibold hover:underline">
          {footerLinkText}
        </Link>
      </h3>
    </section>
  );
};

export default AuthLayout;
