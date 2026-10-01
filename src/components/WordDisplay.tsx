import { motion } from 'framer-motion';

interface WordDisplayProps {
  word: string;
}

const letterVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, type: 'spring' as const, stiffness: 200, damping: 20 },
  }),
};

export function WordDisplay({ word }: WordDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-mono text-fg-subtle uppercase tracking-widest">
        Transliterate this word
      </p>
      <motion.div
        key={word}
        className="flex flex-wrap justify-center gap-1"
        initial="hidden"
        animate="visible"
      >
        {word.split('').map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            custom={i}
            variants={letterVariants}
            className="
              inline-flex items-center justify-center
              w-12 h-14 sm:w-14 sm:h-16
              text-3xl sm:text-4xl font-sans font-black text-fg
              border border-border rounded-[var(--radius-soft)]
              bg-surface-2
              select-none
            "
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
