import { motion } from "framer-motion";
import { formatCurrency } from "../../utils/formatCurrency";

interface SummaryCardProps {
  title: string;
  profitsSTCG: number;
  lossesSTCG: number;
  netSTCG: number;
  profitsLTCG: number;
  lossesLTCG: number;
  netLTCG: number;
  realised: number;
  isDark?: boolean;
}

function MetricRow({
  label,
  value,
  isDark = false,
}: {
  label: string;
  value: number;
  isDark?: boolean;
}) {
  return (
    <div className="flex justify-between items-center text-sm py-1.5">
      <span
        style={{
          color: isDark
            ? "rgba(255, 255, 255, 0.8)"
            : "var(--color-text-secondary)",
        }}
      >
        {label}
      </span>
      <motion.span
        key={value}
        initial={{ scale: 0.95, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="font-semibold"
        style={{
          color: isDark ? "#FFFFFF" : "var(--color-text-primary)",
        }}
      >
        {formatCurrency(value)}
      </motion.span>
    </div>
  );
}

export default function SummaryCard({
  title,
  profitsSTCG,
  lossesSTCG,
  netSTCG,
  profitsLTCG,
  lossesLTCG,
  netLTCG,
  realised,
  isDark = false,
}: SummaryCardProps) {
  const cardStyle = isDark
    ? {
        background: "linear-gradient(135deg, #4AA3FF 0%, #0058FF 100%)",
        borderRadius: "10px",
        padding: "24px",
        boxShadow: "var(--shadow-minimal)",
        color: "#FFFFFF",
      }
    : {
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "10px",
        padding: "24px",
        boxShadow: "var(--shadow-minimal)",
      };

  const headerColor = isDark ? "#FFFFFF" : "var(--color-text-primary)";
  const sectionHeaderColor = isDark
    ? "rgba(255, 255, 255, 0.9)"
    : "var(--color-blue)";
  const borderStyle = isDark
    ? "1px solid rgba(255, 255, 255, 0.2)"
    : "1px solid var(--color-border)";
  const labelColor = isDark
    ? "rgba(255, 255, 255, 0.8)"
    : "var(--color-text-secondary)";
  const valueColor = isDark ? "#FFFFFF" : "var(--color-text-primary)";

  return (
    <div className="flex flex-col justify-between" style={cardStyle}>
      <div>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: headerColor,
            marginBottom: "16px",
            marginTop: 0,
          }}
        >
          {title}
        </h3>

        {/* Short Term */}
        <div style={{ marginBottom: "16px" }}>
          <div
            className="text-xs font-bold uppercase tracking-wider mb-1"
            style={{ color: sectionHeaderColor }}
          >
            Short-term (STCG)
          </div>
          <MetricRow label="Profits" value={profitsSTCG} isDark={isDark} />
          <MetricRow label="Losses" value={lossesSTCG} isDark={isDark} />
          <MetricRow
            label="Net Capital Gains"
            value={netSTCG}
            isDark={isDark}
          />
        </div>

        {/* Long Term */}
        <div>
          <div
            className="text-xs font-bold uppercase tracking-wider mb-1"
            style={{ color: sectionHeaderColor }}
          >
            Long-term (LTCG)
          </div>
          <MetricRow label="Profits" value={profitsLTCG} isDark={isDark} />
          <MetricRow label="Losses" value={lossesLTCG} isDark={isDark} />
          <MetricRow
            label="Net Capital Gains"
            value={netLTCG}
            isDark={isDark}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: borderStyle,
        }}
        className="flex justify-between items-center"
      >
        <span style={{ fontSize: "14px", fontWeight: 500, color: labelColor }}>
          Realised Capital Gains
        </span>
        <span style={{ fontSize: "16px", fontWeight: 700, color: valueColor }}>
          {formatCurrency(realised)}
        </span>
      </div>
    </div>
  );
}
