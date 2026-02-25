'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Cloud,
  Sprout,
  Bug,
  TrendingUp,
  Calendar,
  DollarSign,
  Store,
  Award,
  Settings,
  HelpCircle,
  Beef,
  Video,
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'होम', icon: Home, href: '/dashboard' },
  { id: 'weather', label: 'मौसम', icon: Cloud, href: '/weather' },
  { id: 'crops', label: 'फसल सुझाव', icon: Sprout, href: '/crops' },
  { id: 'diseases', label: 'रोग पहचान', icon: Bug, href: '/diseases' },
  { id: 'prices', label: 'मंडी भाव', icon: TrendingUp, href: '/prices' },
  { id: 'calendar', label: 'फसल कैलेंडर', icon: Calendar, href: '/calendar' },
  { id: 'expenses', label: 'खर्च ट्रैकर', icon: DollarSign, href: '/expenses' },
  { id: 'livestock', label: 'पशुपालन', icon: Beef, href: '/livestock' },
  { id: 'videos', label: 'वीडियो ट्यूटोरियल', icon: Video, href: '/videos' },
  { id: 'marketplace', label: 'बाजार', icon: Store, href: '/marketplace' },
  { id: 'schemes', label: 'सरकारी योजनाएं', icon: Award, href: '/schemes' },
];

const bottomItems = [
  { id: 'settings', label: 'सेटिंग्स', icon: Settings, href: '/settings' },
  { id: 'help', label: 'मदद और सहायता', icon: HelpCircle, href: '/help' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <nav
      className={`bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'
        }`}
    >
      {/* ─── Hamburger Toggle Button ─── */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'मेनू खोलें' : 'मेनू बंद करें'}
        title={isCollapsed ? 'मेनू खोलें' : 'मेनू बंद करें'}
        className="group flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors duration-200 w-full"
      >
        {/* Animated 3-line hamburger */}
        <div className="relative w-5 h-4 flex flex-col justify-between flex-shrink-0">
          {/* Line 1 */}
          <span
            className={`block h-0.5 bg-gray-600 dark:bg-slate-300 rounded-full transition-all duration-300 origin-center group-hover:bg-emerald-600 ${!isCollapsed ? 'rotate-45 translate-y-[7px]' : ''
              }`}
          />
          {/* Line 2 (middle — hides when open) */}
          <span
            className={`block h-0.5 bg-gray-600 dark:bg-slate-300 rounded-full transition-all duration-300 group-hover:bg-emerald-600 ${!isCollapsed ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              }`}
          />
          {/* Line 3 */}
          <span
            className={`block h-0.5 bg-gray-600 dark:bg-slate-300 rounded-full transition-all duration-300 origin-center group-hover:bg-emerald-600 ${!isCollapsed ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
          />
        </div>

        {/* Label (shown only when expanded) */}
        {!isCollapsed && (
          <span className="text-sm font-medium text-gray-600 dark:text-slate-400 group-hover:text-emerald-600 transition-colors whitespace-nowrap overflow-hidden">
            {isCollapsed ? '' : 'मेनू बंद करें'}
          </span>
        )}
      </button>

      {/* ─── Main Navigation Items ─── */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-6">
          {!isCollapsed && (
            <h2 className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-1">
              मुख्य मेनू
            </h2>
          )}
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    title={item.label}
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${isActive
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-l-4 border-emerald-500'
                      : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                      }`}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 font-medium truncate">{item.label}</span>
                    )}
                    {isActive && !isCollapsed && (
                      <span className="ml-auto w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ─── Bottom Items ─── */}
      <div className="border-t border-gray-200 dark:border-slate-700 pt-4 pb-6">
        <div className="px-3">
          <ul className="space-y-1">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    title={item.label}
                    className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${isActive
                      ? 'bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                      }`}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 font-medium truncate">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Help Info (only when expanded) */}
        {!isCollapsed && (
          <div className="px-3 mt-4">
            <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-lg border border-gray-200 dark:border-slate-700">
              <p className="text-xs text-gray-500 dark:text-slate-400">मदद चाहिए?</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">कॉल करें: 1800-123-4567</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">24/7 उपलब्ध</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}