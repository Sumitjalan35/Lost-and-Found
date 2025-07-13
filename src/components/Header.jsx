import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">🎒</span>
            <h1 className="text-xl font-bold">Campus Lost & Found</h1>
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/report-lost" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/report-lost') 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              Report Lost
            </Link>
            <Link 
              to="/report-found" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/report-found') 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              Report Found
            </Link>
            <Link 
              to="/view-items" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/view-items') 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              Browse Items
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
