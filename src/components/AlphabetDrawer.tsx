import { russianAlphabet } from '../lib/transliteration';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface AlphabetDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function AlphabetDrawer({ open, onClose }: AlphabetDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-fg/20 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: open ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 z-50 h-full w-80 bg-surface border-l border-border overflow-y-auto"
        style={{ boxShadow: 'var(--shadow-lg)' }}
      >
        <div className="sticky top-0 bg-surface border-b border-border px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-sans font-bold text-lg text-fg">Алфавит</h2>
            <p className="text-xs text-fg-muted">Russian Alphabet</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[var(--radius-soft)] border border-border hover:bg-bg-secondary transition-colors text-fg-muted hover:text-fg"
            aria-label="Close alphabet panel"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {russianAlphabet.map((letter) => (
            <div
              key={letter.cyrillic}
              className="flex items-start gap-3 p-3 rounded-[var(--radius-soft)] border border-border-soft bg-surface-2 hover:border-border transition-colors"
            >
              <span
                className="text-2xl font-sans font-bold text-accent leading-none mt-0.5 min-w-[2.5rem]"
              >
                {letter.cyrillic.split(' ')[0]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-fg font-mono">{letter.latin}</span>
                  <span className="text-xs text-fg-subtle font-mono">{letter.cyrillic}</span>
                </div>
                <p className="text-xs text-fg-muted mt-0.5 leading-snug">{letter.pronunciation}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.aside>
    </>
  );
}
