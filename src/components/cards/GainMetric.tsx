import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GainMetricProps {
  label: string;
  value: number;
  isLight?: boolean;
}

export const formatINR = (val: number): string => {
  const isNegative = val < 0;
  const absValue = Math.abs(val);
  const formatted = absValue.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return isNegative ? `-₹${formatted}` : `₹${formatted}`;
};

export default function GainMetric({ label, value, isLight = true }: GainMetricProps) {
  const [displayValue, setDisplayValue] = useState(0);

  // Subtle count-up or slide animation effect for values
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setDisplayValue(end);
      return;
    }

    const duration = 800; // ms
    const steps = 30;
    const stepTime = Math.abs(Math.floor(duration / steps));
    const increment = (end - start) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        start += increment;
        setDisplayValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex justify-between items-center text-sm py-1.5">
      <span style={{ color: isLight ? 'var(--color-text-secondary)' : 'rgba(255, 255, 255, 0.8)' }}>
        {label}
      </span>
      <motion.span
        key={value}
        initial={{ scale: 0.95, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          fontWeight: 600,
          color: isLight ? 'var(--color-text-primary)' : '#FFFFFF',
        }}
      >
        {formatINR(displayValue)}
      </motion.span>
    </div>
  );
}
