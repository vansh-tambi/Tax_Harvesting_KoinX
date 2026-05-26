# Changelog

All notable changes made to the Tax Loss Harvesting application during this refactoring phase:

## [1.0.0] - 2026-05-26

### Added
- Created `src/utils/formatCurrency.ts` for clean currency formatting (INR format).
- Added dynamic selections to the holdings table, connecting checkboxes to state so users can toggle holdings.
- Added a dynamic savings banner (`🎉 You're going to save upto ₹X`) displayed only when active savings are available.

### Changed
- Refactored `tsconfig.app.json` to include `"ignoreDeprecations": "6.0"` to silence TS5101 baseUrl deprecations in TypeScript 6.x.
- Refactored `src/services/mockApi.ts` from a static class structure (`MockApiService`) to direct, exported async functions (`getHoldings`, `getCapitalGains`).
- Refactored the `useHarvesting` hook to manage all data fetching and selection calculations dynamically, starting from pre-harvest values.
- Merged `AssetCell.tsx` into `HoldingRow.tsx` to simplify component structure.
- Merged `TableHeader.tsx` into `HoldingsTable.tsx` to simplify table structure.
- Merged `PreHarvestCard.tsx` and `AfterHarvestCard.tsx` into a single reusable `SummaryCard.tsx` component, including inlining the `GainMetric.tsx` logic.
- Integrated the `useHarvesting` hook in `TaxDashboard.tsx` to feed data dynamically to components.
- Rewrote the `README.md` to be clean, natural, and human-written.

### Removed
- Deleted unused types file `src/types/tax.ts` and consolidated the type declarations inside `src/types/index.ts`.
- Deleted unused hooks file `src/hooks/usePortfolio.ts`.
- Deleted unused utility stub `src/utils/gainCalculator.ts`.
- Deleted empty export files and unused directories (`src/components/notes`, `src/components/ui`).
- Deleted unused default CSS files (`src/App.css` and `src/index.css`).
- Removed excessive count-up state logic inside metrics to avoid synchronous `setState` inside `useEffect` (resolving ESLint `react-hooks/set-state-in-effect` errors).
