import { Holding, Transaction, HarvestingRecommendation, PortfolioSummary } from '../types';

export class MockApiService {
  private static LATENCY_MS = 800;

  private static delay<T>(value: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), this.LATENCY_MS);
    });
  }

  /**
   * Fetches the list of active user holdings.
   */
  public static async fetchHoldings(): Promise<Holding[]> {
    // Stub implementation returning empty list
    return this.delay<Holding[]>([]);
  }

  /**
   * Fetches user transactions history.
   */
  public static async fetchTransactions(): Promise<Transaction[]> {
    // Stub implementation returning empty list
    return this.delay<Transaction[]>([]);
  }

  /**
   * Fetches tax harvesting recommendations based on holdings.
   */
  public static async fetchHarvestingRecommendations(): Promise<HarvestingRecommendation[]> {
    // Stub implementation returning empty list
    return this.delay<HarvestingRecommendation[]>([]);
  }

  /**
   * Fetches overall portfolio metrics.
   */
  public static async fetchPortfolioSummary(): Promise<PortfolioSummary> {
    // Stub implementation returning default empty summary
    return this.delay<PortfolioSummary>({
      totalValue: 0,
      totalCostBasis: 0,
      totalUnrealizedGains: 0,
      totalUnrealizedLosses: 0,
      netUnrealizedGainLoss: 0,
      harvestableLosses: 0,
      estimatedTaxSavings: 0,
    });
  }

  /**
   * Submits a batch of tax loss harvesting transactions.
   */
  public static async executeHarvestLots(
    _recommendationIds: string[]
  ): Promise<{ success: boolean; executedTransactions: Transaction[] }> {
    return this.delay({
      success: true,
      executedTransactions: [],
    });
  }
}
