import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IconMenu2, IconUsers, IconX } from "@tabler/icons-react";
import ThemeToggle from "../../shared/ThemeToggle";
import Button from "../../shared/Button";
import { WebName } from "../../../constants/constants";
import { motion, AnimatePresence } from "framer-motion";

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Community", href: "#community" },
    { name: "How it Works", href: "#how-it-works" },
  ];

  return (
    <header className="bg-white dark:bg-dark-500 border-b border-gray-200 dark:border-dark-400/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <IconUsers className="h-5 w-5 text-indigo-500" stroke={2} />
            <Link
              to="/"
              className="text-2xl font-bold text-dark-500/80 dark:text-white"
            >
              {WebName}
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 font-medium text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-600 dark:text-white/80 dark:hover:text-white hover:text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center space-x-2 text-lg">
            <div className="hidden sm:flex items-center space-x-1 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>4,802 Online</span>
            </div>
            <ThemeToggle />
            <Link to="/login">
              <Button variant="light" className="px-4 py-1">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" className="px-4 py-1">
                Join Now
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex sm:hidden items-center space-x-2 text-dark-500 dark:text-white">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen((prev) => !prev)}>
              {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-500 border-t border-gray-200 dark:border-dark-400 py-4 px-4 flex flex-col space-y-4 z-40"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 dark:text-white font-medium text-base"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2 text-lg">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="light" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Join Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default PublicHeader;
