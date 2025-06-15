import { IconUsers } from "@tabler/icons-react";
import { WebName } from "../../constants/constants";

const Sidebar = () => {
  return (
    <div className=" ">
      <div className="flex items-center space-x-2 p-2 border-1 border-gray-300 rounded-md">
        <IconUsers className=" bg-indigo-500 rounded-lg p-2 text-white" stroke={2} size={32} />
        <div className="flex flex-col justify-start items-start">
          <button className="font-semibold text-sm leading-4 text-dark-500/80 dark:text-white">
            {WebName}
          </button>
          <p className="text-xs capitalize text-neutral-800">Skill exchange platform</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
