/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InteractiveMap } from './components/InteractiveMap';
import { FacilityCarousel } from './components/FacilityCarousel';
import { BottomNavBar, NavTab } from './components/BottomNavBar';
import { UniversalQRModal } from './components/UniversalQRModal';
import { WalletModal } from './components/WalletModal';
import { FacilityDetailModal } from './components/FacilityDetailModal';
import { ProfileModal } from './components/ProfileModal';
import { INITIAL_FACILITIES, INITIAL_WALLET } from './data/mockData';
import { Facility, WalletInfo } from './types';
import { 
  Smartphone, 
  Monitor, 
  Sparkles, 
  MapPin, 
  Flame, 
  ShieldCheck, 
  Compass,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function App() {
  const [userName, setUserName] = useState<string>('User');
  const [facilities, setFacilities] = useState<Facility[]>(INITIAL_FACILITIES);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>(INITIAL_FACILITIES[0].id);
  const [wallet, setWallet] = useState<WalletInfo>(INITIAL_WALLET);
  const [activeTab, setActiveTab] = useState<NavTab>('map');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Theme state: defaults to dark for high contrast outdoor or sleek fitness aesthetic
  const [isDark, setIsDark] = useState<boolean>(true);

  // Device view mode for desktop preview: 'mobile' frame or 'responsive' full
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');

  // Modals
  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);
  const [isQROpen, setIsQROpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [detailFacility, setDetailFacility] = useState<Facility | null>(null);

  // Selected facility object
  const selectedFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Handle Tab navigation
  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'wallet') {
      setIsWalletOpen(true);
    } else if (tab === 'qr') {
      setIsQROpen(true);
    } else if (tab === 'profile') {
      setIsProfileOpen(true);
    }
  };

  // Check in action
  const handleCheckIn = (facility: Facility) => {
    setSelectedFacilityId(facility.id);
    setIsQROpen(true);
  };

  const handleConfirmCheckIn = (facilityId: string, credits: number) => {
    const targetFacility = facilities.find((f) => f.id === facilityId);
    if (!targetFacility) return;

    // Deduct credits & add to transaction log
    setWallet((prev) => ({
      ...prev,
      balanceCredits: Math.max(0, prev.balanceCredits - credits),
      recentTransactions: [
        {
          id: `tx-${Date.now()}`,
          date: 'Just now',
          facilityName: targetFacility.name,
          creditsUsed: -credits,
          type: 'check_in',
        },
        ...prev.recentTransactions,
      ],
    }));

    // Update occupancy count
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === facilityId
          ? {
              ...f,
              currentOccupancy: Math.min(f.maxCapacity, f.currentOccupancy + 1),
              capacityPercentage: Math.min(
                100,
                Math.round(((f.currentOccupancy + 1) / f.maxCapacity) * 100)
              ),
            }
          : f
      )
    );
  };

  // Add credits top-up
  const handleAddCredits = (amount: number, cost: number) => {
    setWallet((prev) => ({
      ...prev,
      balanceCredits: prev.balanceCredits + amount,
      recentTransactions: [
        {
          id: `tx-${Date.now()}`,
          date: 'Just now',
          facilityName: `Credit Pack Purchase (+${amount} Credits)`,
          creditsUsed: amount,
          type: 'top_up',
        },
        ...prev.recentTransactions,
      ],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start antialiased selection:bg-teal-500 selection:text-white">
      {/* Desktop Simulation Banner / Mode Switcher */}
      <aside 
        aria-label="Simulation toolbar"
        className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-400 z-50"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span className="font-bold text-white tracking-tight">WellBridge</span>
          <span className="hidden sm:inline text-slate-500">·</span>
          <span className="hidden sm:inline">Live Capacity & Discovery Map</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline text-[11px] text-slate-500">Device Frame:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile Device Preview"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile View</span>
            </button>
            <button
              onClick={() => setViewMode('responsive')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                viewMode === 'responsive'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Full Responsive View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Responsive</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main App Container */}
      <main
        className={`w-full transition-all duration-300 pb-20 ${
          viewMode === 'mobile'
            ? 'max-w-md my-0 sm:my-4 sm:rounded-[40px] shadow-2xl border-0 sm:border-8 sm:border-slate-800 overflow-hidden bg-slate-50 dark:bg-slate-950 min-h-[850px] relative'
            : 'max-w-6xl mx-auto px-4 py-4 bg-slate-50 dark:bg-slate-950 min-h-screen'
        }`}
      >
        {/* Top Header with Greeting ("Hi, User!") and Digital Wallet Balance */}
        <Header
          userName={userName}
          wallet={wallet}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onOpenWallet={() => setIsWalletOpen(true)}
        />

        {/* Dynamic Action / Capacity Alert Banner */}
        <div className="px-4 pt-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-emerald-500/10 dark:from-teal-950/40 dark:via-cyan-950/40 dark:to-emerald-950/40 border border-teal-200/80 dark:border-teal-800/60 flex items-center justify-between text-xs text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Compass className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-slate-900 dark:text-white block truncate">
                  3 Partner Facilities Near You
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                  Skyline Calisthenics is wide open (26% capacity)
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedFacilityId('skyline-calisthenics');
              }}
              className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-[11px] shrink-0 transition-colors cursor-pointer"
            >
              Jump to Park
            </button>
          </div>
        </div>

        {/* Main Body: Interactive Map Simulation & Pins */}
        <div className="px-4 pt-3">
          <InteractiveMap
            facilities={facilities}
            selectedFacilityId={selectedFacilityId}
            onSelectFacility={(id) => setSelectedFacilityId(id)}
            onOpenDetails={(facility) => setDetailFacility(facility)}
          />
        </div>

        {/* Below Map: Horizontal Scrollable List of 3 Facilities as Cards */}
        <div className="px-4">
          <FacilityCarousel
            facilities={facilities}
            selectedFacilityId={selectedFacilityId}
            onSelectFacility={(id) => setSelectedFacilityId(id)}
            onOpenDetails={(facility) => setDetailFacility(facility)}
            onQuickCheckIn={(facility) => handleCheckIn(facility)}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Value Prop Quick Proof / Micro info for busy athlete */}
        <div className="px-4 mt-5">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Universal Non-Expiring Credits
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Pay only when you workout. Never lose your balance.
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsWalletOpen(true)}
              className="text-[11px] font-extrabold text-teal-600 dark:text-teal-400 hover:underline shrink-0 cursor-pointer"
            >
              Details &gt;
            </button>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          walletCredits={wallet.balanceCredits}
        />
      </main>

      {/* Modals & Sheets */}
      {/* 1. Universal QR Check-In Modal */}
      <UniversalQRModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        facility={selectedFacility}
        wallet={wallet}
        onConfirmCheckIn={handleConfirmCheckIn}
      />

      {/* 2. Digital Wallet Details Modal */}
      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        wallet={wallet}
        onAddCredits={handleAddCredits}
      />

      {/* 3. Facility Detail & AI Routing Modal */}
      <FacilityDetailModal
        facility={detailFacility}
        isOpen={!!detailFacility}
        onClose={() => setDetailFacility(null)}
        onQuickCheckIn={handleCheckIn}
        onSelectAlternative={(altId) => setSelectedFacilityId(altId)}
        allFacilities={facilities}
      />

      {/* 4. User Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userName={userName}
        onUpdateUserName={setUserName}
      />
    </div>
  );
}
