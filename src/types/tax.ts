export interface STCG {
  profits: number;
  losses: number;
}

export interface LTCG {
  profits: number;
  losses: number;
}

export interface CapitalGain {
  shortTerm: STCG;
  longTerm: LTCG;
}

export interface Holding {
  ticker: string;
  name: string;
  quantity: number;
  value: number;
  buyPrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  savings: number;
}
