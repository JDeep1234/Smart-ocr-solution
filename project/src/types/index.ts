export interface ProductAnalysis {
  brand: string;
  expiryDate: string | null;
  confidence: number;
}

export interface FreshnessAnalysis {
  freshnessIndex: number;
  estimatedDays: number;
  confidence: number;
}