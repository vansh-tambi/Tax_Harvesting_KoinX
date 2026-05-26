interface AssetCellProps {
  ticker: string;
  name: string;
}

export default function AssetCell({ ticker, name }: AssetCellProps) {
  return (
    <div className="flex items-center space-x-2">
      {/* Icon Placeholder/Bullet */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          backgroundColor: 'rgba(22, 119, 255, 0.1)',
          color: 'var(--color-blue)',
        }}
      >
        {ticker[0]}
      </div>
      <div className="flex flex-col min-w-0">
        <span
          className="font-semibold text-sm truncate"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {ticker}
        </span>
        <span
          className="text-xs text-secondary truncate max-w-[100px] sm:max-w-[150px]"
          style={{ color: 'var(--color-text-secondary)' }}
          title={name}
        >
          {name}
        </span>
      </div>
    </div>
  );
}
