import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Header from '../components/layout/Header';
import NotesAccordion from '../components/layout/NotesAccordion';
import PreHarvestCard from '../components/cards/PreHarvestCard';
import AfterHarvestCard from '../components/cards/AfterHarvestCard';
import HoldingsTable from '../components/holdings/HoldingsTable';
import { MockApiService } from '../services/mockApi';
import type { Holding } from '../types/tax';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export default function TaxDashboard() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    MockApiService.getHoldings()
      .then((data) => {
        if (active) {
          setHoldings(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Failed to load holdings');
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

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
          <PreHarvestCard />
          <AfterHarvestCard />
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

          {loading ? (
            <div className="text-center py-8 text-secondary text-sm">
              Loading holdings...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-sm font-semibold" style={{ color: 'var(--color-loss)' }}>
              {error}
            </div>
          ) : (
            <HoldingsTable holdings={holdings} />
          )}
        </section>
      </motion.main>
    </div>
  );
}
