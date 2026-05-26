import type { Holding } from '../types/tax';
import type { CapitalGain } from '../types/tax';
import holdingsData from '../data/holdings.json';
import capitalGainsData from '../data/capitalGains.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockApiService {
  private static LATENCY_MS = 500;
  private static shouldError = false;

  // Set the error flag for simulation
  public static setErrorSimulation(value: boolean) {
    this.shouldError = value;
  }

  private static normalizePrecision(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  public static async getHoldings(): Promise<Holding[]> {
    await delay(this.LATENCY_MS);
    if (this.shouldError) {
      throw new Error('Failed to fetch holdings data from mock API');
    }

    return (holdingsData as Holding[]).map((holding) => ({
      ...holding,
      quantity: this.normalizePrecision(holding.quantity),
      value: this.normalizePrecision(holding.value),
      buyPrice: this.normalizePrecision(holding.buyPrice),
      currentPrice: this.normalizePrecision(holding.currentPrice),
      unrealizedPnL: this.normalizePrecision(holding.unrealizedPnL),
      unrealizedPnLPercent: this.normalizePrecision(holding.unrealizedPnLPercent),
      savings: this.normalizePrecision(holding.savings),
    }));
  }

  public static async getCapitalGains(): Promise<CapitalGain> {
    await delay(this.LATENCY_MS);
    if (this.shouldError) {
      throw new Error('Failed to fetch capital gains data from mock API');
    }

    const data = capitalGainsData as CapitalGain;
    return {
      shortTerm: {
        profits: this.normalizePrecision(data.shortTerm.profits),
        losses: this.normalizePrecision(data.shortTerm.losses),
      },
      longTerm: {
        profits: this.normalizePrecision(data.longTerm.profits),
        losses: this.normalizePrecision(data.longTerm.losses),
      },
    };
  }
}
