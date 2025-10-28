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
import SkillSection, { type Skill } from "@/components/SkillSection";
import { useNavigate } from "react-router-dom";

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

const offeredSkills: Skill[] = [
  // { name: "Web Development", category: "Technology", level: "Expert", status: "active", rating: 4.9, requests: 12 },
  // { name: "Graphic Design", category: "Design", level: "Advanced", status: "active", rating: 4.8, requests: 8 },
  // { name: "Digital Marketing", category: "Marketing", level: "Intermediate", status: "paused", rating: 4.7, requests: 5 },
];

const interestedSkills: Skill[] = [
  // { name: "Public Speaking", category: "Communication", level: "Beginner", rating: 0, requests: 3, priority: "High" },
  // { name: "Video Editing", category: "Creative Media", level: "Beginner", rating: 0, requests: 2, priority: "Medium" },
  // { name: "UI/UX Design", category: "Design", level: "Intermediate", rating: 0, requests: 4, priority: "High" },
  // { name: "Data Analysis", category: "Analytics", level: "Intermediate", rating: 0, requests: 1, priority: "Low" },
  // { name: "Photography", category: "Creative Arts", level: "Beginner", rating: 0, requests: 0, priority: "Low" },
];

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth, shallowEqual);

  const navigate = useNavigate();
  const navigateToSkillsPage = (value: string = "offered") =>
    navigate(`skills?tab=${value}`);

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
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
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-2">
        {dashboardStats.map((stat) => (
          <SkillCards
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            subText={stat.subtext}
            value={stat.value}
          />
        ))}
      </div>

      <SkillSection
        title="Skills I Offer"
        subtitle="Manage your offered skills and view requests"
        buttonText="Add Skill"
        skills={offeredSkills}
        onAddClick={() => navigateToSkillsPage("offered")}
        onViewDetails={(skill) => console.log("Viewing", skill.name)}
      />
      <SkillSection
        title="Skills I'm Seeking"
        subtitle="Skills you want to learn through exchanges"
        buttonText="Add Interest"
        skills={interestedSkills}
        onAddClick={() => navigateToSkillsPage("required")}
        onViewDetails={(skill) => console.log("Viewing", skill.name)}
      />
    </div>
  );
};

export default Dashboard;
