import { useState, useEffect } from "react";
import type { Holding, CapitalGain } from "../types";
import { getHoldings, getCapitalGains } from "../services/mockApi";

const shortTermTickers = ["BTC", "ETH", "SOL", "MATIC"];
const isShortTerm = (ticker: string) => shortTermTickers.includes(ticker);

export function useHarvesting() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGain, setCapitalGain] = useState<CapitalGain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    let active = true;
    Promise.all([getHoldings(), getCapitalGains()])
      .then(([h, cg]) => {
        if (!active) return;
        setHoldings(h);
        setCapitalGain(cg);
        // Pre-populate with holdings that have savings
        setSelectedSet(
          new Set(
            h.filter((item) => item.savings > 0).map((item) => item.ticker),
          ),
        );
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Failed to load harvesting data");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const toggleHolding = (ticker: string) => {
    setSelectedSet((prev) => {
      const next = new Set(prev);
      if (next.has(ticker)) {
        next.delete(ticker);
      } else {
        next.add(ticker);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedSet((prev) => {
      if (prev.size === holdings.length) {
        return new Set();
      }
      return new Set(holdings.map((h) => h.ticker));
    });
  };

  // Dynamic calculations based on selected holdings
  const selectedHoldings = holdings.filter((h) => selectedSet.has(h.ticker));
  const selectedAmountToSell = selectedHoldings.reduce(
    (sum, h) => sum + h.quantity,
    0,
  );

  // Pre-harvest values
  const preSTCG = capitalGain
    ? capitalGain.shortTerm
    : { profits: 0, losses: 0 };
  const preLTCG = capitalGain
    ? capitalGain.longTerm
    : { profits: 0, losses: 0 };

  // Calculate contributions from selected holdings
  let harvestedLossSTCG = 0;
  let harvestedProfitSTCG = 0;
  let harvestedLossLTCG = 0;
  let harvestedProfitLTCG = 0;

  selectedHoldings.forEach((h) => {
    const gain = h.unrealizedPnL;
    if (isShortTerm(h.ticker)) {
      if (gain > 0) harvestedProfitSTCG += gain;
      else harvestedLossSTCG += Math.abs(gain);
    } else {
      if (gain > 0) harvestedProfitLTCG += gain;
      else harvestedLossLTCG += Math.abs(gain);
    }
  });

  // After harvesting values
  const afterSTCG = {
    profits: preSTCG.profits + harvestedProfitSTCG,
    losses: preSTCG.losses + harvestedLossSTCG,
  };

  const afterLTCG = {
    profits: preLTCG.profits + harvestedProfitLTCG,
    losses: preLTCG.losses + harvestedLossLTCG,
  };

  // Savings is calculated as the sum of savings of selected holdings (which is 30% of their loss in holdings.json)
  const savingsAmount = selectedHoldings.reduce((sum, h) => sum + h.savings, 0);

  return {
    holdings,
    capitalGain,
    loading,
    error,
    selectedSet,
    selectedAmountToSell,
    toggleHolding,
    toggleAll,
    preSTCG,
    preLTCG,
    afterSTCG,
    afterLTCG,
    savingsAmount,
  };
}
