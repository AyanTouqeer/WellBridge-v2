import React, { useState } from 'react';
import { 
  X, 
  User, 
  Award, 
  Flame, 
  Building2, 
  Bell, 
  ChevronRight, 
  Check, 
  Settings, 
  Shield, 
  LogOut,
  Dumbbell
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onUpdateUserName: (name: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userName,
  onUpdateUserName,
}) => {
  const [notifyLowCrowd, setNotifyLowCrowd] = useState<boolean>(true);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(userName);

  if (!isOpen) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateUserName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            User Profile
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close profile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-2 py-1 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-28 focus:outline-teal-500"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-2 py-1 bg-teal-600 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {userName}
                  </h4>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400 block">
                Active Member · Universal Pass Holder
              </span>
            </div>
          </div>
        </div>

        {/* Fitness Stats Highlights */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-800/60">
            <div className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
              4
            </div>
            <div className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase">
              Visits This Week
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60">
            <div className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
              12
            </div>
            <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">
              Credits Saved
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200/60 dark:border-cyan-800/60">
            <div className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
              98%
            </div>
            <div className="text-[10px] font-bold text-cyan-700 dark:text-cyan-400 uppercase">
              Crowd Avoidance
            </div>
          </div>
        </div>

        {/* Corporate HR Program Connection (Blueprint revenue model) */}
        <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              Corporate HR Wellness Plan
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Connected via Acme Corp. 20 non-expiring credits refreshed every month.
          </p>
        </div>

        {/* Notification Settings for active athlete on the move */}
        <div className="mt-4 space-y-2">
          <h5 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Live Capacity Alerts
          </h5>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Alert when crowd drops below 50%
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  For your pinned nearby facilities
                </span>
              </div>
            </div>
            <button
              onClick={() => setNotifyLowCrowd(!notifyLowCrowd)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                notifyLowCrowd ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  notifyLowCrowd ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* App details & version */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
          <span>WellBridge Mobile Access · Non-Expiring Universal Pass</span>
        </div>
      </div>
    </div>
  );
};
