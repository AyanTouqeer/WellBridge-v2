import React, { useState, useEffect } from 'react';
import { X, QrCode, ShieldCheck, Check, Clock, Sparkles } from 'lucide-react';
import { Facility, WalletInfo } from '../types';

interface UniversalQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: Facility;
  wallet: WalletInfo;
  onConfirmCheckIn: (facilityId: string, credits: number) => void;
}

export const UniversalQRModal: React.FC<UniversalQRModalProps> = ({
  isOpen,
  onClose,
  facility,
  wallet,
  onConfirmCheckIn,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(59);
  const [hasScanned, setHasScanned] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setHasScanned(false);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setHasScanned(true);
    onConfirmCheckIn(facility.id, facility.creditsRequired);
    setTimeout(() => {
      onClose();
      setHasScanned(false);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Universal QR Pass
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close pass"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
          {facility.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Hold this pass up to the front desk scanner for entry
        </p>

        {/* QR Code Container with simulated SVG QR grid */}
        <div className="mt-5 relative p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 inline-block shadow-inner">
          {hasScanned ? (
            <div className="w-52 h-52 flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg mb-2 animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <span className="text-base font-extrabold">Access Granted!</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-300">Enjoy your workout</span>
            </div>
          ) : (
            <div className="relative w-52 h-52 bg-white p-3 rounded-xl shadow-xs flex flex-col items-center justify-center">
              {/* Stylized QR Code Visual */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                {/* 3 Corner Markers */}
                <rect x="5" y="5" width="26" height="26" rx="4" fill="currentColor" />
                <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="13" width="10" height="10" rx="2" fill="currentColor" />

                <rect x="69" y="5" width="26" height="26" rx="4" fill="currentColor" />
                <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                <rect x="77" y="13" width="10" height="10" rx="2" fill="currentColor" />

                <rect x="5" y="69" width="26" height="26" rx="4" fill="currentColor" />
                <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                <rect x="13" y="77" width="10" height="10" rx="2" fill="currentColor" />

                {/* Randomized data blocks */}
                <rect x="36" y="8" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="46" y="8" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="56" y="8" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="36" y="18" width="16" height="6" rx="1" fill="currentColor" />
                <rect x="56" y="24" width="6" height="12" rx="1" fill="currentColor" />
                <rect x="8" y="36" width="12" height="6" rx="1" fill="currentColor" />
                <rect x="24" y="36" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="36" y="36" width="8" height="8" rx="1" fill="#0D9488" />
                <rect x="48" y="36" width="8" height="8" rx="1" fill="#0D9488" />
                <rect x="60" y="36" width="14" height="6" rx="1" fill="currentColor" />
                <rect x="80" y="36" width="14" height="6" rx="1" fill="currentColor" />

                <rect x="8" y="48" width="8" height="8" rx="1" fill="currentColor" />
                <rect x="22" y="48" width="10" height="6" rx="1" fill="currentColor" />
                <rect x="36" y="48" width="8" height="8" rx="1" fill="#0D9488" />
                <rect x="48" y="48" width="8" height="8" rx="1" fill="#0D9488" />
                <rect x="68" y="48" width="6" height="12" rx="1" fill="currentColor" />
                <rect x="80" y="48" width="8" height="6" rx="1" fill="currentColor" />

                <rect x="36" y="60" width="14" height="6" rx="1" fill="currentColor" />
                <rect x="56" y="60" width="8" height="8" rx="1" fill="currentColor" />
                <rect x="70" y="66" width="12" height="6" rx="1" fill="currentColor" />
                <rect x="86" y="60" width="8" height="8" rx="1" fill="currentColor" />

                <rect x="36" y="74" width="6" height="14" rx="1" fill="currentColor" />
                <rect x="48" y="74" width="16" height="6" rx="1" fill="currentColor" />
                <rect x="70" y="78" width="8" height="12" rx="1" fill="currentColor" />
                <rect x="84" y="78" width="10" height="6" rx="1" fill="currentColor" />
              </svg>

              {/* Animated scan bar */}
              <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent animate-pulse shadow-sm" style={{ top: '48%' }} />
            </div>
          )}

          {/* Dynamic refresh countdown */}
          <div className="mt-2.5 flex items-center justify-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Refreshes dynamically in <strong className="text-slate-800 dark:text-slate-200 tabular-nums">{secondsLeft}s</strong></span>
          </div>
        </div>

        {/* Deduction Summary */}
        <div className="mt-4 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs flex items-center justify-between">
          <div className="text-left">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">
              Check-in Cost
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white text-sm">
              {facility.creditsRequired} Credit
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">
              Remaining Balance
            </span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm tabular-nums">
              {wallet.balanceCredits - facility.creditsRequired} Credits
            </span>
          </div>
        </div>

        {/* Tap to simulate scan button */}
        <button
          onClick={handleSimulateScan}
          disabled={hasScanned}
          className="mt-4 w-full h-12 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
        >
          <QrCode className="w-4 h-4" />
          <span>{hasScanned ? 'Scan Verified...' : 'Simulate Front-Desk Scan'}</span>
        </button>
      </div>
    </div>
  );
};
