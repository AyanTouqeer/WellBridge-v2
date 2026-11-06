import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Facility } from '../types';
import { FacilityCard } from './FacilityCard';

interface FacilityCarouselProps {
  facilities: Facility[];
  selectedFacilityId: string;
  onSelectFacility: (id: string) => void;
  onOpenDetails: (facility: Facility) => void;
  onQuickCheckIn: (facility: Facility) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FacilityCarousel: React.FC<FacilityCarouselProps> = ({
  facilities,
  selectedFacilityId,
  onSelectFacility,
  onOpenDetails,
  onQuickCheckIn,
  activeFilter,
  onFilterChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredFacilities = facilities.filter((f) => {
    if (activeFilter === 'open') return f.capacityStatus !== 'crowded';
    if (activeFilter === 'gym') return f.type === 'gym';
    if (activeFilter === 'combat') return f.type === 'boxing';
    return true;
  });

  return (
    <section className="w-full mt-4 sm:mt-6">
      {/* Header of the list with filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              Nearby Facilities
            </h2>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              {filteredFacilities.length} available
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time crowd levels & instant credit check-in
          </p>
        </div>

        {/* Filter controls & desktop scroll arrows */}
        <div className="flex items-center gap-2">
          {/* Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (3)
            </button>
            <button
              onClick={() => onFilterChange('open')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeFilter === 'open'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Open Spots (2)
            </button>
          </div>

          {/* Desktop Carousel Navigation buttons */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous facility"
              className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next facility"
              className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 px-1 -mx-1 snap-x snap-mandatory scroll-smooth"
      >
        {filteredFacilities.map((facility) => (
          <div key={facility.id} className="snap-start">
            <FacilityCard
              facility={facility}
              isSelected={facility.id === selectedFacilityId}
              onSelect={() => onSelectFacility(facility.id)}
              onOpenDetails={() => onOpenDetails(facility)}
              onQuickCheckIn={() => onQuickCheckIn(facility)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
