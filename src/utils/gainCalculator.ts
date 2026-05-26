import { TaxLot, Holding, Transaction } from '../types';

/**
 * Calculates unrealized gains or losses for a specific tax lot.
 */
export function calculateLotUnrealizedGainLoss(_lot: Partial<TaxLot>): {
  gainLoss: number;
  gainLossPercentage: number;
} {
  // Stub implementation
  return {
    gainLoss: 0,
    gainLossPercentage: 0,
  };
}

/**
 * Classifies whether a tax lot is short-term or long-term based on acquisition date.
 * (e.g., standard US rules classify assets held <= 1 year as Short Term)
 */
export function classifyHoldingTerm(_acquisitionDate: string | Date): boolean {
  // Stub implementation (returns true for short-term by default)
  return true;
}

/**
 * Validates if a proposed wash sale condition exists.
 * (Wash sale rule: selling at a loss and buying identical asset within 30 days before or after)
 */
export function checkWashSaleConflict(
  _ticker: string,
  _sellDate: string | Date,
  _recentTransactions: Transaction[]
): { hasConflict: boolean; reason?: string; restrictedUntil?: string } {
  // Stub implementation
  return {
    hasConflict: false,
  };
}

/**
 * Estimates potential tax savings from harvesting a specific amount of capital losses,
 * based on estimated short-term and long-term tax rates.
 */
export function estimateTaxSavings(
  _shortTermLosses: number,
  _longTermLosses: number,
  _shortTermTaxRate: number = 0.37, // Default top US tax brackets
  _longTermTaxRate: number = 0.20
): number {
  // Stub implementation
  return 0;
}

/**
 * Aggregates lot-level data to compile parent Holding values.
 */
export function aggregateHoldingLots(
  _ticker: string,
  _name: string,
  _assetType: Holding['assetType'],
  _lots: TaxLot[]
): Holding {
  // Stub implementation
  return {
    id: '',
    ticker: _ticker,
    name: _name,
    assetType: _assetType,
    quantity: 0,
    averageBuyPrice: 0,
    currentPrice: 0,
    totalCostBasis: 0,
    totalValue: 0,
    unrealizedGainLoss: 0,
    unrealizedGainLossPercentage: 0,
    lots: _lots,
  };
}
