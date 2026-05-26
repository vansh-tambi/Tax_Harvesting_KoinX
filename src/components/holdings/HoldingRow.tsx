import type { Holding } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";

interface HoldingRowProps {
  holding: Holding;
  isSelected?: boolean;
  onToggle?: () => void;
}

export default function HoldingRow({
  holding,
  isSelected = false,
  onToggle,
}: HoldingRowProps) {
  const isShortTerm = ["BTC", "ETH", "SOL", "MATIC"].includes(holding.ticker);
  const stValue = isShortTerm ? holding.unrealizedPnL : null;
  const ltValue = !isShortTerm ? holding.unrealizedPnL : null;

  const renderPnLCell = (val: number | null) => {
    if (val === null) {
      return <span style={{ color: "var(--color-text-secondary)" }}>—</span>;
    }
    const color = val < 0 ? "var(--color-loss)" : "var(--color-profit)";
    return (
      <span style={{ color, fontWeight: 600 }}>
        {val > 0 ? "+" : ""}
        {formatCurrency(val)}
      </span>
    );
  };

  return (
    <tr
      onClick={onToggle}
      style={{
        backgroundColor: isSelected
          ? "rgba(22, 119, 255, 0.04)"
          : "transparent",
        borderBottom: "1px solid var(--color-border)",
        transition: "background-color 0.2s ease",
        cursor: "pointer",
      }}
      className="hover:bg-slate-50 dark:hover:bg-slate-800/10"
    >
      {/* Checkbox */}
      <td className="py-3 px-4 w-10" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="rounded border-border text-blue focus:ring-blue"
          style={{
            borderColor: "var(--color-border)",
            accentColor: "var(--color-blue)",
            cursor: "pointer",
          }}
        />
      </td>

      {/* Asset */}
      <td className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: "rgba(22, 119, 255, 0.1)",
              color: "var(--color-blue)",
            }}
          >
            {holding.ticker[0]}
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className="font-semibold text-sm truncate"
              style={{ color: "var(--color-text-primary)" }}
            >
              {holding.ticker}
            </span>
            <span
              className="text-xs truncate max-w-[100px] sm:max-w-[150px]"
              style={{ color: "var(--color-text-secondary)" }}
              title={holding.name}
            >
              {holding.name}
            </span>
          </div>
        </div>
      </td>

      {/* Holdings (Quantity & Average Buy Price) */}
      <td className="py-3 px-4 text-right">
        <div
          className="font-semibold text-sm"
          style={{ color: "var(--color-text-primary)" }}
        >
          {holding.quantity} {holding.ticker}
        </div>
        <div
          className="text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          avg. {formatCurrency(holding.buyPrice)}
        </div>
      </td>

      {/* Current Value (Desktop) */}
      <td className="hidden md:table-cell py-3 px-4 text-right">
        <div
          className="font-semibold text-sm"
          style={{ color: "var(--color-text-primary)" }}
        >
          {formatCurrency(holding.value)}
        </div>
        <div
          className="text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          current {formatCurrency(holding.currentPrice)}
        </div>
      </td>

      {/* Short-Term (Desktop) */}
      <td className="hidden md:table-cell py-3 px-4 text-right text-sm">
        {renderPnLCell(stValue)}
      </td>

      {/* Long-Term (Desktop) */}
      <td className="hidden md:table-cell py-3 px-4 text-right text-sm">
        {renderPnLCell(ltValue)}
      </td>

      {/* Amount Sell (Desktop) */}
      <td
        className="hidden md:table-cell py-3 px-4 text-right text-sm"
        style={{ color: "var(--color-text-secondary)" }}
      >
        —
      </td>
    </tr>
  );
}
