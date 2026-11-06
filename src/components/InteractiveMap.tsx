import React, { useState } from 'react';
import { 
  Navigation, 
  Plus, 
  Minus, 
  Layers, 
  Flame, 
  Dumbbell, 
  Activity, 
  Compass, 
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { Facility } from '../types';

interface InteractiveMapProps {
  facilities: Facility[];
  selectedFacilityId: string;
  onSelectFacility: (id: string) => void;
  onOpenDetails: (facility: Facility) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  facilities,
  selectedFacilityId,
  onSelectFacility,
  onOpenDetails,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [mapOffset, setMapOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  const selectedFacility = facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  // User location on map coordinate (percentage)
  const userLocation = { x: 48, y: 56 };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.15, 1.45));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.15, 0.85));
  };

  const handleResetLocation = () => {
    setZoomLevel(1);
    setMapOffset({ x: 0, y: 0 });
    onSelectFacility(facilities[0].id);
  };

  const handleRefreshCapacity = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed('Few seconds ago');
    }, 600);
  };

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 shadow-md">
      {/* Map Header Floating Overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        {/* Status indicator */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/90 dark:border-slate-800 shadow-sm text-xs font-medium text-slate-800 dark:text-slate-200">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Capacity Map</span>
          <span className="text-slate-400 dark:text-slate-500 text-[10px]">·</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">{lastRefreshed}</span>
          <button 
            onClick={handleRefreshCapacity}
            className={`ml-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer ${isRefreshing ? 'animate-spin' : ''}`}
            title="Refresh live facility sensor counts"
            aria-label="Refresh live facility capacities"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Heatmap Layer Toggle */}
        <div className="pointer-events-auto flex items-center gap-1.5">
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer border ${
              showHeatmap
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800'
            }`}
            title="Toggle Live Crowd Heatmap"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Heatmap</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Visual Div Container */}
      <div 
        className="relative w-full h-[320px] sm:h-[390px] md:h-[430px] overflow-hidden select-none cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${zoomLevel}) translate(${mapOffset.x}px, ${mapOffset.y}px)`,
        }}
      >
        {/* SVG Street Grid & Geographic Map Simulation */}
        <svg 
          viewBox="0 0 1000 700" 
          className="w-full h-full object-cover pointer-events-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Pattern grid for urban blocks */}
            <pattern id="urbanGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300/40 dark:text-slate-800/60" />
            </pattern>

            {/* Capacity Heatmap Gradients */}
            <radialGradient id="heatGreen" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#10B981" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heatOrange" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heatRed" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#EF4444" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </radialGradient>

            {/* User Location Radar Pulse */}
            <radialGradient id="userRadar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Map Base Canvas */}
          <rect width="1000" height="700" className="fill-slate-100 dark:fill-[#0c1220]" />
          <rect width="1000" height="700" fill="url(#urbanGrid)" />

          {/* Waterfront / Bay Zone (Right side) */}
          <path
            d="M 860 0 C 820 180, 890 340, 840 500 C 800 620, 850 700, 870 700 L 1000 700 L 1000 0 Z"
            className="fill-sky-200/50 dark:fill-sky-950/40"
          />
          <path
            d="M 870 120 Q 920 140 980 130 M 850 320 Q 910 350 970 330 M 840 540 Q 900 560 970 545"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="text-sky-400/40 dark:text-sky-600/30"
            fill="none"
          />
          <text x="910" y="240" className="fill-sky-600/70 dark:fill-sky-400/50 text-[13px] font-semibold tracking-widest uppercase">
            Marina Bay
          </text>

          {/* Green Park / Calisthenics Zone */}
          <path
            d="M 460 450 C 510 440, 680 470, 700 520 C 720 570, 680 660, 520 670 C 440 680, 420 540, 460 450 Z"
            className="fill-emerald-200/50 dark:fill-emerald-950/30"
          />
          <text x="500" y="630" className="fill-emerald-700/70 dark:fill-emerald-400/60 text-[12px] font-semibold tracking-wider">
            Skyline Waterfront Esplanade
          </text>

          {/* Secondary Urban Park */}
          <rect x="180" y="80" width="160" height="110" rx="16" className="fill-emerald-100/60 dark:fill-emerald-950/20" />
          <text x="210" y="140" className="fill-emerald-600/60 dark:fill-emerald-400/40 text-[11px] font-medium">
            Civic Green Park
          </text>

          {/* Major Roads / Arterial Streets */}
          {/* Avenue 1 */}
          <path d="M 0 220 L 1000 220" stroke="currentColor" strokeWidth="22" className="text-white dark:text-slate-800" fill="none" />
          <path d="M 0 220 L 1000 220" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" className="text-amber-400/80 dark:text-amber-500/70" fill="none" />
          <text x="40" y="214" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-semibold tracking-wider uppercase">
            Market Boulevard
          </text>

          {/* Avenue 2 */}
          <path d="M 0 460 L 1000 460" stroke="currentColor" strokeWidth="18" className="text-white dark:text-slate-800" fill="none" />
          <text x="40" y="454" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-semibold tracking-wider uppercase">
            Mission Promenade
          </text>

          {/* North-South Major Arteries */}
          <path d="M 370 0 L 370 700" stroke="currentColor" strokeWidth="20" className="text-white dark:text-slate-800" fill="none" />
          <text x="378" y="50" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-semibold tracking-wider uppercase" transform="rotate(90 378 50)">
            4th Avenue Expressway
          </text>

          <path d="M 720 0 L 720 700" stroke="currentColor" strokeWidth="18" className="text-white dark:text-slate-800" fill="none" />
          <text x="728" y="80" className="fill-slate-400 dark:fill-slate-500 text-[10px] font-semibold tracking-wider uppercase" transform="rotate(90 728 80)">
            Industrial Gateway
          </text>

          {/* Minor Cross Streets */}
          <path d="M 140 0 L 140 700" stroke="currentColor" strokeWidth="9" className="text-white/90 dark:text-slate-800/80" fill="none" />
          <path d="M 540 0 L 540 700" stroke="currentColor" strokeWidth="10" className="text-white/90 dark:text-slate-800/80" fill="none" />
          <path d="M 0 340 L 1000 340" stroke="currentColor" strokeWidth="10" className="text-white/90 dark:text-slate-800/80" fill="none" />
          <path d="M 0 110 L 1000 110" stroke="currentColor" strokeWidth="9" className="text-white/90 dark:text-slate-800/80" fill="none" />
          <path d="M 0 580 L 1000 580" stroke="currentColor" strokeWidth="10" className="text-white/90 dark:text-slate-800/80" fill="none" />

          {/* Diagonal Transit / Bike Trail */}
          <path d="M 60 680 L 850 80" stroke="currentColor" strokeWidth="4" strokeDasharray="6 4" className="text-teal-500/60 dark:text-teal-400/50" fill="none" />
          <text x="210" y="540" className="fill-teal-600/80 dark:fill-teal-400/80 text-[10px] font-bold tracking-wider" transform="rotate(-38 210 540)">
            WELLBRIDGE GREENWAY BIKE PATH
          </text>

          {/* Optional Heatmap overlays */}
          {showHeatmap && (
            <g className="transition-opacity duration-300">
              {/* IronForge moderate heatmap */}
              <circle cx="380" cy="308" r="95" fill="url(#heatOrange)" />
              {/* Apex boxing high crowded heatmap */}
              <circle cx="740" cy="224" r="115" fill="url(#heatRed)" />
              {/* Skyline calisthenics low capacity heatmap */}
              <circle cx="550" cy="504" r="85" fill="url(#heatGreen)" />
            </g>
          )}

          {/* Active Navigation Route to selected facility */}
          <g>
            <path
              d={`M ${userLocation.x * 10} ${userLocation.y * 7} L ${selectedFacility.pinCoordinates.x * 10} ${selectedFacility.pinCoordinates.y * 7}`}
              stroke="#0D9488"
              strokeWidth="3.5"
              strokeDasharray="6 6"
              className="animate-pulse"
              fill="none"
            />
            {/* Route distance label */}
            <rect
              x={(userLocation.x * 10 + selectedFacility.pinCoordinates.x * 10) / 2 - 40}
              y={(userLocation.y * 7 + selectedFacility.pinCoordinates.y * 7) / 2 - 14}
              width="80"
              height="22"
              rx="11"
              className="fill-slate-900/90 dark:fill-white/95"
            />
            <text
              x={(userLocation.x * 10 + selectedFacility.pinCoordinates.x * 10) / 2}
              y={(userLocation.y * 7 + selectedFacility.pinCoordinates.y * 7) / 2 + 1}
              textAnchor="middle"
              className="fill-white dark:fill-slate-900 text-[11px] font-bold tracking-tight"
            >
              {selectedFacility.distance} ({selectedFacility.distanceMinutes.split(' ')[0]}m)
            </text>
          </g>

          {/* User Location Radar Ping */}
          <g transform={`translate(${userLocation.x * 10}, ${userLocation.y * 7})`}>
            <circle cx="0" cy="0" r="28" fill="url(#userRadar)" className="animate-ping" />
            <circle cx="0" cy="0" r="16" className="fill-sky-500/30 dark:fill-sky-400/30" />
            <circle cx="0" cy="0" r="8" className="fill-sky-600 dark:fill-sky-400 stroke-2 stroke-white dark:stroke-slate-950 shadow-md" />
            <text x="0" y="24" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 text-[11px] font-bold drop-shadow-xs">
              You (Here)
            </text>
          </g>
        </svg>

        {/* Overlay Interactive Pins (HTML for crisp touch targets and rich tooltips) */}
        {facilities.map((facility) => {
          const isSelected = facility.id === selectedFacilityId;
          const statusColors = {
            open: {
              bg: 'bg-emerald-500 dark:bg-emerald-400',
              text: 'text-emerald-700 dark:text-emerald-300',
              border: 'border-emerald-500',
              badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
              glow: 'shadow-emerald-500/40',
            },
            moderate: {
              bg: 'bg-amber-500 dark:bg-amber-400',
              text: 'text-amber-700 dark:text-amber-300',
              border: 'border-amber-500',
              badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
              glow: 'shadow-amber-500/40',
            },
            crowded: {
              bg: 'bg-rose-500 dark:bg-rose-400',
              text: 'text-rose-700 dark:text-rose-300',
              border: 'border-rose-500',
              badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
              glow: 'shadow-rose-500/40',
            },
          }[facility.capacityStatus];

          const IconComponent =
            facility.type === 'gym'
              ? Dumbbell
              : facility.type === 'boxing'
              ? Flame
              : Activity;

          return (
            <div
              key={facility.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${facility.pinCoordinates.x}%`,
                top: `${facility.pinCoordinates.y}%`,
              }}
              onClick={() => onSelectFacility(facility.id)}
            >
              {/* Selected Halo Pulse */}
              {isSelected && (
                <div
                  className={`absolute -inset-3 rounded-full opacity-60 animate-ping ${statusColors.bg}`}
                />
              )}

              {/* Pin Container */}
              <div
                className={`relative flex flex-col items-center transition-transform duration-200 ${
                  isSelected ? 'scale-110 -translate-y-1' : 'hover:scale-105'
                }`}
              >
                {/* Floating mini capacity pill right above pin */}
                <div
                  className={`mb-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold tracking-tight shadow-md flex items-center gap-1 border border-white/80 dark:border-slate-800 whitespace-nowrap ${
                    statusColors.badge
                  } ${isSelected ? 'ring-2 ring-slate-900 dark:ring-white ring-offset-1' : ''}`}
                >
                  <span>{facility.capacityPercentage}% Full</span>
                  <span className="text-[10px] opacity-75">· {facility.distance}</span>
                </div>

                {/* Pin Head */}
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-slate-900 transition-all ${
                    statusColors.bg
                  } ${statusColors.glow} ${
                    isSelected ? 'ring-3 ring-slate-900 dark:ring-white scale-105' : ''
                  }`}
                >
                  <IconComponent className="w-5 h-5 text-white stroke-[2.5]" />
                </div>

                {/* Pin Tip */}
                <div
                  className={`w-2.5 h-2.5 rotate-45 -mt-1 border-r-2 border-b-2 border-white dark:border-slate-900 ${statusColors.bg}`}
                />
              </div>

              {/* Expanded Card on Map when Selected */}
              {isSelected && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 sm:w-64 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 pointer-events-auto z-30 transition-all animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails(facility);
                  }}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                      {facility.typeLabel}
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                      {facility.creditsRequired} Credit
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {facility.name}
                  </h4>

                  {/* Prominent Live Capacity Indicator in pin popover */}
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {facility.capacityLabel}
                      </span>
                      <span className="font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                        {facility.currentOccupancy}/{facility.maxCapacity}
                      </span>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
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
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">
                      {facility.distance} · {facility.distanceMinutes}
                    </span>
                    <span className="font-bold text-teal-600 dark:text-teal-400 group-hover:underline">
                      View Access &gt;
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Bottom-Right Map Controls */}
      <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          aria-label="Zoom in map"
          className="w-9 h-9 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-center cursor-pointer transition-colors active:scale-95"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          aria-label="Zoom out map"
          className="w-9 h-9 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-center cursor-pointer transition-colors active:scale-95"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetLocation}
          aria-label="Recenter on my location"
          className="w-9 h-9 rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-sm flex items-center justify-center cursor-pointer transition-colors active:scale-95"
          title="Recenter on My Location"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Bottom-Left Legend */}
      <div className="absolute bottom-3 left-3 z-20 hidden sm:flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 shadow-xs">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>&lt;50% Wide Open</span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">·</span>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>50-80% Steady</span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">·</span>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>&gt;80% Crowded</span>
        </div>
      </div>
    </div>
  );
};
