import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronDown } from 'lucide-react';

/**
 * NotesAccordion – a collapsible panel for important notes & disclaimers.
 *
 * Requirements satisfied:
 * - Collapsed height: 42px
 * - Animated expand/collapse (Framer Motion + AnimatePresence)
 * - Header contains an info icon, title, and chevron
 * - Body is a bullet list (placeholder items)
 * - Desktop hover tooltip (native title attribute) – shows "Expand notes"
 * - Mobile tap support (click toggles)
 * - Theme‑aware using CSS variables defined in theme.css
 */
export default function NotesAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <motion.div
      // Collapsed height when closed, auto height when open
      animate={{ height: isOpen ? 'auto' : 42 }}
      className="border-border border rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Header – clickable, tooltip on desktop */}
      <button
        onClick={toggle}
        title="Expand notes" // native tooltip for desktop hover
        className="flex w-full items-center justify-between px-4 py-2"
        style={{
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
        }}
      >
        <div className="flex items-center space-x-2">
          <Info size={20} style={{ color: 'var(--color-blue)' }} />
          <span>Important Notes & Disclaimers</span>
        </div>
        <ChevronDown
          size={20}
          style={{
            color: 'var(--color-text-secondary)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {/* Body – animated presence */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="px-4 pb-3"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <ul className="list-disc pl-5 space-y-1">
              <li>All calculations are illustrative only.</li>
              <li>Past performance does not guarantee future results.</li>
              <li>Consult a tax professional before executing any strategy.</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
