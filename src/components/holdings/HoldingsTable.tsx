import type { Holding } from '../../types/tax';
import TableHeader from './TableHeader';
import HoldingRow from './HoldingRow';

interface HoldingsTableProps {
  holdings: Holding[];
}

export default function HoldingsTable({ holdings }: HoldingsTableProps) {
  // Take exactly 6 rows
  const visibleHoldings = holdings.slice(0, 6);

  return (
    <div className="flex flex-col w-full">
      {/* Sticky Table Scroll Container */}
      <div
        className="w-full overflow-auto max-h-[360px]"
        style={{
          scrollbarWidth: 'thin',
        }}
      >
        <table className="w-full text-left border-collapse" style={{ minWidth: '600px' }}>
          <TableHeader />
          <tbody>
            {visibleHoldings.map((holding) => {
              // Pre-select rows that have harvestable savings (> 0) to demonstrate selected row background
              const isSelected = holding.savings > 0;
              return (
                <HoldingRow
                  key={holding.ticker}
                  holding={holding}
                  isSelected={isSelected}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      {/* View All Button */}
      <div className="mt-4 flex justify-center">
        <button
          className="text-xs font-semibold px-4 py-2 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-blue)',
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
          }}
        >
          View All Holdings
        </button>
      </div>
    </div>
  );
}
