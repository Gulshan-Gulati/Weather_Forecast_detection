import React from 'react';
import { Cloud, Github, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} py-8 mt-12`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Cloud className="text-blue-500" size={24} />
              <span className="text-xl font-bold">WeatherApp</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Your trusted source for accurate weather forecasts and updates.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Forecast</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Maps</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} WeatherApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;