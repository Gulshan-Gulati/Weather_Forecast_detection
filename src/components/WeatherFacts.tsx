import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface WeatherFactsProps {
  darkMode: boolean;
}

const WeatherFacts: React.FC<WeatherFactsProps> = ({ darkMode }) => {
  const facts = [
    "Lightning strikes the Earth about 100 times every second",
    "A hurricane can release energy equivalent to 10 atomic bombs",
    "The fastest recorded wind speed was 253 mph at Barrow Island, Australia",
    "Snow isn't actually white - it's transparent",
    "Raindrops aren't tear-shaped - they're round"
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl shadow-lg p-6`}>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="text-blue-500" />
        <h3 className="text-lg font-semibold">Weather Facts</h3>
      </div>
      <ul className="space-y-4">
        {facts.map((fact, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherFacts;