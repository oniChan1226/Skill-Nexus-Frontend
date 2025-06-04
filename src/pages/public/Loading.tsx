import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
            <RingLoader size={100} color="#615fff"/>
        </div>
        <p className="text-indigo-500 text-xl animate-pulse">Loading content...</p>
      </div>
    </div>
  );
};

export default Loading;
