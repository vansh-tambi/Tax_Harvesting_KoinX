# Tax Loss Harvesting Dashboard

A simple, interactive dashboard built for KoinX to demonstrate Tax Loss Harvesting. It helps users identify which of their holdings have unrealized losses, select them to simulate a harvest, and calculate their potential tax savings.

## Project Overview

Tax loss harvesting is the practice of selling assets at a loss to offset capital gains tax liabilities. This application:
1. Displays the user's capital gains ( profits, losses, net gains) in pre-harvest and post-harvest states.
2. Displays a table of the user's holdings (showing purchase avg, current price, unrealized PnL, etc.).
3. Allows the user to select specific holdings to harvest, updating the post-harvest card and displaying an estimated savings banner in real-time.
4. Includes a toggle to switch between light and dark themes.

## Tech Stack

- **Core**: React 19 (Functional Components), TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4, Vanilla CSS variables for theme management
- **Animations**: Framer Motion (subtle page fade-ins and card updates)
- **Icons**: Lucide React

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```
4. **Lint and Format**:
   ```bash
   npm run lint
   ```

## Assumptions & Calculations

1. **Tax Savings Rate**: The tax savings are calculated at a flat 30% rate on the realized losses, which is standard for cryptocurrency gains in India.
2. **Short-Term vs. Long-Term**: Tickers `BTC`, `ETH`, `SOL`, and `MATIC` are treated as Short-Term (STCG) assets, while other tickers (e.g., `ADA`, `DOT`) are treated as Long-Term (LTCG) assets.
3. **Initially Selected State**: On initial load, holdings with harvestable savings (`savings > 0`) are pre-selected in the table to display the potential harvest scenario.

## Tradeoffs & Imperfections

- **Mock Data**: Since this is a frontend-only project, data is fetched with a simulated 500ms delay from static local JSON files instead of a real database.
- **Precision Normalization**: Calculations are rounded to 2 decimal places in the service layer to avoid JavaScript floating-point representation bugs.
- **Component Size**: Components like `HoldingRow` and `HoldingsTable` have been kept relatively simple and merged to prevent over-abstraction (no separate cells or header files).

## Future Improvements

- **Real API Integration**: Connect to actual backend endpoints.
- **Custom Sell Quantities**: Allow users to enter a custom quantity to sell instead of harvesting the entire holding.
- **Wash Sale Rules**: Detect and warn users about wash sales if they repurchase the same asset within 30 days.
