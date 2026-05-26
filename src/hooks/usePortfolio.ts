import { useState } from 'react';
import { Holding, PortfolioSummary } from '../types';

export function usePortfolio() {
  const [holdings] = useState<Holding[]>([]);
  const [summary] = useState<PortfolioSummary | null>(null);
  const [isLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  return {
    holdings,
    summary,
    isLoading,
    error,
  };
}
