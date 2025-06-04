import { Link } from "react-router-dom";
import Badge from "../shared/Badge";
import Button from "../shared/Button";
import { IconArrowRight } from "@tabler/icons-react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Hero = () => {
  const stats = [
    { number: "10K+", label: "Active Members" },
    { number: "25K+", label: "Skills Exchanged" },
    { number: "98%", label: "Success Rate" },
    { number: "150+", label: "Skill Categories" },
  ];

  return (
    <section className="relative py-16 sm:py-24">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          show: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <motion.div variants={fadeUp}>
            <Badge className="mb-6 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
              🚀 Join 10,000+ skill swappers worldwide
            </Badge>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Trade Skills,
            <span className="block text-indigo-500">Not Bills</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-gray-600 dark:text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with talented individuals to exchange knowledge and skills.
            Learn what you need, teach what you know - all without spending a
            penny.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="text-lg font-semibold shadow-xl px-6 py-2">
                <span className="flex items-center">
                  Join Now
                  <IconArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </Link>
            <Link to="#features">
              <Button
                variant="light"
                className="outline-1 outline-gray-300 shadow-md text-lg font-semibold px-6 py-2"
              >
                Browse Skills
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          show: {
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="mt-16 bg-gray-50 dark:bg-dark-400/20 py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeUp} className="text-center">
                <div className="text-3xl font-bold text-indigo-500 mb-2">
                  <CountUp
                    end={parseFloat(stat.number.replace(/[^\d.]/g, ""))}
                    duration={3}
                    separator=","
                    suffix={stat.number.replace(/\d|[.,]/g, "")}
                  />
                </div>
                <div className="text-gray-600 dark:text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
