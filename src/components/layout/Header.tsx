import { motion } from 'framer-motion';

/**
 * Header component for the Tax Harvesting dashboard.
 * It displays the page title and a small underlined link.
 * No navigation or click handling – purely presentational.
 */
export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-surface"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '14px 24px',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: 1200 }}
      >
        {/* Title */}
        <h1
          className="text-primary"
          style={{
            margin: 0,
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 24,
            color: 'var(--color-text-primary)',
          }}
        >
          Tax Harvesting
        </h1>
        {/* Small underlined link */}
        <a
          href="#"
          className="text-sm underline"
          style={{
            color: 'var(--color-blue)',
            textDecorationColor: 'var(--color-blue)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          How it works?
        </a>
      </div>
    </motion.header>
  );
}
