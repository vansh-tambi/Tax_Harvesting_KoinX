import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Header from '../components/layout/Header';
import NotesAccordion from '../components/layout/NotesAccordion';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const holdingsMock = [
  {
    ticker: 'BTC',
    name: 'Bitcoin',
    quantity: '0.45 BTC',
    value: '$26,640.00',
    buyPrice: '$62,500.00',
    currentPrice: '$59,200.00',
    pnl: -1485.00,
    pnlPercent: '-5.28%',
    savings: 445.50,
  },
  {
    ticker: 'ETH',
    name: 'Ethereum',
    quantity: '3.20 ETH',
    value: '$9,984.00',
    buyPrice: '$3,450.00',
    currentPrice: '$3,120.00',
    pnl: -1056.00,
    pnlPercent: '-9.57%',
    savings: 316.80,
  },
  {
    ticker: 'SOL',
    name: 'Solana',
    quantity: '25.00 SOL',
    value: '$4,125.00',
    buyPrice: '$148.00',
    currentPrice: '$165.00',
    pnl: 425.00,
    pnlPercent: '+11.49%',
    savings: 0.00,
  },
  {
    ticker: 'ADA',
    name: 'Cardano',
    quantity: '1,500.00 ADA',
    value: '$570.00',
    buyPrice: '$0.48',
    currentPrice: '$0.38',
    pnl: -150.00,
    pnlPercent: '-20.83%',
    savings: 45.00,
  },
  {
    ticker: 'DOT',
    name: 'Polkadot',
    quantity: '120.00 DOT',
    value: '$696.00',
    buyPrice: '$6.20',
    currentPrice: '$5.80',
    pnl: -48.00,
    pnlPercent: '-6.45%',
    savings: 14.40,
  },
  {
    ticker: 'MATIC',
    name: 'Polygon',
    quantity: '800.00 MATIC',
    value: '$488.00',
    buyPrice: '$0.72',
    currentPrice: '$0.61',
    pnl: -88.00,
    pnlPercent: '-15.28%',
    savings: 26.40,
  },
];

export default function TaxDashboard() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Page Container */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mx-auto px-4 sm:px-6"
        style={{
          maxWidth: '1220px',
          paddingTop: '16px',
          paddingBottom: '32px',
        }}
      >
        {/* Header */}
        <Header />

        {/* Accordion Notes & Disclaimers */}
        <div style={{ marginBottom: '20px' }}>
          <NotesAccordion />
        </div>

        {/* Summary Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ marginBottom: '24px' }}>
          {/* Pre Harvesting Card */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              padding: '24px',
              boxShadow: 'var(--shadow-minimal)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'between',
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
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Taxable Capital Gains</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>$12,450.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Estimated Tax Liability (30%)</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>$3,735.00</span>
                </div>
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
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>Tax Savings</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text-primary)' }}>$0.00</span>
            </div>
          </div>

          {/* After Harvesting Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, #4AA3FF 0%, #0058FF 100%)',
              borderRadius: '10px',
              padding: '24px',
              boxShadow: 'var(--shadow-minimal)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'between',
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
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Taxable Capital Gains</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>$8,450.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Estimated Tax Liability (30%)</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>$2,535.00</span>
                </div>
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
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.8)' }}>Tax Savings</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', textDecoration: 'underline' }}>$1,200.00</span>
            </div>
          </div>
        </div>

        {/* Holdings Section */}
        <section
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            boxShadow: 'var(--shadow-minimal)',
            padding: '16px',
          }}
        >
          <div className="flex justify-between items-center" style={{ marginBottom: '14px' }}>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              Holdings
            </h2>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)', paddingBottom: '10px' }}>Asset</th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--color-text-secondary)', paddingBottom: '10px' }}>Holdings / Value</th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--color-text-secondary)', paddingBottom: '10px' }}>Avg. Buy / Current</th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--color-text-secondary)', paddingBottom: '10px' }}>Unrealized P&L</th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wider text-right" style={{ color: 'var(--color-text-secondary)', paddingBottom: '10px' }}>Est. Tax Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border" style={{ borderColor: 'var(--color-border)' }}>
                {holdingsMock.map((item) => (
                  <tr key={item.ticker}>
                    <td className="py-3" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '14px' }}>{item.ticker}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{item.name}</div>
                    </td>
                    <td className="py-3 text-right" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                      <div style={{ fontWeight: 500, color: 'var(--color-text-primary)', fontSize: '14px' }}>{item.quantity}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{item.value}</div>
                    </td>
                    <td className="py-3 text-right" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                      <div style={{ color: 'var(--color-text-primary)', fontSize: '14px' }}>{item.buyPrice}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{item.currentPrice}</div>
                    </td>
                    <td className="py-3 text-right" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                      <div style={{ color: item.pnl < 0 ? 'var(--color-loss)' : 'var(--color-profit)', fontWeight: 600, fontSize: '14px' }}>
                        {item.pnl < 0 ? '' : '+'}{item.pnl.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div style={{ fontSize: '12px', color: item.pnl < 0 ? 'var(--color-loss)' : 'var(--color-profit)' }}>
                        {item.pnlPercent}
                      </div>
                    </td>
                    <td className="py-3 text-right" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                      {item.savings > 0 ? (
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--color-blue)', fontSize: '14px' }}>
                            +${item.savings.toFixed(2)}
                          </div>
                          <span
                            className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: 'rgba(22, 119, 255, 0.1)',
                              color: 'var(--color-blue)',
                              marginTop: '2px',
                            }}
                          >
                            Harvest
                          </span>
                        </div>
                      ) : (
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>—</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Condensed View */}
          <div className="block sm:hidden space-y-3">
            {holdingsMock.map((item) => (
              <div
                key={item.ticker}
                className="flex justify-between items-center py-2.5 border-b"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '14px' }}>{item.ticker}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{item.name}</div>
                </div>
                <div className="text-right">
                  <div style={{ color: item.pnl < 0 ? 'var(--color-loss)' : 'var(--color-profit)', fontWeight: 600, fontSize: '14px' }}>
                    {item.pnl < 0 ? '' : '+'}${Math.abs(item.pnl).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div style={{ fontSize: '12px', color: item.savings > 0 ? 'var(--color-blue)' : 'var(--color-text-secondary)', fontWeight: item.savings > 0 ? 500 : 400 }}>
                    {item.savings > 0 ? `Harvest: +$${item.savings.toFixed(2)}` : '—'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.main>
    </div>
  );
}
