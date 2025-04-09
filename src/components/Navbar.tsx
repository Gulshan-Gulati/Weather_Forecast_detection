import React from 'react';
import { Sun, Moon, Cloud } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className={`py-4 px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow-lg`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Cloud className="text-blue-500" size={24} />
          <span className="text-xl font-bold">WeatherApp</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Forecast</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Maps</a>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;