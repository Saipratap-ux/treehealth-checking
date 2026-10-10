import React from 'react';
import {
  Home,
  Camera,
  Sprout,
  Calendar,
  History,
  Bell,
  Settings,
  Download,
  WifiOff
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  pendingTasksCount: number;
  isOnline: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  pendingTasksCount,
  isOnline,
}) => {
  const { isInstallable, install } = usePWAInstall();
  const { t } = useLanguage();

  return (
    <>
      {/* Offline Status Toast */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 sticky top-0 z-50">
          <WifiOff className="w-3.5 h-3.5" />
          <span>{t.offlineNotice}</span>
        </div>
      )}

      {/* Desktop & Tablet Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <div
            onClick={() => onTabChange('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md shadow-emerald-700/20 group-hover:scale-105 transition shrink-0 border border-emerald-500/30 bg-white">
              <img
                src="/logo.png"
                alt="TreeHealthAI Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg text-emerald-950 tracking-tight">
                  <span className="text-emerald-700 font-black">Tree</span>Health<span className="text-blue-600">AI</span>
                </span>
                <span className="text-[9px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded-md hidden lg:inline-block">
                  By Kinjal Bariha
                </span>
              </div>
              <p className="text-[10px] text-emerald-800 hidden sm:block -mt-0.5 font-semibold">
                Healthy Trees • Greener Tomorrow
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onTabChange('home')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'home' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {t.dashboard}
            </button>

            <button
              onClick={() => onTabChange('scan')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'scan' ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              {t.scanPlant}
            </button>

            <button
              onClick={() => onTabChange('plants')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'plants' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {t.myPlants}
            </button>

            <button
              onClick={() => onTabChange('planner')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'planner' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {t.careAndSoil}
            </button>

            <button
              onClick={() => onTabChange('history')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'history' ? 'bg-emerald-50 text-emerald-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {t.scanHistory}
            </button>
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2">
            {/* Language Selector Dropdown */}
            <LanguageSelector variant="dropdown" />

            {isInstallable && (
              <button
                onClick={install}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                {t.installApp}
              </button>
            )}

            <button
              onClick={() => onTabChange('notifications')}
              aria-label="Care Alerts"
              className={`p-2 rounded-xl transition relative ${
                activeTab === 'notifications' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bell className="w-5 h-5" />
              {pendingTasksCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {pendingTasksCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onTabChange('settings')}
              aria-label="Settings"
              className={`p-2 rounded-xl transition ${
                activeTab === 'settings' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-1.5 shadow-2xl safe-area-pb">
        <div className="flex items-center justify-around">
          <button
            onClick={() => onTabChange('home')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
              activeTab === 'home' ? 'text-emerald-700 font-bold' : 'text-gray-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">{t.dashboard}</span>
          </button>

          <button
            onClick={() => onTabChange('plants')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
              activeTab === 'plants' ? 'text-emerald-700 font-bold' : 'text-gray-500'
            }`}
          >
            <Sprout className="w-5 h-5" />
            <span className="text-[10px]">{t.myPlants}</span>
          </button>

          {/* Elevated Scan Button */}
          <button
            onClick={() => onTabChange('scan')}
            className="flex flex-col items-center -mt-5 group"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center shadow-lg shadow-emerald-700/30 group-active:scale-95 transition border-4 border-white">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold text-emerald-800 mt-0.5">{t.scanPlant}</span>
          </button>

          <button
            onClick={() => onTabChange('planner')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
              activeTab === 'planner' ? 'text-emerald-700 font-bold' : 'text-gray-500'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px]">{t.careAndSoil}</span>
          </button>

          <button
            onClick={() => onTabChange('notifications')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition relative ${
              activeTab === 'notifications' ? 'text-emerald-700 font-bold' : 'text-gray-500'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-[10px]">{t.alerts}</span>
            {pendingTasksCount > 0 && (
              <span className="absolute top-0.5 right-2 w-3.5 h-3.5 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {pendingTasksCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
