import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
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

  const API_KEY = 'd5c066ccd0f42fef1cf9aa784c1f30ec';

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) throw new Error('City not found or invalid API key');

      const data = await response.json();
      setWeather(data);

      setSearchHistory(prev => {
        const updated = [cityName, ...prev.filter(c => c !== cityName)].slice(0, 5);
        return updated;
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
    if (city.trim()) fetchWeather(city.trim());
  };

  const handleHistoryClick = (cityName: string) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen relative font-sans ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gradient-to-b from-sky-100 to-blue-200 text-gray-900'}`}>
      <Background3D />

      <div className="relative z-10">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
          <h1 className="text-5xl font-extrabold text-center text-blue-700 dark:text-blue-100 drop-shadow-md">
            Weather Forecast
          </h1>

          <form
            onSubmit={handleSubmit}
            className="relative max-w-3xl mx-auto bg-white/30 dark:bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-md transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Search for a city..."
                  className="w-full px-5 py-3 pl-12 rounded-xl bg-white/70 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Search'}
              </button>
            </div>
          </form>

          {error && (
            <div className="max-w-2xl mx-auto bg-red-200/80 text-red-800 dark:bg-red-800/30 dark:text-red-200 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              {weather && (
                <WeatherCard
                  weather={weather}
                  onRefresh={() => fetchWeather(city)}
                  darkMode={darkMode}
                />
              )}
              {searchHistory.length > 0 && (
                <SearchHistory
                  history={searchHistory}
                  onSelect={handleHistoryClick}
                  darkMode={darkMode}
                />
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
