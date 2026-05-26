import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Header from "../components/layout/Header";
import NotesAccordion from "../components/layout/NotesAccordion";
import SummaryCard from "../components/cards/SummaryCard";
import HoldingsTable from "../components/holdings/HoldingsTable";
import { useHarvesting } from "../hooks/useHarvesting";
import { formatCurrency } from "../utils/formatCurrency";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export default function TaxDashboard() {
  const {
    holdings,
    capitalGain,
    loading,
    error,
    selectedSet,
    toggleHolding,
    toggleAll,
    preSTCG,
    preLTCG,
    afterSTCG,
    afterLTCG,
    savingsAmount,
  } = useHarvesting();

  const renderCardSkeleton = () => (
    <div
      className="bg-surface border-border flex flex-col justify-center items-center animate-pulse"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "10px",
        padding: "24px",
        boxShadow: "var(--shadow-minimal)",
        height: "320px",
      }}
    >
      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-6" />
      <div className="w-full space-y-4">
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-sans)",
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
          maxWidth: "1220px",
          paddingTop: "16px",
          paddingBottom: "32px",
        }}
      >
        {/* Header */}
        <Header />

        {/* Accordion Notes & Disclaimers */}
        <div style={{ marginBottom: "20px" }}>
          <NotesAccordion />
        </div>

        {/* Dynamic Savings Banner */}
        {savingsAmount > 0 && (
          <div
            className="flex items-center justify-between p-4 mb-5 border rounded-lg"
            style={{
              borderColor: "rgba(0, 197, 102, 0.2)",
              backgroundColor: "rgba(0, 197, 102, 0.05)",
              color: "var(--color-profit)",
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            <span>
              🎉 You're going to save upto {formatCurrency(savingsAmount)}
            </span>
          </div>
        )}

        {/* Summary Cards Section */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          style={{ marginBottom: "24px" }}
        >
          {loading || !capitalGain ? (
            <>
              {renderCardSkeleton()}
              {renderCardSkeleton()}
            </>
          ) : (
            <>
              <SummaryCard
                title="Pre Harvesting"
                profitsSTCG={preSTCG.profits}
                lossesSTCG={preSTCG.losses}
                netSTCG={preSTCG.profits - preSTCG.losses}
                profitsLTCG={preLTCG.profits}
                lossesLTCG={preLTCG.losses}
                netLTCG={preLTCG.profits - preLTCG.losses}
                realised={
                  preSTCG.profits -
                  preSTCG.losses +
                  (preLTCG.profits - preLTCG.losses)
                }
              />
              <SummaryCard
                title="After Harvesting"
                profitsSTCG={afterSTCG.profits}
                lossesSTCG={afterSTCG.losses}
                netSTCG={afterSTCG.profits - afterSTCG.losses}
                profitsLTCG={afterLTCG.profits}
                lossesLTCG={afterLTCG.losses}
                netLTCG={afterLTCG.profits - afterLTCG.losses}
                realised={
                  afterSTCG.profits -
                  afterSTCG.losses +
                  (afterLTCG.profits - afterLTCG.losses)
                }
                isDark={true}
              />
            </>
          )}
        </div>

        {/* Holdings Section */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "10px",
            boxShadow: "var(--shadow-minimal)",
            padding: "16px",
          }}
        >
          <div
            className="flex justify-between items-center"
            style={{ marginBottom: "14px" }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                margin: 0,
              }}
            >
              Holdings
            </h2>
          </div>

          {error ? (
            <div
              className="text-center py-8 text-sm font-semibold"
              style={{ color: "var(--color-loss)" }}
            >
              {error}
            </div>
          ) : (
            <HoldingsTable
              holdings={holdings}
              selectedSet={selectedSet}
              toggleHolding={toggleHolding}
              toggleAll={toggleAll}
              loading={loading}
            />
          )}
        </section>
      </motion.main>
    </div>
  );
}
