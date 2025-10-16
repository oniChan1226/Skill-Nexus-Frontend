import { IconBrandGithub, IconMail } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../shared/Button";
import { HashLoader } from "react-spinners";

interface AuthFormProps {
  title: string;
  subtitle: string;
  actionLabel: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  isLoading: boolean;
  loaderFallbackText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const AuthForm = ({
  title,
  subtitle,
  actionLabel,
  footerText,
  footerLinkText,
  footerLinkTo,
  isLoading,
  loaderFallbackText,
  onSubmit,
  children,
}: AuthFormProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-white/90 my-4 p-4 xl:p-12 rounded-md border-gray-200/80 shadow-sm border w-[95%] mx-auto"
    >
      {/* Headings */}
      <div className="flex flex-col justify-center items-center space-y-2 mb-6">
        <h2 className="text-3xl xl:text-4xl font-semibold text-black/90 text-center">
          {title}
        </h2>
        <p className="text-gray-600/80 tracking-wide text-sm xl:text-md text-center">{subtitle}</p>
      </div>

      {/* OAuth Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex justify-center items-center border w-full py-2 rounded border-gray-300 my-2 hover:bg-black/5 duration-200"
        >
          <IconBrandGithub className="h-full" stroke={2} />
          <span className="pl-2 font-semibold">Github</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex justify-center items-center border w-full py-2 rounded border-gray-300 my-2 hover:bg-black/5 duration-200"
        >
          <IconMail className="h-full" />
          <span className="pl-2 font-semibold">Google</span>
        </motion.button>
      </div>

      {/* Divider */}
      <div className="flex items-center my-4 gap-4 text-gray-500 text-xs lg:text-sm">
        <span className="flex-1 h-px bg-gray-300" />
        OR CONTINUE WITH
        <span className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Form */}
      <form className="space-y-2 md:space-y-4" onSubmit={onSubmit}>
        {children}
        <Button
          variant="custom"
          type="submit"
          className="w-full py-2 text-lg xl:text-xl border-gray-300 bg-indigo-500 text-white border hover:bg-indigo-500/90 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? <><HashLoader color="white" size={20} className="mr-1"/> {loaderFallbackText}</> : actionLabel}
        </Button>
      </form>

      {/* Footer */}
      <h3 className="text-center mt-3 text-black/90 tracking-wide">
        {footerText}{" "}
        <Link to={footerLinkTo} className="font-semibold hover:underline">
          {footerLinkText}
        </Link>
      </h3>
    </motion.section>
  );
};

export default AuthForm;
