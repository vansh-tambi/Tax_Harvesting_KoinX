import { useEffect, useState } from 'react';
import { MockApiService } from '../../services/mockApi';
import { CapitalGain } from '../../types/tax';
import GainMetric, { formatINR } from './GainMetric';

export default function PreHarvestCard() {
  const [data, setData] = useState<CapitalGain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    MockApiService.getCapitalGains()
      .then((gains) => {
        if (active) {
          setData(gains);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Error loading gains');
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div
        className="bg-surface border-border flex flex-col justify-center items-center"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: 'var(--shadow-minimal)',
          height: '320px',
        }}
      >
        <span className="text-secondary text-sm">Loading Pre Harvesting...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className="bg-surface border-border flex flex-col justify-center items-center"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '10px',
          padding: '24px',
          boxShadow: 'var(--shadow-minimal)',
          height: '320px',
          color: 'var(--color-loss)',
        }}
      >
        <span className="text-sm font-semibold">{error || 'Failed to load'}</span>
      </div>
    );
  }

  const { shortTerm, longTerm } = data;
  const netSTCG = shortTerm.profits - shortTerm.losses;
  const netLTCG = longTerm.profits - longTerm.losses;
  const realised = netSTCG + netLTCG;

  return (
    <div
      className="bg-surface border-border flex flex-col justify-between"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '24px',
        boxShadow: 'var(--shadow-minimal)',
      }}
    >
      <div>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
            marginTop: 0,
          }}
        >
          Pre Harvesting
        </h3>

        {/* Short Term */}
        <div style={{ marginBottom: '16px' }}>
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-blue)' }}>
            Short-term (STCG)
          </div>
          <GainMetric label="Profits" value={shortTerm.profits} />
          <GainMetric label="Losses" value={shortTerm.losses} />
          <GainMetric label="Net Capital Gains" value={netSTCG} />
        </div>

        {/* Long Term */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-blue)' }}>
            Long-term (LTCG)
          </div>
          <GainMetric label="Profits" value={longTerm.profits} />
          <GainMetric label="Losses" value={longTerm.losses} />
          <GainMetric label="Net Capital Gains" value={netLTCG} />
        </div>
      </div>

      <div
        style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center',
        }}
        className="flex justify-between items-center"
      >
        <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
          Realised Capital Gains
        </span>
        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          {formatINR(realised)}
        </span>
      </div>
    </div>
  );
}
