import React from 'react';
import { Cloud, Droplets, Wind, RefreshCw } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
  onRefresh: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onRefresh }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{weather.name}</h2>
          <p className="text-gray-500">{weather.weather[0].description}</p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Refresh"
        >
          <RefreshCw size={20} className="text-blue-500" />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-20 h-20"
          />
          <div>
            <div className="text-4xl font-bold text-gray-800">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="text-gray-500">Feels like {Math.round(weather.main.feels_like)}°C</div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4">
          <div className="flex items-center gap-3">
            <Droplets className="text-blue-500" />
            <span className="text-gray-700">
              Humidity: {weather.main.humidity}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Wind className="text-blue-500" />
            <span className="text-gray-700">
              Wind: {Math.round(weather.wind.speed)} km/h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;