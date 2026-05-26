import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-baseline justify-between"
      style={{
        width: '100%',
        marginBottom: '24px',
      }}
    >
      <h1
        style={{
          fontSize: '36px',
          fontWeight: 700,
          margin: 0,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        Tax Harvesting
      </h1>
      <a
        href="#"
        style={{
          fontSize: '12px',
          color: 'var(--color-blue)',
          textDecoration: 'underline',
          textDecorationColor: 'var(--color-blue)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
        }}
      >
        How it works?
      </a>
    </motion.div>
  );
}
