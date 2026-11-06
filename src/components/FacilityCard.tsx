import React from 'react';
import { 
  Dumbbell, 
  Flame, 
  Activity, 
  MapPin, 
  Clock, 
  QrCode, 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown, 
  Sparkles,
  Users
} from 'lucide-react';
import { Facility } from '../types';

interface FacilityCardProps {
  facility: Facility;
  isSelected: boolean;
  onSelect: () => void;
  onOpenDetails: () => void;
  onQuickCheckIn: () => void;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({
  facility,
  isSelected,
  onSelect,
  onOpenDetails,
  onQuickCheckIn,
}) => {
  const IconComponent =
    facility.type === 'gym'
      ? Dumbbell
      : facility.type === 'boxing'
      ? Flame
      : Activity;

  // Visual cues based on capacity status
  const capacityTheme = {
    open: {
      barColor: 'bg-emerald-500 dark:bg-emerald-400',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      bgTint: 'bg-emerald-50/70 dark:bg-emerald-950/30',
      borderColor: 'border-emerald-200 dark:border-emerald-800/60',
      badgeBg: 'bg-emerald-600 text-white',
      tag: 'Wide Open',
    },
    moderate: {
      barColor: 'bg-amber-500 dark:bg-amber-400',
      textColor: 'text-amber-800 dark:text-amber-300',
      bgTint: 'bg-amber-50/70 dark:bg-amber-950/30',
      borderColor: 'border-amber-200 dark:border-amber-800/60',
      badgeBg: 'bg-amber-600 text-white',
      tag: 'Good to Go',
    },
    crowded: {
      barColor: 'bg-rose-500 dark:bg-rose-400',
      textColor: 'text-rose-800 dark:text-rose-300',
      bgTint: 'bg-rose-50/70 dark:bg-rose-950/30',
      borderColor: 'border-rose-200 dark:border-rose-800/60',
      badgeBg: 'bg-rose-600 text-white',
      tag: 'Near Capacity',
    },
  }[facility.capacityStatus];

  return (
    <div
      onClick={onSelect}
      className={`relative shrink-0 w-[84vw] sm:w-[340px] md:w-[360px] p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between ${
        isSelected
          ? 'border-teal-500 dark:border-teal-400 shadow-teal-500/10 ring-2 ring-teal-500/20'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div>
        {/* Top Header Row: Category, Distance & Credit Cost */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-bold">
              <IconComponent className="w-3.5 h-3.5" />
              {facility.typeLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3" />
              {facility.distance}
            </span>
          </div>

          <span className="inline-flex items-center text-xs font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            {facility.creditsRequired} Credit
          </span>
        </div>

        {/* Facility Name */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
          {facility.name}
        </h3>

        {/* PROMINENT LIVE CAPACITY INDICATOR */}
        <div
          className={`mt-3 p-3 rounded-xl sm:rounded-2xl border ${capacityTheme.borderColor} ${capacityTheme.bgTint}`}
        >
          <div className="flex items-baseline justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <Users className={`w-4 h-4 ${capacityTheme.textColor}`} />
              <span className={`text-xs sm:text-sm font-extrabold tracking-tight ${capacityTheme.textColor}`}>
                {facility.capacityLabel}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 tabular-nums">
              {facility.currentOccupancy}/{facility.maxCapacity} active
            </span>
          </div>

          {/* High-Contrast Capacity Progress Meter */}
          <div className="w-full h-2.5 bg-white/80 dark:bg-slate-800/80 rounded-full overflow-hidden border border-slate-200/60 dark:border-slate-700/60 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${capacityTheme.barColor}`}
              style={{ width: `${facility.capacityPercentage}%` }}
            />
          </div>

          {/* Micro message for active users */}
          <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium line-clamp-1">
            {facility.capacityMessage}
          </p>
        </div>

        {/* Amenities & AI Trend Strip */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1 truncate text-[11px]">
            <Clock className="w-3 h-3 shrink-0" />
            <span className="truncate">{facility.distanceMinutes}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{facility.equipmentHighlights[0]}</span>
          </div>

          {facility.aiPrediction.trend === 'increasing' ? (
            <span className="flex items-center gap-0.5 text-[10px] text-amber-600 dark:text-amber-400 font-semibold shrink-0">
              <TrendingUp className="w-3 h-3" />
              Peak soon
            </span>
          ) : (
            <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
              <TrendingDown className="w-3 h-3" />
              Open window
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickCheckIn();
          }}
          className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-transform active:scale-98 shadow-sm cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>Check In ({facility.creditsRequired} Cr)</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails();
          }}
          aria-label={`View details for ${facility.name}`}
          className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
          title="Facility details & AI routing"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
