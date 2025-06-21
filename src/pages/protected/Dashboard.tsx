import { shallowEqual, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import Button from "../../components/shared/Button";
import { IconTrendingUp } from "@tabler/icons-react";
import SkillCards from "../../components/shared/SkillCards";
import {
  IconBolt,
  IconUser,
  IconUsersGroup,
  IconCheck,
} from "@tabler/icons-react";

export const dashboardStats = [
  {
    title: "Active Exchanges",
    value: 12,
    subtext: "+2 from last week",
    icon: <IconBolt size={20} className="text-indigo-500" />,
  },
  {
    title: "Skills Offered",
    value: 8,
    subtext: "Across 4 categories",
    icon: <IconUser size={20} className="text-indigo-500" />,
  },
  {
    title: "Community Connections",
    value: 156,
    subtext: "+23 this month",
    icon: <IconUsersGroup size={20} className="text-indigo-500" />,
  },
  {
    title: "Success Rate",
    value: "94%",
    subtext: "Completed exchanges",
    icon: <IconCheck size={20} className="text-indigo-500" />,
  },
];


const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth, shallowEqual);

  return (
    <div className="space-y-4">
      {/* welcome cards */}
      <div className="grid grid-cols-3 gap-3">
        {/* card - 1 */}
        <div className="col-span-3 lg:col-span-2 bg-gradient-to-br dark:from-dark-500 dark:to-transparent dark:via-transparent from-indigo-100 via-indigo-50 to-indigo-50 p-4 lg:p-6 rounded-md border-1 border-indigo-200 dark:border-indigo-500/80 space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-indigo-900 dark:text-indigo-200 text-balance">
              Welcome back, {user?.name}! &#128075;{" "}
            </h2>
            <p className="text-sm text-indigo-600 dark:text-indigo-300 font-medium text-balance">
              You have 3 pending skill exchanges and 2 new skill matches waiting
              for you.
            </p>
          </div>
          <div className="space-x-2">
            <Button className="px-3 py-2 rounded-sm text-sm font-semibold">
              View Exchanges
            </Button>
            <Button
              variant="secondary"
              className="px-3 py-2 rounded-sm text-sm font-semibold"
            >
              Find Skills
            </Button>
          </div>
        </div>
        {/* card - 2 */}
        <div className="col-span-3 lg:col-span-1 p-4 lg:p-6 border-green-400 dark:border-green-400/60 border-[0.5px] rounded-md bg-gradient-to-br from-green-100  via-green-50 to-green-50 dark:from-dark-500 dark:to-transparent dark:via-transparent">
          <h4 className="text-green-700 dark:text-green-300/90 font-semibold">
            Skill Score
          </h4>
          <div className="space-y-3 text-balance">
            <h3 className="text-green-800 dark:text-green-200/90 text-3xl font-bold">
              590
            </h3>
            <div className="flex  justify-start items-center text-green-600 dark:text-green-400/90 text-sm space-x-1">
              <IconTrendingUp />
              <p> +12% from last month</p>
            </div>
          </div>
        </div>
      </div>
      {/* info cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
        {dashboardStats.map((stat) => (
          <SkillCards key={stat.title} icon={stat.icon} title={stat.title} subText={stat.subtext} value={stat.value}  />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
