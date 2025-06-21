import {
  IconQuote,
  IconUserPlus,
  IconChartBar,
  IconAward,
  IconUsersGroup,
  IconBulb,
  IconRocket,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: IconUserPlus,
    title: "Connect with mentors",
  },
  {
    icon: IconChartBar,
    title: "Track skill progress",
  },
  {
    icon: IconAward,
    title: "Earn verified badges",
  },
  {
    icon: IconUsersGroup,
    title: "Join communities",
  },
  {
    icon: IconBulb,
    title: "Collaborate on ideas",
  },
  {
    icon: IconRocket,
    title: "Showcase your portfolio",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const AuthHero = () => {
  return (
    <section className="flex flex-col justify-between items-start text-black/90 dark:text-white/90 text-left px-3 xl:px-6 py-3 xl:py-12 w-full h-full bg-gradient-to-br from-purple-100 via-blue-100 to-teal-100 dark:bg-dark-500 dark:from-gray-900 dark:via-purple-800/20 dark:to-blue-600/30">
      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col ml-4 p-3 capitalize dark:bg-white/5 rounded-xl"
      >
        <h1 className="text-xl xl:text-2xl leading-tight relative capitalize">
          <IconQuote
            stroke={2}
            className="rotate-180 absolute -top-2 -left-6"
          />
          <IconQuote stroke={2} className="absolute top-[45%] -right-6" />
          A network of{" "}
          <span className="dark:text-indigo-400 text-indigo-500 font-semibold">
            skills
          </span>{" "}
          <br />A future of{" "}
          <span className="dark:text-indigo-400 text-indigo-500 font-semibold">
            possibilities
          </span>
        </h1>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        className="image my-5 w-full flex justify-center items-center"
      >
        <img
          src="./Images/login.svg"
          alt=""
          className="bg-transparent w-full h-full max-w-3xl"
        />
      </motion.div>

      {/* Features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full max-w-4xl"
      >
        {features.map(({ icon: Icon, title }, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center justify-start gap-3 bg-white/40 dark:bg-white/5 p-3 rounded-xl shadow-sm"
          >
            <Icon
              className="text-indigo-500 dark:text-indigo-400"
              size={24}
              stroke={1.5}
            />
            <p className="text-black/80 dark:text-white/80 text-xs xl:text-md font-semibold">{title}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-sm mt-6 italic text-muted"
      >
        — Built for students, mentors, and professionals
      </motion.p>
    </section>
  );
};

export default AuthHero;
