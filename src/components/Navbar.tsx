import React from 'react';
import { Sun, Moon, Cloud } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header
      className={`w-full py-4 px-6 ${
        darkMode ? 'bg-neutral-900 text-white' : 'bg-white text-gray-900'
      } shadow-md transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Cloud className="text-sky-500" size={26} />
          <span className="text-2xl font-semibold select-none">WeatherApp</span>
        </div>

        <nav className="flex items-center gap-5 text-sm font-medium">
          <a
            href="#"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
          >
            Forecast
          </a>
          <a
            href="#"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
          >
            Maps
          </a>

          <button
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors"
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-blue-600" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
