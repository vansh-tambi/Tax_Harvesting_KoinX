import type { Holding } from "../../types";
import HoldingRow from "./HoldingRow";

interface HoldingsTableProps {
  holdings: Holding[];
  selectedSet: Set<string>;
  toggleHolding: (ticker: string) => void;
  toggleAll: () => void;
  loading?: boolean;
}

export default function HoldingsTable({
  holdings,
  selectedSet,
  toggleHolding,
  toggleAll,
  loading = false,
}: HoldingsTableProps) {
  const visibleHoldings = holdings.slice(0, 6);
  const isAllSelected =
    holdings.length > 0 && selectedSet.size === holdings.length;

  return (
    <div className="flex flex-col w-full">
      {/* Sticky Table Scroll Container */}
      <div
        className="w-full overflow-auto max-h-[360px]"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        <table
          className="w-full text-left border-collapse"
          style={{ minWidth: "600px" }}
        >
          <thead
            className="sticky top-0 z-10 bg-surface"
            style={{
              backgroundColor: "var(--color-surface)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <tr>
              {/* Checkbox column */}
              <th className="py-3 px-4 text-left w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleAll}
                  disabled={loading || holdings.length === 0}
                  className="rounded border-border text-blue focus:ring-blue"
                  style={{
                    borderColor: "var(--color-border)",
                    accentColor: "var(--color-blue)",
                    cursor: holdings.length > 0 ? "pointer" : "default",
                  }}
                />
              </th>

              {/* Asset */}
              <th
                className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Asset
              </th>

              {/* Holdings */}
              <th
                className="py-3 px-4 text-right text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Holdings
              </th>

              {/* Desktop-only Columns */}
              <th
                className="hidden md:table-cell py-3 px-4 text-right text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Current Value
              </th>

              <th
                className="hidden md:table-cell py-3 px-4 text-right text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Short-Term
              </th>

              <th
                className="hidden md:table-cell py-3 px-4 text-right text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Long-Term
              </th>

              <th
                className="hidden md:table-cell py-3 px-4 text-right text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Amount Sell
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Simple animated skeletons for loading state
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse border-b border-border">
                  <td className="py-4 px-4">
                    <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700" />
                      <div className="space-y-1">
                        <div className="h-3 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded ml-auto" />
                  </td>
                  <td className="hidden md:table-cell py-4 px-4">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded ml-auto" />
                  </td>
                  <td className="hidden md:table-cell py-4 px-4">
                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded ml-auto" />
                  </td>
                  <td className="hidden md:table-cell py-4 px-4">
                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded ml-auto" />
                  </td>
                  <td className="hidden md:table-cell py-4 px-4">
                    <div className="h-4 w-6 bg-slate-200 dark:bg-slate-700 rounded ml-auto" />
                  </td>
                </tr>
              ))
            ) : holdings.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  No holdings found.
                </td>
              </tr>
            ) : (
              visibleHoldings.map((holding) => {
                const isSelected = selectedSet.has(holding.ticker);
                return (
                  <HoldingRow
                    key={holding.ticker}
                    holding={holding}
                    isSelected={isSelected}
                    onToggle={() => toggleHolding(holding.ticker)}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* View All Button */}
      <div className="mt-4 flex justify-center">
        <button
          className="text-xs font-semibold px-4 py-2 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-blue)",
            fontFamily: "var(--font-sans)",
            cursor: "pointer",
          }}
        >
          View All Holdings
        </button>
      </div>
    </div>
  );
}
