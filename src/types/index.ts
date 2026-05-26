export interface TaxLot {
  id: string;
  holdingId: string;
  acquisitionDate: string;
  quantity: number;
  costBasisPrice: number;
  currentPrice: number;
  unrealizedGainLoss: number;
  isShortTerm: boolean; // Purchased less than 365 days ago (under US tax rules)
}

export interface Holding {
  id: string;
  ticker: string;
  name: string;
  assetType: 'crypto' | 'stock' | 'etf';
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  totalCostBasis: number;
  totalValue: number;
  unrealizedGainLoss: number;
  unrealizedGainLossPercentage: number;
  lots: TaxLot[];
}

export interface Transaction {
  id: string;
  ticker: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: string;
  fee?: number;
}

export interface HarvestingRecommendation {
  id: string;
  holdingId: string;
  ticker: string;
  name: string;
  lotsToHarvest: {
    lotId: string;
    quantityToSell: number;
    realizableLoss: number;
  }[];
  potentialTaxSavings: number;
  washSaleRisk: {
    hasRisk: boolean;
    reason?: string;
    restrictedUntil?: string;
  };
}

export interface PortfolioSummary {
  totalValue: number;
  totalCostBasis: number;
  totalUnrealizedGains: number;
  totalUnrealizedLosses: number;
  netUnrealizedGainLoss: number;
  harvestableLosses: number;
  estimatedTaxSavings: number;
}
