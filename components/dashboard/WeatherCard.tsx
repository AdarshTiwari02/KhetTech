'use client';

import { useState, useEffect } from 'react';
import {
  Cloud, Thermometer, Droplets, Wind, Sun, CloudRain,
  MapPin, RefreshCw, Navigation, Search, CloudSnow,
  CloudLightning, Eye, Gauge,
} from 'lucide-react';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;  // mapped from WMO code
  feelsLike: number;
  pressure: number;
  visibility: number; // km
}

interface ForecastDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  description: string;
  rainChance: number;
  windSpeed: number;
}

// ─── WMO Weather Code → condition + Hindi description ──────────────────────
function decodeWMO(code: number): { condition: string; description: string } {
  if (code === 0) return { condition: 'clear', description: 'साफ आसमान' };
  if (code <= 2) return { condition: 'clouds', description: 'थोड़े बादल' };
  if (code === 3) return { condition: 'clouds', description: 'बादल छाए' };
  if (code <= 49) return { condition: 'mist', description: 'धुंध / कोहरा' };
  if (code <= 59) return { condition: 'drizzle', description: 'हल्की बारिश' };
  if (code <= 69) return { condition: 'rain', description: 'बारिश' };
  if (code <= 79) return { condition: 'snow', description: 'बर्फबारी' };
  if (code <= 84) return { condition: 'rain', description: 'तेज बारिश' };
  if (code <= 92) return { condition: 'thunderstorm', description: 'आंधी-तूफान' };
  return { condition: 'thunderstorm', description: 'भारी तूफान' };
}

const DAYS_HI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
const MONTHS_HI = ['जन', 'फर', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्टू', 'नव', 'दिस'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T12:00:00');
  return `${DAYS_HI[d.getDay()]}, ${d.getDate()} ${MONTHS_HI[d.getMonth()]}`;
}

