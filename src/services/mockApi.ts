import type { Holding, CapitalGain } from "../types";
import holdingsData from "../data/holdings.json";
import capitalGainsData from "../data/capitalGains.json";

const LATENCY_MS = 500;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizePrecision = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export async function getHoldings(): Promise<Holding[]> {
  await delay(LATENCY_MS);
  return (holdingsData as Holding[]).map((holding) => ({
    ...holding,
    quantity: normalizePrecision(holding.quantity),
    value: normalizePrecision(holding.value),
    buyPrice: normalizePrecision(holding.buyPrice),
    currentPrice: normalizePrecision(holding.currentPrice),
    unrealizedPnL: normalizePrecision(holding.unrealizedPnL),
    unrealizedPnLPercent: normalizePrecision(holding.unrealizedPnLPercent),
    savings: normalizePrecision(holding.savings),
  }));
}

export async function getCapitalGains(): Promise<CapitalGain> {
  await delay(LATENCY_MS);
  const data = capitalGainsData as CapitalGain;
  return {
    shortTerm: {
      profits: normalizePrecision(data.shortTerm.profits),
      losses: normalizePrecision(data.shortTerm.losses),
    },
    longTerm: {
      profits: normalizePrecision(data.longTerm.profits),
      losses: normalizePrecision(data.longTerm.losses),
    },
  };
}
