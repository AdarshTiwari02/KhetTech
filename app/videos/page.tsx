'use client';
import { useState } from 'react';
import { Video, Search, Play } from 'lucide-react';

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const openYouTubeSearch = (query: string) => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
  };
  const handleSearch = () => {
    if (searchQuery.trim()) openYouTubeSearch(`${searchQuery} farming hindi`);
  };
  const categories = [
    { title: 'गेहूं की खेती', query: 'wheat farming hindi' },
    { title: 'धान की खेती', query: 'paddy farming hindi' },
    { title: 'मक्का की खेती', query: 'maize farming hindi' },
    { title: 'सब्जी उत्पादन', query: 'vegetable farming hindi' },
    { title: 'फसल रोग पहचान', query: 'crop disease hindi' },
    { title: 'कीट नियंत्रण', query: 'pest control hindi' },
    { title: 'ड्रिप सिंचाई', query: 'drip irrigation hindi' },
    { title: 'जैविक खेती', query: 'organic farming hindi' },
    { title: 'गाय पालन', query: 'dairy farming hindi' },
    { title: 'मुर्गी पालन', query: 'poultry farming hindi' }
  ];
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center mb-2">
            <Video className="w-6 h-6 mr-2 text-red-600" />
            वीडियो ट्यूटोरियल
          </h1>
          <p className="text-sm text-gray-600">खेती से जुड़े वीडियो देखें - सीधे YouTube से</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-blue-600" />
            अपनी पसंद का वीडियो खोजें
          </h2>
          <div className="flex gap-2">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="जैसे: टमाटर की खेती, जैविक खाद..."
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            <button onClick={handleSearch}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 flex items-center">
              <Play className="w-5 h-5 mr-2" />खोजें
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, index) => (
            <button key={index} onClick={() => openYouTubeSearch(cat.query)}
              className="p-4 bg-white rounded-lg border hover:shadow-md transition-all text-left group">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{cat.title}</span>
                <Play className="w-5 h-5 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          ))}
        </div>
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">नोट:</span> सभी वीडियो YouTube पर खुलेंगे। हिंदी में खेती की जानकारी मिलेगी।
          </p>
        </div>
      </div>
    </div>
  );
}
