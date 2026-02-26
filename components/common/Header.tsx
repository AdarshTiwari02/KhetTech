'use client';

import { useState, useEffect } from 'react';
import { Bell, User, LogOut, Menu, X, MapPin, Sun, Moon, Home, Cloud, Sprout, Bug, TrendingUp, Store, Award } from 'lucide-react';
import { useTheme } from '@/components/common/ThemeProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mobileNavItems = [
  { id: 'home', label: 'होम', icon: Home, href: '/dashboard' },
  { id: 'weather', label: 'मौसम', icon: Cloud, href: '/weather' },
  { id: 'crops', label: 'फसल सुझाव', icon: Sprout, href: '/crops' },
  { id: 'diseases', label: 'रोग पहचान', icon: Bug, href: '/diseases' },
  { id: 'prices', label: 'मंडी भाव', icon: TrendingUp, href: '/prices' },
  { id: 'marketplace', label: 'बाजार', icon: Store, href: '/marketplace' },
  { id: 'schemes', label: 'सरकारी योजनाएं', icon: Award, href: '/schemes' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    // Get user's current location using browser geolocation API
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              // Use reverse geocoding to get location name
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=hi`
              );
              const data = await response.json();
              const locationName = data.city || data.locality || data.principalSubdivision || 'भारत';
              setUserLocation(locationName);
              setIsLoadingLocation(false);
            } catch (error) {
              console.error('Error getting location name:', error);
              setUserLocation('भारत');
              setIsLoadingLocation(false);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            setUserLocation('भारत');
            setIsLoadingLocation(false);
          }
        );
      } else {
        setUserLocation('भारत');
        setIsLoadingLocation(false);
      }
    };

    // Function to check user data
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);

          // Check for weather location first (priority)
          const weatherLocation = localStorage.getItem('weatherLocation');
          if (weatherLocation) {
            try {
              const { name } = JSON.parse(weatherLocation);
              if (name && name !== 'Fetching location...') {
                setUserLocation(name);
                setIsLoadingLocation(false);
                return;
              }
            } catch (err) {
              console.error('Error parsing weather location:', err);
            }
          }

          // Fallback to user state
          if (parsedUser.state) {
            setUserLocation(parsedUser.state);
            setIsLoadingLocation(false);
          } else {
            // Get current location if no saved location
            getCurrentLocation();
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          getCurrentLocation();
        }
      } else {
        setUser(null);
        // Get current location even for guest users
        getCurrentLocation();
      }
    };

    // Check on mount
    checkUser();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkUser);

    // Custom event for same-tab updates
    window.addEventListener('userChanged', checkUser);

    // Listen for location changes from WeatherCard city selection
    const handleLocationChange = () => {
      const saved = localStorage.getItem('weatherLocation');
      if (saved) {
        try {
          const { name } = JSON.parse(saved);
          if (name) {
            setUserLocation(name);
            setIsLoadingLocation(false);
          }
        } catch { }
      }
    };
    window.addEventListener('locationChanged', handleLocationChange);

    // Poll for location updates every 2 seconds for the first 10 seconds
    let pollCount = 0;
    const pollInterval = setInterval(() => {
      pollCount++;
      checkUser();
      if (pollCount >= 5) {
        clearInterval(pollInterval);
      }
    }, 2000);

    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('userChanged', checkUser);
      window.removeEventListener('locationChanged', handleLocationChange);
      clearInterval(pollInterval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsProfileOpen(false);
    window.location.href = '/landing';
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/auth/login';
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-slate-900 dark:to-slate-800 text-white shadow-lg border-b border-emerald-700 dark:border-slate-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">खेतटेक</h1>
                <p className="text-sm text-emerald-100">तकनीक से किसानों को सशक्त बनाना</p>
              </div>
            </div>
          </div>

          {/* Right side with Location and Actions */}
          <div className="flex items-center space-x-3">
            {/* Live Location */}
            <div className="hidden lg:flex items-center space-x-2 bg-emerald-700/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-emerald-500/30">
              <MapPin size={18} className="text-emerald-200 animate-pulse" />
              <div className="text-left">
                <p className="text-xs text-emerald-200">आपका स्थान</p>
                <p className="text-sm font-semibold">
                  {isLoadingLocation ? 'लोड हो रहा है...' : userLocation}
                </p>
              </div>
            </div>

            {/* ── Dark / Light Toggle ── */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Light mode' : 'Dark mode'}
              aria-label="Toggle dark mode"
              className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-emerald-700 dark:hover:bg-slate-700 transition-all duration-200"
            >
              {isDark ? (
                <Sun size={18} className="text-amber-300" />
              ) : (
                <Moon size={18} className="text-white" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-lg hover:bg-emerald-700 transition-colors relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white text-gray-800 rounded-lg shadow-2xl z-50 border border-gray-200">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-bold text-lg">सूचनाएं</h3>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-emerald-50' : ''
                              }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm ${!notification.read ? 'font-semibold' : ''}`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between mt-1">
                                  <p className="text-xs text-gray-500">{notification.time}</p>
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Bell size={48} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-sm text-gray-500">कोई सूचना नहीं</p>
                        <p className="text-xs text-gray-400 mt-1">नई सूचनाएं यहां दिखाई देंगी</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <div className="w-8 h-8 bg-white text-emerald-600 rounded-full flex items-center justify-center">
                  <User size={18} />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.name || 'अतिथि उपयोगकर्ता'}</p>
                  <p className="text-xs text-emerald-100">
                    {user ? (user.farmSize ? `${user.farmSize} एकड़` : 'किसान') : 'लॉगिन नहीं किया'}
                  </p>
                </div>
              </button>

              {/* Profile dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-semibold">{user?.name || 'अतिथि उपयोगकर्ता'}</p>
                        <p className="text-sm text-gray-500">{user?.email || 'कोई ईमेल नहीं'}</p>
                        {user && user.farmSize && (
                          <p className="text-xs text-gray-500 mt-1">
                            {user.farmSize} एकड़
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => { setIsProfileOpen(false); window.location.href = '/settings'; }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm flex items-center space-x-2"
                    >
                      <span>⚙️</span><span>प्रोफाइल सेटिंग्स</span>
                    </button>
                    <button
                      onClick={() => { setIsProfileOpen(false); window.location.href = '/settings#farm'; }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm flex items-center space-x-2"
                    >
                      <span>🌾</span><span>मेरे खेत का विवरण</span>
                    </button>
                    <button
                      onClick={() => { setIsProfileOpen(false); window.location.href = '/help'; }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm flex items-center space-x-2"
                    >
                      <span>❓</span><span>मदद और सहायता</span>
                    </button>
                  </div>

                  <div className="p-2 border-t">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded hover:bg-red-50 text-red-600 text-sm font-medium"
                      >
                        <LogOut size={16} />
                        <span>लॉगआउट</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded hover:bg-emerald-50 text-emerald-600 text-sm font-medium"
                      >
                        <User size={16} />
                        <span>लॉगिन / साइन अप</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[68px] left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-xl z-50 transition-all duration-300">
          <nav className="flex flex-col py-2 px-4 max-h-[80vh] overflow-y-auto">
            {mobileNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg my-1 transition-colors ${isActive
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                    }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}