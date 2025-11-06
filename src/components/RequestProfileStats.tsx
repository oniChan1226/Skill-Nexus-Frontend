import {
  IconHourglassLow,
  IconCircleCheck,
  IconTrophy,
  IconCircleX,
} from "@tabler/icons-react"; // adjust the import path as needed
import SkillCards from "./shared/SkillCards";
import type { UserProfileMetrices } from "@/types/trading.types";

const RequestStats = ({ metrics }: { metrics: UserProfileMetrices }) => {
  const dashboardStats = [
    {
      title: "Pending Requests",
      icon: <IconHourglassLow size={20} className="text-yellow-500" />,
      value: metrics.pendingRequests,
      subtext: "Requests waiting for approval",
    },
    {
      title: "Accepted Requests",
      icon: <IconCircleCheck size={20} className="text-green-500" />,
      value: metrics.acceptedRequests,
      subtext: "Requests that were approved",
    },
    {
      title: "Completed",
      icon: <IconTrophy size={20} className="text-blue-500" />,
      value: metrics.completedRequests,
      subtext: "Requests successfully fulfilled",
    },
    {
      title: "Rejected",
      icon: <IconCircleX size={20} className="text-red-500" />,
      value: metrics.rejectedRequests,
      subtext: "Requests that were declined",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-2">
      {dashboardStats.map((stat) => (
        <SkillCards
          key={stat.title}
          icon={stat.icon}
          title={stat.title}
          subText={stat.subtext}
          value={stat.value}
          isTitleBold={false}
        />
      ))}
    </div>
  );
};

export default RequestStats;
