export type FacilityType = 'gym' | 'boxing' | 'calisthenics';

export interface Facility {
  id: string;
  name: string;
  type: FacilityType;
  typeLabel: string;
  address: string;
  distance: string;
  distanceMinutes: string;
  capacityPercentage: number;
  capacityStatus: 'open' | 'moderate' | 'crowded';
  capacityLabel: string;
  capacityMessage: string;
  creditsRequired: number;
  openHours: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  equipmentHighlights: string[];
  currentOccupancy: number;
  maxCapacity: number;
  pinCoordinates: { x: number; y: number }; // percentage on map
  aiPrediction: {
    peakHours: string;
    trend: 'increasing' | 'stable' | 'decreasing';
    suggestedAlternativeId?: string;
    insight: string;
  };
}

export interface WalletInfo {
  balanceCredits: number;
  equivalentUSD: number;
  corporateAllowanceCredits: number;
  expiresInDays: null; // Non-expiring indicator
  recentTransactions: {
    id: string;
    date: string;
    facilityName: string;
    creditsUsed: number;
    type: 'check_in' | 'top_up' | 'corporate_grant';
  }[];
}
