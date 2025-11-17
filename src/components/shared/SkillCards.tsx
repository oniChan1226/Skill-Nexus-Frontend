interface SkillCardsProps {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  subText: string;
  isTitleBold?: boolean;
}

const SkillCards = ({ title, icon, value, subText, isTitleBold = true }: SkillCardsProps) => {
  return (
    <div className="p-5 bg-transparent border border-neutral-300 dark:border-dashboard-300 rounded-lg space-y-2">
      <div className="flex justify-between items-center">
        <h2 className={`text-sm text-dark-800 dark:text-gray-200 ${isTitleBold ? 'font-semibold' : ''}`}>{title}</h2>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">{subText}</p>
    </div>
  );
};

export default SkillCards;
