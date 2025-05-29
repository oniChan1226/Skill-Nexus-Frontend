import { IconArrowRight } from "@tabler/icons-react";

const steps = [
  {
    number: 1,
    title: "Create Your Profile",
    description:
      "Sign up and add the skills you can teach — and the ones you want to learn.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    number: 2,
    title: "Find Your Match",
    description:
      "Explore the platform and get matched with users based on your interests.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    number: 3,
    title: "Start Swapping",
    description:
      "Chat, schedule, and start sharing knowledge in live or async sessions.",
    color: "from-amber-400 to-orange-500",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A simple, 3-step journey to your next skill exchange.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 relative overflow-hidden"
            >
              {/* Gradient Border Glow */}
              <div
                className={`absolute -top-6 -left-6 w-32 h-32 rounded-full opacity-20 blur-3xl bg-gradient-to-br ${step.color}`}
              ></div>

              {/* Step Badge */}
              <div
                className={`w-12 h-12 mb-6 rounded-full bg-gradient-to-br ${step.color} text-white flex items-center justify-center font-semibold text-lg shadow-lg`}
              >
                {step.number}
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                {step.description}
              </p>

              {/* CTA Arrow */}
              <div className="mt-4">
                <IconArrowRight className="text-gray-400 group-hover:text-indigo-500 transition duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
