import { Link } from "react-router-dom";
import Button from "../../shared/Button";
import { WebName } from "../../../constants/constants";
import { IconUsers } from "@tabler/icons-react";

const PublicHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center"> */}
            {/* <Users className="h-5 w-5 text-white" /> */}
            <IconUsers className="h-5 w-5 text-indigo-500" stroke={2} />
            {/* </div> */}
            <Link to={"/"} className="text-xl font-bold text-gray-900">{WebName}</Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              to="#community"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Community
            </Link>
            <Link
              to="#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How it Works
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-1 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>4,802 Online</span>
            </div>
            <Link to="/login">
              <Button variant="light" className="hidden sm:block px-4 py-1">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" className=" px-4 py-1">Join Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
