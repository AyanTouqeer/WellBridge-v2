import React from 'react';
import { Sparkles, Sun, Moon, CreditCard, ChevronRight } from 'lucide-react';
import { WalletInfo } from '../types';

interface HeaderProps {
  userName?: string;
  wallet: WalletInfo;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenWallet: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = 'User',
  wallet,
  isDark,
  onToggleTheme,
  onOpenWallet,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Brand & Greeting */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm p-1.5 overflow-hidden">
              <img
                src="/assets/aistudio/WellBridge_Logo_-_Edited_d3c380ae.png"
                alt="WellBridge Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if asset path is relative in certain environments
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate">
                  Hi, {userName}!
                </h1>
                <span className="hidden sm:inline-flex text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800/60 px-1.5 py-0.5 rounded">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Ready to move? Check live crowd levels nearby.
              </p>
            </div>
          </div>

          {/* Digital Wallet Balance & Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Digital Wallet Balance Pill Button */}
            <button
              onClick={onOpenWallet}
              className="group flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-cyan-950/40 border border-emerald-200/90 dark:border-emerald-800/80 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all shadow-xs cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-emerald-500"
              title="Click to view non-expiring credits wallet"
              aria-label="View Digital Wallet Balance"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider leading-none">
                  Digital Wallet
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {wallet.balanceCredits}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                    Credits
                  </span>
                  <span className="hidden md:inline text-[9px] text-slate-400 dark:text-slate-500 font-medium">
                    · Never Expires
                  </span>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* High-Contrast Light / Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle High-Contrast Theme"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition-colors cursor-pointer"
              title={isDark ? "Switch to High-Contrast Sunlight Mode" : "Switch to Evening Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
