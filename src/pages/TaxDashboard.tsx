import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
  }),
};

export default function TaxDashboard() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div
      className="bg-background min-h-screen font-sans"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* ── Navbar ── */}
      <motion.nav
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-surface border-border"
        style={{
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{ maxWidth: 1200, padding: '14px 24px' }}
        >
          <span
            className="text-primary"
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: 'var(--color-text-primary)',
            }}
          >
            KoinX
          </span>
          <span
            className="text-secondary"
            style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}
          >
            Tax Harvesting
          </span>
        </div>
      </motion.nav>

      {/* ── Page Container ── */}
      <main className="mx-auto" style={{ maxWidth: 1200, padding: '32px 24px' }}>
        {/* ── Header Row ── */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          style={{ marginBottom: 24 }}
        >
          <h1
            className="text-primary"
            style={{
              fontSize: 24,
              fontWeight: 700,
              margin: 0,
              color: 'var(--color-text-primary)',
            }}
          >
            Tax-Loss Harvesting
          </h1>
          <p
            className="text-secondary"
            style={{
              fontSize: 14,
              marginTop: 4,
              color: 'var(--color-text-secondary)',
            }}
          >
            Optimize your portfolio by offsetting gains with losses.
          </p>
        </motion.div>

        {/* ── Accordion / Disclaimer ── */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-base)',
            boxShadow: 'var(--shadow-minimal)',
            marginBottom: 24,
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => setAccordionOpen(!accordionOpen)}
            className="w-full flex items-center justify-between"
            style={{
              padding: '16px 20px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            <span>Important Notes & Disclaimers</span>
            {accordionOpen ? (
              <ChevronUp size={18} style={{ color: 'var(--color-text-secondary)' }} />
            ) : (
              <ChevronDown size={18} style={{ color: 'var(--color-text-secondary)' }} />
            )}
          </button>

          {accordionOpen && (
            <div
              style={{
                padding: '0 20px 16px',
                color: 'var(--color-text-secondary)',
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              <p>
                Placeholder disclaimer content. Tax-loss harvesting involves
                risks including wash-sale rules. Consult a tax professional
                before acting on any recommendations shown here.
              </p>
            </div>
          )}
        </motion.div>

        {/* ── Summary Cards Row ── */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ gap: 20, marginBottom: 32 }}
        >
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-base)',
              boxShadow: 'var(--shadow-minimal)',
              padding: 24,
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                marginBottom: 8,
              }}
            >
              Short-term Gains
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              —
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-base)',
              boxShadow: 'var(--shadow-minimal)',
              padding: 24,
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                marginBottom: 8,
              }}
            >
              Long-term Gains
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              —
            </p>
          </div>
        </motion.div>

        {/* ── Holdings Section ── */}
        <motion.section
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-base)',
            boxShadow: 'var(--shadow-minimal)',
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 16px',
            }}
          >
            Holdings
          </h2>

          <div
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 14,
              padding: '40px 0',
              textAlign: 'center',
            }}
          >
            Placeholder — Holdings table will render here.
          </div>
        </motion.section>
      </main>
    </div>
  );
}
