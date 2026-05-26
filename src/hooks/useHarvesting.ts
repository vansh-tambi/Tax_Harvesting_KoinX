import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Holding, CapitalGain } from '../types/tax';
import { MockApiService } from '../services/mockApi';

// Helper to determine if a holding is short‑term based on ticker (same logic as HoldingRow)
const shortTermTickers = ['BTC', 'ETH', 'SOL', 'MATIC'];
const isShortTerm = (ticker: string) => shortTermTickers.includes(ticker);

/**
 * useHarvesting – custom hook that loads holdings and capital‑gains data and provides
 * UI state for selecting holdings to harvest.
 *
 * It calculates profit/loss contributions from the selected holdings and derives the
 * effective capital‑gains after harvesting, as well as any potential tax savings.
 */
export function useHarvesting() {
  // ----- Data loading -----
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGain, setCapitalGain] = useState<CapitalGain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([MockApiService.getHoldings(), MockApiService.getCapitalGains()])
      .then(([h, cg]) => {
        if (!active) return;
        setHoldings(h);
        setCapitalGain(cg);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message ?? 'Failed to load harvesting data');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // ----- Selection state -----
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());

  const toggleHolding = useCallback((id: string) => {
    setSelectedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelectedSet((prev) => {
      if (prev.size === holdings.length) return new Set(); // deselect all
      // select all holding ids (using ticker as unique identifier)
      return new Set(holdings.map((h) => h.ticker));
    });
  }, [holdings]);

  // ----- Derived values -----
  const selectedHoldings = useMemo(() => {
    return holdings.filter((h) => selectedSet.has(h.ticker));
  }, [holdings, selectedSet]);

  const selectedAmountToSell = useMemo(() => {
    // total quantity of selected holdings (could be used for UI)
    return selectedHoldings.reduce((sum, h) => sum + h.quantity, 0);
  }, [selectedHoldings]);

  const {
    profitSTCG,
    lossSTCG,
    profitLTCG,
    lossLTCG,
    netSTCG,
    netLTCG,
    effectiveCapitalGains,
    savingsAmount,
  } = useMemo(() => {
    let profitSTCG = 0;
    let lossSTCG = 0;
    let profitLTCG = 0;
    let lossLTCG = 0;

    selectedHoldings.forEach((h) => {
      const gain = h.unrealizedPnL; // positive = profit, negative = loss
      if (isShortTerm(h.ticker)) {
        if (gain > 0) profitSTCG += gain;
        else lossSTCG += Math.abs(gain);
      } else {
        if (gain > 0) profitLTCG += gain;
        else lossLTCG += Math.abs(gain);
      }
    });

    const netSTCG = profitSTCG - lossSTCG;
    const netLTCG = profitLTCG - lossLTCG;
    const effectiveCapitalGains = netSTCG + netLTCG;

    // Pre‑harvest effective gains (original data)
    const preEffective = capitalGain
      ? capitalGain.shortTerm.profits - capitalGain.shortTerm.losses +
        capitalGain.longTerm.profits - capitalGain.longTerm.losses
      : 0;

    const savingsAmount = preEffective - effectiveCapitalGains;

    return {
      profitSTCG,
      lossSTCG,
      profitLTCG,
      lossLTCG,
      netSTCG,
      netLTCG,
      effectiveCapitalGains,
      savingsAmount: savingsAmount > 0 ? savingsAmount : 0,
    };
  }, [selectedHoldings, capitalGain]);

  return {
    // data & status
    holdings,
    capitalGain,
    loading,
    error,
    // selection UI
    selectedHoldings,
    selectedAmountToSell,
    toggleHolding,
    toggleAll,
    // calculations
    profitSTCG,
    lossSTCG,
    profitLTCG,
    lossLTCG,
    netSTCG,
    netLTCG,
    effectiveCapitalGains,
    savingsAmount,
  } as const;
}
