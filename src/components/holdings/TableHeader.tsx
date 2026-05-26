export default function TableHeader() {
  return (
    <thead
      className="sticky top-0 z-10 bg-surface"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <tr>
        {/* Checkbox column */}
        <th className="py-3 px-4 text-left w-10">
          <input
            type="checkbox"
            className="rounded border-border text-blue focus:ring-blue"
            style={{
              borderColor: 'var(--color-border)',
              accentColor: 'var(--color-blue)',
              cursor: 'pointer',
            }}
            disabled
          />
        </th>

        {/* Asset */}
        <th
          className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Asset
        </th>

        {/* Holdings */}
        <th
          className="py-3 px-4 text-right text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Holdings
        </th>

        {/* Desktop-only Columns */}
        <th
          className="hidden md:table-cell py-3 px-4 text-right text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Current Value
        </th>

        <th
          className="hidden md:table-cell py-3 px-4 text-right text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Short-Term
        </th>

        <th
          className="hidden md:table-cell py-3 px-4 text-right text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Long-Term
        </th>

        <th
          className="hidden md:table-cell py-3 px-4 text-right text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Amount Sell
        </th>
      </tr>
    </thead>
  );
}
