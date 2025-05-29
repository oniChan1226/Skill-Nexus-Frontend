import { IconCurrencyDollar, IconShield, IconUsers } from "@tabler/icons-react";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "../shared/Card";

const Features = () => {
  const features = [
    {
      icon: <IconUsers className="h-8 w-8 text-indigo-500" />,
      title: "Skill-based Matchmaking",
      description:
        "Our smart algorithm connects you with the perfect skill exchange partners based on your needs and offerings.",
    },
    {
      icon: <IconCurrencyDollar className="h-8 w-8 text-emerald-500" />,
      title: "Zero-cost Learning",
      description:
        "Learn new skills without spending money. Trade your expertise for knowledge you want to acquire.",
    },
    {
      icon: <IconShield className="h-8 w-8 text-amber-500" />,
      title: "Verified Community",
      description:
        "All members are verified through our comprehensive review system ensuring safe and quality exchanges.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Skill Swap?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join a thriving community where knowledge flows freely and everyone
            grows together
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded p-2.5"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-gray-900 font-semibold ">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed pb-4">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
