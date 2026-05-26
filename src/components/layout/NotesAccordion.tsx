import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronDown } from 'lucide-react';

export default function NotesAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <motion.div
      animate={{ height: isOpen ? 'auto' : '42px' }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      style={{
        width: '100%',
        border: '1px solid var(--color-blue)',
        backgroundColor: 'transparent',
        borderRadius: '6px',
        overflow: 'hidden',
      }}
    >
      {/* Header Button: matches 42px height when collapsed */}
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between focus:outline-none"
        style={{
          height: '40px', // 42px minus borders
          padding: '0 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        <div className="flex items-center space-x-2">
          <Info size={16} style={{ color: 'var(--color-blue)' }} />
          <span style={{ color: 'var(--color-text-primary)' }}>Important Notes & Disclaimers</span>
        </div>
        <ChevronDown
          size={16}
          style={{
            color: 'var(--color-text-secondary)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              padding: '12px 16px',
              borderTop: '1px solid rgba(22, 119, 255, 0.2)',
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              lineHeight: '1.6',
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
