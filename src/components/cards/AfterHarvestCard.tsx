import GainMetric, { formatINR } from './GainMetric';

export default function AfterHarvestCard() {
  // Static after-harvest mock values for now
  const shortTerm = {
    profits: 120000.00,
    losses: 95000.00, // increased losses from harvest
  };

  const longTerm = {
    profits: 250000.00,
    losses: 140000.00, // increased losses from harvest
  };

  const netSTCG = shortTerm.profits - shortTerm.losses;
  const netLTCG = longTerm.profits - longTerm.losses;
  const realised = netSTCG + netLTCG;

  return (
    <div
      className="flex flex-col justify-between"
      style={{
        background: 'linear-gradient(135deg, #4AA3FF 0%, #0058FF 100%)',
        borderRadius: '10px',
        padding: '24px',
        boxShadow: 'var(--shadow-minimal)',
        color: '#FFFFFF',
      }}
    >
      <div>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#FFFFFF',
            marginBottom: '16px',
            marginTop: 0,
          }}
        >
          After Harvesting
        </h3>

        {/* Short Term */}
        <div style={{ marginBottom: '16px' }}>
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Short-term (STCG)
          </div>
          <GainMetric label="Profits" value={shortTerm.profits} isLight={false} />
          <GainMetric label="Losses" value={shortTerm.losses} isLight={false} />
          <GainMetric label="Net Capital Gains" value={netSTCG} isLight={false} />
        </div>

        {/* Long Term */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Long-term (LTCG)
          </div>
          <GainMetric label="Profits" value={longTerm.profits} isLight={false} />
          <GainMetric label="Losses" value={longTerm.losses} isLight={false} />
          <GainMetric label="Net Capital Gains" value={netLTCG} isLight={false} />
        </div>
      </div>

      <div
        style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center',
        }}
        className="flex justify-between items-center"
      >
        <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.8)' }}>
          Realised Capital Gains
        </span>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>
          {formatINR(realised)}
        </span>
      </div>
    </div>
  );
}
