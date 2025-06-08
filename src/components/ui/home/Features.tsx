import { IconCurrencyDollar, IconShield, IconUsers } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { WebName } from "../../../constants/constants";

const features = [
  {
    icon: <IconUsers className="h-10 w-10 text-indigo-600" />,
    title: "Skill-based Matchmaking",
    description:
      "Our smart algorithm connects you with the perfect skill exchange partners based on your needs and offerings.",
    color: "bg-indigo-200 dark:bg-indigo-900",
  },
  {
    icon: <IconCurrencyDollar className="h-10 w-10 text-emerald-600" />,
    title: "Zero-cost Learning",
    description:
      "Learn new skills without spending money. Trade your expertise for knowledge you want to acquire.",
    color: "bg-emerald-200 dark:bg-emerald-900",
  },
  {
    icon: <IconShield className="h-10 w-10 text-amber-600" />,
    title: "Verified Community",
    description:
      "All members are verified through our comprehensive review system ensuring safe and quality exchanges.",
    color: "bg-amber-200 dark:bg-amber-900",
  },
];

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } },
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Why Choose {WebName}?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Join a thriving community where knowledge flows freely and everyone grows together.
          </p>
        </div>

        <div className="space-y-20">
          {features.map(({ icon, title, description, color }, i) => (
            <motion.div
              key={i}
              className={`flex flex-col md:flex-row items-center md:items-start gap-8 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={variants}
            >
              {/* Icon with animated colored blob background */}
              <div className="relative flex-shrink-0">
                <motion.div
                  className={`absolute -inset-4 rounded-full blur-3xl opacity-50 ${color}`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-lg bg-white dark:bg-gray-800`}>
                  {icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="max-w-xl text-center md:text-left">
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
                  {title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
