import React from 'react';
import { History } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onSelect: (city: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-blue-50 transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory