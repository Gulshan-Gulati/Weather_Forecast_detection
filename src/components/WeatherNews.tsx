import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';

interface WeatherNewsProps {
  darkMode: boolean;
}

const WeatherNews: React.FC<WeatherNewsProps> = ({ darkMode }) => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const newsItems = [
    "Extreme heat wave expected to hit the Western region next week",
    "Tropical storm forming in the Atlantic, monitoring continues",
    "Record-breaking rainfall in Southeast Asia causes flooding",
    "Scientists predict above-average hurricane season",
    "New weather satellite launched to improve forecast accuracy"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-lg p-6`}>
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="text-blue-500" />
        <h3 className="text-lg font-semibold">Weather News</h3>
      </div>
      <div className="h-24 flex items-center justify-center">
        <p className="text-center animate-fade-in">
          {newsItems[currentNewsIndex]}
        </p>
      </div>
    </div>
  );
};

export default WeatherNews;