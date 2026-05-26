import { motion } from 'framer-motion';
import { Menu, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle('dark');
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-surface"
      style={{
        height: '72px',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between h-full px-4 sm:px-6"
        style={{ maxWidth: '1220px' }}
      >
        {/* Logo */}
        <span
          style={{
            fontWeight: 700,
            fontSize: '20px',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          KoinX
        </span>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="focus:outline-none mr-2"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Sun size={20} className="block dark:hidden" color="var(--color-text-secondary)" />
          <Moon size={20} className="hidden dark:block" color="var(--color-text-secondary)" />
        </button>
        {/* Menu icon (mobile) */}
        <button
          className="sm:hidden focus:outline-none"
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <Menu size={24} style={{ color: 'var(--color-text-secondary)' }} />
        </button>
      </div>
    </motion.nav>
  );
}
