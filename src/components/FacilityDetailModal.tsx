import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Sparkles, 
  ArrowRight, 
  QrCode, 
  Navigation2, 
  Dumbbell, 
  Flame, 
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Facility } from '../types';

interface FacilityDetailModalProps {
  facility: Facility | null;
  isOpen: boolean;
  onClose: () => void;
  onQuickCheckIn: (facility: Facility) => void;
  onSelectAlternative: (facilityId: string) => void;
  allFacilities: Facility[];
}

export const FacilityDetailModal: React.FC<FacilityDetailModalProps> = ({
  facility,
  isOpen,
  onClose,
  onQuickCheckIn,
  onSelectAlternative,
  allFacilities,
}) => {
  if (!isOpen || !facility) return null;

  const IconComponent =
    facility.type === 'gym'
      ? Dumbbell
      : facility.type === 'boxing'
      ? Flame
      : Activity;

  const alternativeFacility = facility.aiPrediction.suggestedAlternativeId
    ? allFacilities.find((f) => f.id === facility.aiPrediction.suggestedAlternativeId)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <IconComponent className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">
                {facility.typeLabel}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                {facility.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Location & Rating Strip */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400 py-2 border-y border-slate-100 dark:border-slate-800/80">
          <span className="flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {facility.address} ({facility.distance})
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {facility.rating} ({facility.reviewCount} reviews)
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {facility.openHours}
          </span>
        </div>

        {/* LIVE CAPACITY PROMINENT SECTION */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 tracking-wider block">
                Live Capacity Telemetry
              </span>
              <span className={`text-base font-extrabold tracking-tight ${
                facility.capacityStatus === 'crowded'
                  ? 'text-rose-600 dark:text-rose-400'
                  : facility.capacityStatus === 'moderate'
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}>
                {facility.capacityLabel}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">
                {facility.currentOccupancy}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums font-semibold">
                /{facility.maxCapacity} cap
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                facility.capacityStatus === 'crowded'
                  ? 'bg-rose-500'
                  : facility.capacityStatus === 'moderate'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
              style={{ width: `${facility.capacityPercentage}%` }}
            />
          </div>

          <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {facility.capacityMessage}
          </p>
        </div>

        {/* AI Peak Hour Prediction & Alternative Routing (Blueprint Feature 4) */}
        <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-teal-50/70 to-cyan-50/70 dark:from-teal-950/30 dark:to-cyan-950/30 border border-teal-200/70 dark:border-teal-800/60 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-teal-800 dark:text-teal-300 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>AI Capacity Insight & Peak Forecast</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {facility.aiPrediction.insight} (Typical peak: {facility.aiPrediction.peakHours})
          </p>

          {/* If facility is crowded, recommend the alternative facility */}
          {alternativeFacility && (
            <div className="mt-3 pt-2.5 border-t border-teal-200/60 dark:border-teal-800/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                  Suggested Less-Crowded Route:
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {alternativeFacility.name} ({alternativeFacility.capacityLabel})
                </span>
              </div>
              <button
                onClick={() => {
                  onSelectAlternative(alternativeFacility.id);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Switch</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Amenities & Equipment List */}
        <div className="mt-4">
          <h4 className="text-xs font-extrabold uppercase text-slate-900 dark:text-white tracking-wider mb-2">
            Facility Features & Equipment
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {facility.amenities.map((item, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onQuickCheckIn(facility);
            }}
            className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>Universal Check-In ({facility.creditsRequired} Credit)</span>
          </button>

          <button
            onClick={() => {
              window.open(
                `https://maps.google.com/?q=${encodeURIComponent(facility.name + ' ' + facility.address)}`,
                '_blank'
              );
            }}
            className="min-h-[44px] px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Open in Maps"
          >
            <Navigation2 className="w-4 h-4" />
            <span>Directions</span>
          </button>
        </div>
      </div>
    </div>
  );
};