export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [searchCity, setSearchCity] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'today' | 'forecast'>('today');

  // ─── Fetch weather from Open-Meteo (FREE, no API key!) ─────────────────
  const fetchWeatherByCoords = async (lat: number, lon: number, skipGeocode = false) => {
    try {
      setIsLoading(true); setError('');

      // 1) Reverse geocoding (free) — skip if city was explicitly selected
      if (!skipGeocode) {
        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=hi`
          );
          if (geoRes.ok) {
            const geo = await geoRes.json();
            const city = geo.city || geo.locality || geo.principalSubdivision || 'भारत';
            const name = `${city}, ${geo.countryCode || 'IN'}`;
            setLocation(name);
            localStorage.setItem('weatherLocation', JSON.stringify({ name, lat, lon }));
            window.dispatchEvent(new Event('locationChanged'));
          }
        } catch { setLocation(`${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`); }
      } // end if (!skipGeocode)

      // 2) Open-Meteo API — completely free, no key needed
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,visibility` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max` +
        `&timezone=Asia%2FKolkata&forecast_days=6`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather API failed');
      const data = await res.json();

      const cur = data.current;
      const decoded = decodeWMO(cur.weather_code);
      setWeather({
        temperature: Math.round(cur.temperature_2m),
        humidity: cur.relative_humidity_2m,
        windSpeed: Math.round(cur.wind_speed_10m),
        condition: decoded.condition,
        feelsLike: Math.round(cur.apparent_temperature),
        pressure: Math.round(cur.surface_pressure),
        visibility: Math.round(cur.visibility / 1000),
      });

      // 3) Build 5-day forecast (skip today = index 0)
      const days: ForecastDay[] = data.daily.time.slice(1, 6).map((date: string, i: number) => {
        const idx = i + 1;
        const dec = decodeWMO(data.daily.weather_code[idx]);
        return {
          date,
          dayName: formatDate(date),
          tempMax: Math.round(data.daily.temperature_2m_max[idx]),
          tempMin: Math.round(data.daily.temperature_2m_min[idx]),
          condition: dec.condition,
          description: dec.description,
          rainChance: data.daily.precipitation_probability_max[idx] ?? 0,
          windSpeed: Math.round(data.daily.wind_speed_10m_max[idx]),
        };
      });
      setForecast(days);
    } catch (err) {
      setError('मौसम डेटा प्राप्त करने में समस्या हुई। इंटरनेट कनेक्शन जांचें।');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── City search via Open-Meteo Geocoding API (free) ───────────────────
  const searchCities = async (query: string) => {
    if (query.length < 2) { setSearchResults([]); return; }
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`
      );
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.results || []);
      }
    } catch { } finally { setIsSearching(false); }
  };

  const handleCitySelect = (city: any) => {
    const name = `${city.name}, ${city.country_code?.toUpperCase() || 'IN'}`;
    setLocation(name);
    localStorage.setItem('weatherLocation', JSON.stringify({ name, lat: city.latitude, lon: city.longitude }));
    window.dispatchEvent(new Event('locationChanged'));
    setSearchResults([]); setSearchCity(''); setShowLocationModal(false);
    fetchWeatherByCoords(city.latitude, city.longitude, true);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) { setError('GPS उपलब्ध नहीं है।'); setShowLocationModal(true); return; }
    setShowLocationModal(false); setIsLoading(true); setError('');
    setLocation('आपका स्थान पता लगाया जा रहा है...');
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => {
        setIsLoading(false); setError('GPS स्थान प्राप्त नहीं हो सका।');
        setShowLocationModal(true);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    const saved = localStorage.getItem('weatherLocation');
    if (saved) {
      try { const { lat, lon } = JSON.parse(saved); fetchWeatherByCoords(lat, lon); }
      catch { useCurrentLocation(); }
    } else {
      // Default to Delhi if GPS not available
      fetchWeatherByCoords(28.6139, 77.2090);
    }
  }, []);

  // ─── Icon ───────────────────────────────────────────────────────────────
  const getIcon = (condition: string, size = 'md') => {
    const cls = size === 'lg' ? 'w-12 h-12' : size === 'sm' ? 'w-5 h-5' : 'w-7 h-7';
    switch (condition) {
      case 'clear': return <Sun className={`${cls} text-amber-400`} />;
      case 'rain': return <CloudRain className={`${cls} text-blue-500`} />;
      case 'drizzle': return <CloudRain className={`${cls} text-sky-400`} />;
      case 'snow': return <CloudSnow className={`${cls} text-sky-300`} />;
      case 'thunderstorm': return <CloudLightning className={`${cls} text-purple-500`} />;
      case 'mist': return <Cloud className={`${cls} text-gray-400`} />;
      default: return <Cloud className={`${cls} text-gray-400`} />;
    }
  };

  const getForecastBg = (condition: string) => {
    switch (condition) {
      case 'clear': return 'from-amber-50 to-orange-50 border-amber-200';
      case 'rain': case 'drizzle': return 'from-blue-50 to-cyan-50 border-blue-200';
      case 'thunderstorm': return 'from-purple-50 to-indigo-50 border-purple-200';
      case 'snow': return 'from-sky-50 to-blue-50 border-sky-200';
      default: return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  const getFarmingAdvice = () => {
    if (!weather) return '';
    const { temperature: t, humidity: h, condition: c } = weather;
    if (c === 'rain' || c === 'drizzle') return '🌧️ आज सिंचाई की जरूरत नहीं। बारिश कम होने पर कीटनाशक न डालें।';
    if (c === 'thunderstorm') return '⛈️ तूफान की चेतावनी! खेतों से सुरक्षित स्थान पर जाएं।';
    if (t > 35) return '⚠️ उच्च तापमान! सुबह जल्दी या शाम को सिंचाई करें। छाया प्रबंध करें।';
    if (t < 10) return '❄️ ठंड से फसल बचाएं! संवेदनशील पौधों को ढकें।';
    if (h > 80) return '💧 उच्च आर्द्रता — फफूंद रोगों का खतरा है। निवारक फफूंदनाशक लगाएं।';
    return '✅ मौसम अनुकूल है। नियमित खेती कार्य जारी रखें।';
  };

  // ─── Loading ─────────────────────────────────────────────────────────────
  if (isLoading && !weather) {
    return (
      <div className="card">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-600 font-medium">मौसम डेटा लोड हो रहा है...</p>
            <p className="text-sm text-gray-400 mt-1">Open-Meteo API से डेटा प्राप्त किया जा रहा है</p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main Render ──────────────────────────────────────────────────────────
  return (
    <>
      <div className="card">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center text-gray-900">
            <Cloud className="w-5 h-5 mr-2 text-blue-500" />
            मौसम पूर्वानुमान
          </h2>
          <div className="flex items-center space-x-3">
            <button onClick={() => setShowLocationModal(true)}
              className="text-sm text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1">
              <MapPin className="w-4 h-4" /> बदलें
            </button>
            <button onClick={useCurrentLocation} disabled={isLoading}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50 flex items-center gap-1">
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> रीफ्रेश
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
            <div className="flex gap-2 mt-3">
              <button onClick={() => fetchWeatherByCoords(28.6139, 77.2090)}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs hover:bg-emerald-700">
                दिल्ली का मौसम दिखाएं
              </button>
              <button onClick={() => setShowLocationModal(true)}
                className="px-3 py-1.5 border border-red-300 text-red-700 rounded-lg text-xs hover:bg-red-50">
                शहर चुनें
              </button>
            </div>
          </div>
        )}

        {/* Location pill */}
        {location && location !== 'आपका स्थान पता लगाया जा रहा है...' && (
          <div className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl w-fit">
            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold text-gray-800 text-sm">{location}</span>
            {isLoading && <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin ml-1" />}
          </div>
        )}

        {/* Tab switcher */}
        {weather && (
          <div className="flex bg-gray-100 rounded-xl p-1 mb-5 w-full max-w-xs">
            {(['today', 'forecast'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tab ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {tab === 'today' ? 'आज का मौसम' : '5 दिन का पूर्वानुमान'}
              </button>
            ))}
          </div>
        )}

        {/* ── TODAY TAB ── */}
        {weather && activeTab === 'today' && (
          <>
            {/* Hero */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-2xl p-5 text-white mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm mb-1">अभी का मौसम</p>
                  <div className="text-5xl font-bold mb-1">{weather.temperature}°C</div>
                  <p className="text-emerald-100 capitalize">{decodeWMO(0).description}</p>
                  <p className="text-emerald-200 text-sm mt-1">महसूस होता है {weather.feelsLike}°C</p>
                </div>
                <div className="opacity-90">{getIcon(weather.condition, 'lg')}</div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <Droplets className="w-4 h-4 mx-auto text-blue-200 mb-1" />
                  <p className="text-xs text-emerald-100">आर्द्रता</p>
                  <p className="font-bold">{weather.humidity}%</p>
                </div>
                <div className="text-center">
                  <Wind className="w-4 h-4 mx-auto text-emerald-200 mb-1" />
                  <p className="text-xs text-emerald-100">हवा</p>
                  <p className="font-bold">{weather.windSpeed} km/h</p>
                </div>
                <div className="text-center">
                  <Eye className="w-4 h-4 mx-auto text-teal-200 mb-1" />
                  <p className="text-xs text-emerald-100">दृश्यता</p>
                  <p className="font-bold">{weather.visibility} km</p>
                </div>
              </div>
            </div>

            {/* Detail cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl p-3">
                <Thermometer className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">महसूस होता है</p>
                  <p className="font-bold text-gray-900">{weather.feelsLike}°C</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                <Gauge className="w-6 h-6 text-indigo-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">वायु दबाव</p>
                  <p className="font-bold text-gray-900">{weather.pressure} hPa</p>
                </div>
              </div>
            </div>

            {/* Farming advice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-800 mb-1 flex items-center gap-2 text-sm">
                <Sun className="w-4 h-4" /> खेती सलाह
              </h4>
              <p className="text-sm text-emerald-700">{getFarmingAdvice()}</p>
            </div>
          </>
        )}

        {/* ── 5-DAY FORECAST TAB ── */}
        {weather && activeTab === 'forecast' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-500 mb-3">अगले 5 दिनों का मौसम पूर्वानुमान</p>
            {forecast.map((day, idx) => (
              <div key={idx}
                className={`bg-gradient-to-r ${getForecastBg(day.condition)} border rounded-2xl p-4 hover:shadow-md transition-all duration-200`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0">{getIcon(day.condition, 'md')}</div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{day.dayName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{day.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0 ml-2">
                    <div className="text-center hidden sm:block">
                      <div className="flex items-center gap-1 justify-center">
                        <Droplets className="w-3 h-3 text-blue-400" />
                        <span className="text-xs font-medium text-blue-600">{day.rainChance}%</span>
                      </div>
                      <p className="text-xs text-gray-400">बारिश</p>
                    </div>
                    <div className="text-center hidden sm:block">
                      <div className="flex items-center gap-1 justify-center">
                        <Wind className="w-3 h-3 text-gray-400" />
                        <span className="text-xs font-medium text-gray-600">{day.windSpeed}</span>
                      </div>
                      <p className="text-xs text-gray-400">km/h</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-base">{day.tempMax}°</p>
                      <p className="text-sm text-gray-400">{day.tempMin}°</p>
                    </div>
                  </div>
                </div>
                {day.rainChance > 20 && (
                  <div className="mt-3 flex items-center gap-2">
                    <Droplets className="w-3 h-3 text-blue-400 flex-shrink-0" />
                    <div className="flex-1 bg-white/60 rounded-full h-1.5">
                      <div className="bg-blue-400 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${day.rainChance}%` }} />
                    </div>
                    <span className="text-xs text-blue-600 font-medium w-8 text-right">{day.rainChance}%</span>
                  </div>
                )}
              </div>
            ))}

            {forecast.length > 0 && (
              <div className="mt-2 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl">
                <h4 className="font-semibold text-emerald-800 text-sm flex items-center gap-2 mb-1">
                  <Sun className="w-4 h-4" /> सप्ताह की खेती सलाह
                </h4>
                <p className="text-sm text-emerald-700">
                  {forecast.some(d => d.condition === 'rain' || d.condition === 'drizzle')
                    ? `${forecast.find(d => d.condition === 'rain' || d.condition === 'drizzle')?.dayName} को बारिश संभव है। उससे पहले उर्वरक और कटाई का काम निपटा लें।`
                    : 'अगले 5 दिनों में मौसम अनुकूल रहेगा। सिंचाई, बुवाई और कटाई के लिए अच्छा समय है।'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* No data */}
        {!weather && !isLoading && !error && (
          <div className="text-center py-8">
            <Cloud className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">मौसम डेटा उपलब्ध नहीं है</p>
          </div>
        )}
      </div>

      {/* ── Location Modal ── */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">स्थान चुनें</h3>
            <div className="space-y-4">
              <button onClick={useCurrentLocation} disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 font-medium">
                <Navigation className="w-5 h-5" /> वर्तमान GPS स्थान
              </button>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="flex-1 border-t" /> <span>या शहर खोजें</span> <div className="flex-1 border-t" />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" value={searchCity}
                  onChange={e => { setSearchCity(e.target.value); searchCities(e.target.value); }}
                  placeholder="शहर का नाम लिखें..." autoFocus
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900" />
                {searchCity.length >= 2 && (
                  <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto z-20">
                    {isSearching ? (
                      <div className="text-center py-4">
                        <RefreshCw className="w-5 h-5 text-emerald-600 animate-spin mx-auto" />
                      </div>
                    ) : searchResults.length > 0 ? searchResults.map((city, i) => (
                      <button key={i} onClick={() => handleCitySelect(city)}
                        className="w-full text-left px-4 py-3 hover:bg-emerald-50 border-b border-gray-100 last:border-0">
                        <p className="font-medium text-gray-900">{city.name}, {city.country_code?.toUpperCase()}</p>
                        {city.admin1 && <p className="text-sm text-gray-500">{city.admin1}</p>}
                      </button>
                    )) : (
                      <div className="px-4 py-3 text-sm text-gray-500 text-center">कोई शहर नहीं मिला</div>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Delhi button as fallback */}
              <button onClick={() => { fetchWeatherByCoords(28.6139, 77.2090); setShowLocationModal(false); }}
                className="w-full px-4 py-2 text-sm border border-emerald-300 text-emerald-700 rounded-xl hover:bg-emerald-50">
                📍 नई दिल्ली का मौसम देखें
              </button>
            </div>
            <button onClick={() => { setShowLocationModal(false); setSearchCity(''); setSearchResults([]); }}
              className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50">
              रद्द करें
            </button>
          </div>
        </div>
      )}
    </>
  );
}