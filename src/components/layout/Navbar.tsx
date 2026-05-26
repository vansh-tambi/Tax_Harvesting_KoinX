import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

// Navbar component – shows the KoinX logo and, on mobile, a hamburger icon.
export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
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
        {/* Logo */}
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
        {/* Hamburger – visible only on mobile */}
        <Menu
          size={24}
          className="sm:hidden text-secondary"
          style={{ color: 'var(--color-text-secondary)' }}
        />
      </div>
    </motion.nav>
  );
}
