import { Link } from 'react-router-dom'
import { WebName } from '../../../constants/constants'

const PublicFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  {/* <Users className="h-5 w-5 text-white" /> */}
                </div>
                <span className="text-xl font-bold">{WebName}</span>
              </div>
              <p className="text-gray-400">Connecting people through the power of skill sharing.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Safety Guidelines
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} {WebName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default PublicFooter