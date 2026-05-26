import { Holding } from '../../types/tax';
import AssetCell from './AssetCell';
import { formatINR } from '../cards/GainMetric';

interface HoldingRowProps {
  holding: Holding;
  isSelected?: boolean;
}

export default function HoldingRow({ holding, isSelected = false }: HoldingRowProps) {
  // Map simulated Short-Term vs Long-Term columns for mock rows
  const isShortTerm = ['BTC', 'ETH', 'SOL', 'MATIC'].includes(holding.ticker);
  
  const stValue = isShortTerm ? holding.unrealizedPnL : null;
  const ltValue = !isShortTerm ? holding.unrealizedPnL : null;

  const renderPnLCell = (val: number | null) => {
    if (val === null) {
      return <span style={{ color: 'var(--color-text-secondary)' }}>—</span>;
    }
    const color = val < 0 ? 'var(--color-loss)' : 'var(--color-profit)';
    return (
      <span style={{ color, fontWeight: 600 }}>
        {val > 0 ? '+' : ''}
        {formatINR(val)}
      </span>
    );
  };

  return (
    <tr
      style={{
        backgroundColor: isSelected ? 'rgba(22, 119, 255, 0.04)' : 'transparent',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background-color 0.2s ease',
      }}
      className="hover:bg-slate-50 dark:hover:bg-slate-800/20"
    >
      {/* Checkbox */}
      <td className="py-3 px-4 w-10">
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          className="rounded border-border text-blue focus:ring-blue"
          style={{
            borderColor: 'var(--color-border)',
            accentColor: 'var(--color-blue)',
            cursor: 'pointer',
          }}
        />
      </td>

      {/* Asset Cell */}
      <td className="py-3 px-4">
        <AssetCell ticker={holding.ticker} name={holding.name} />
      </td>

      {/* Holdings (Quantity & Current Price) */}
      <td className="py-3 px-4 text-right">
        <div className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
          {holding.quantity} {holding.ticker}
        </div>
        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          avg. {formatINR(holding.buyPrice)}
        </div>
      </td>

      {/* Current Value (Desktop) */}
      <td className="hidden md:table-cell py-3 px-4 text-right">
        <div className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
          {formatINR(holding.value)}
        </div>
        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          current {formatINR(holding.currentPrice)}
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
        style={{ color: 'var(--color-text-secondary)' }}
      >
        —
      </td>
    </tr>
  );
}
