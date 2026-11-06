import React from 'react';
import { Map, Wallet, User, QrCode } from 'lucide-react';

export type NavTab = 'map' | 'wallet' | 'qr' | 'profile';

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  walletCredits: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  walletCredits,
}) => {
  return (
    <nav 
      aria-label="Primary mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors shadow-lg"
    >
      <div className="max-w-md md:max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Tab 1: Home/Map */}
        <button
          onClick={() => onTabChange('map')}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center relative transition-colors cursor-pointer ${
            activeTab === 'map'
              ? 'text-teal-600 dark:text-teal-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Home and Map view"
        >
          <Map className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] mt-1 font-medium tracking-tight">Home/Map</span>
          {activeTab === 'map' && (
            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
          )}
        </button>

        {/* Center Quick Action: Universal QR Check-in (Prominent Action from Blueprint) */}
        <div className="flex-1 flex justify-center -mt-5">
          <button
            onClick={() => onTabChange('qr')}
            aria-label="Open Universal QR Check-in"
            className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-lg shadow-teal-500/25 flex flex-col items-center justify-center transition-transform active:scale-95 hover:scale-105 border-2 border-white dark:border-slate-900 cursor-pointer"
            title="Scan & Enter Partner Facilities"
          >
            <QrCode className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab 2: Wallet */}
        <button
          onClick={() => onTabChange('wallet')}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center relative transition-colors cursor-pointer ${
            activeTab === 'wallet'
              ? 'text-teal-600 dark:text-teal-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Digital Wallet"
        >
          <div className="relative">
            <Wallet className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[9px] font-extrabold px-1 rounded-full tabular-nums">
              {walletCredits}
            </span>
          </div>
          <span className="text-[11px] mt-1 font-medium tracking-tight">Wallet</span>
          {activeTab === 'wallet' && (
            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
          )}
        </button>

        {/* Tab 3: Profile */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex-1 min-h-[48px] flex flex-col items-center justify-center relative transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? 'text-teal-600 dark:text-teal-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
          aria-label="Profile"
        >
          <User className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[11px] mt-1 font-medium tracking-tight">Profile</span>
          {activeTab === 'profile' && (
            <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
          )}
        </button>
      </div>
    </nav>
  );
};
