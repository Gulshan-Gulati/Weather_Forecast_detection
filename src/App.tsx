import React, { useState, useEffect } from 'react';
import { Search, Cloud, Droplets, Wind, History, RefreshCw, Loader2, Sun, Moon } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import SearchHistory from './components/SearchHistory';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WeatherNews from './components/WeatherNews';
import WeatherFacts from './components/WeatherFacts';
import Background3D from './components/Background3D';
import { WeatherData } from './types';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = '3bd122cd76cfce5bcc2219b7735195bf';

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeather(data);
      
      setSearchHistory(prev => {
        const newHistory = [cityName, ...prev.filter(c => c !== cityName)].slice(0, 5);
        return newHistory;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const handleHistoryClick = (cityName: string) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen relative ${darkMode ? 'dark' : ''}`}>
      <Background3D />
      <div className="relative z-10">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="container mx-auto px-4 py-8 space-y-8">
          <h1 className="text-4xl font-bold text-center text-blue-900 dark:text-blue-100 mb-8">
            Weather Forecast
          </h1>

          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-blue-200 focus:border-blue-400 focus:outline-none transition-colors dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="max-w-2xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded dark:bg-red-900 dark:text-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              {weather && <WeatherCard weather={weather} onRefresh={() => fetchWeather(city)} darkMode={darkMode} />}
              {searchHistory.length > 0 && (
                <SearchHistory history={searchHistory} onSelect={handleHistoryClick} darkMode={darkMode} />
              )}
            </div>
            
            <div className="space-y-8">
              <WeatherNews darkMode={darkMode} />
              <WeatherFacts darkMode={darkMode} />
            </div>
          </div>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;