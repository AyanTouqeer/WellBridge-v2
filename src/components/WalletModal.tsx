import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Building2, 
  History, 
  ArrowDownLeft, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { WalletInfo } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletInfo;
  onAddCredits: (amount: number, cost: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onAddCredits,
}) => {
  const [selectedPack, setSelectedPack] = useState<number>(25);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const topUpPacks = [
    { credits: 10, price: 20, badge: 'Starter' },
    { credits: 25, price: 45, badge: 'Most Popular · Save 10%' },
    { credits: 50, price: 80, badge: 'Best Value · Save 20%' },
  ];

  const handlePurchase = (credits: number, price: number) => {
    onAddCredits(credits, price);
    setSuccessToast(`Successfully added ${credits} non-expiring credits!`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Digital Wallet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Universal access credits
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close wallet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Balance Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider block">
              Available Credits Balance
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-extrabold tracking-tight tabular-nums">
                {wallet.balanceCredits}
              </span>
              <span className="text-sm font-bold text-teal-400">Credits</span>
              <span className="text-xs text-slate-400 tabular-nums">
                (~${(wallet.balanceCredits * 2).toFixed(2)})
              </span>
            </div>

            {/* Non-Expiring Guarantee Pill */}
            <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Non-Expiring · Rollover Guaranteed</span>
            </div>

            {/* Sub-breakdown: Corporate HR Allowance */}
            <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Building2 className="w-3.5 h-3.5 text-teal-400" />
                Corporate HR Allowance:
              </span>
              <span className="font-bold text-white tabular-nums">
                {wallet.corporateAllowanceCredits} Credits
              </span>
            </div>
          </div>
        </div>

        {/* Success Alert Toast */}
        {successToast && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Reload / Top-Up Options */}
        <div className="mt-5">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
            Load More Non-Expiring Credits
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {topUpPacks.map((pack) => (
              <button
                key={pack.credits}
                onClick={() => setSelectedPack(pack.credits)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  selectedPack === pack.credits
                    ? 'border-teal-500 dark:border-teal-400 bg-teal-50/50 dark:bg-teal-950/40 ring-1 ring-teal-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                    +{pack.credits}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    ${pack.price}
                  </div>
                </div>
                <div className="mt-2 text-[9px] font-bold text-teal-700 dark:text-teal-400 leading-tight">
                  {pack.badge.split('·')[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => {
              const pack = topUpPacks.find((p) => p.credits === selectedPack) || topUpPacks[1];
              handlePurchase(pack.credits, pack.price);
            }}
            className="mt-3 w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-transform active:scale-98 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-teal-400 dark:text-teal-600" />
            <span>Load {selectedPack} Credits</span>
          </button>
        </div>

        {/* Recent Ledger History */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-slate-400" />
              Activity Ledger
            </h4>
            <span className="text-[10px] text-slate-400">All locations</span>
          </div>

          <div className="space-y-2">
            {wallet.recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      tx.creditsUsed > 0
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {tx.creditsUsed > 0 ? (
                      <ArrowDownLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white truncate">
                      {tx.facilityName}
                    </p>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      {tx.date}
                    </span>
                  </div>
                </div>

                <span
                  className={`font-extrabold tabular-nums shrink-0 ${
                    tx.creditsUsed > 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tx.creditsUsed > 0 ? `+${tx.creditsUsed}` : tx.creditsUsed} Cr
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
