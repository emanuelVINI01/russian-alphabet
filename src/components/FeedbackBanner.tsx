import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Eye } from 'lucide-react';
import type { GamePhase } from '../hooks/useGame';

interface FeedbackBannerProps {
  phase: GamePhase;
  correctAnswer: string;
  userInput: string;
}

export function FeedbackBanner({ phase, correctAnswer, userInput }: FeedbackBannerProps) {
  if (phase === 'playing' || phase === 'idle') return null;

  const isCorrect = phase === 'correct';
  const isRevealed = phase === 'revealed';

  return (
    <motion.div
      key={phase}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className={`
        flex items-start gap-3 px-4 py-3 rounded-[var(--radius-soft)] border font-mono text-sm
        ${isCorrect
          ? 'bg-success-muted border-success text-success'
          : isRevealed
          ? 'bg-warning-muted border-warning text-warning'
          : 'bg-error-muted border-error text-error'
        }
      `}
    >
      <span className="mt-0.5 shrink-0">
        {isCorrect ? <CheckCircle2 size={16} /> : isRevealed ? <Eye size={16} /> : <XCircle size={16} />}
      </span>
      <div>
        {isCorrect && (
          <p>
            <strong>Correct!</strong> <span className="opacity-80">"{userInput}" ✓</span>
          </p>
        )}
        {phase === 'wrong' && (
          <p>
            <strong>Not quite.</strong>{' '}
            <span className="opacity-80">
              Expected: <strong>{correctAnswer}</strong>
            </span>
          </p>
        )}
        {isRevealed && (
          <p>
            <strong>Answer:</strong>{' '}
            <span className="opacity-80">
              <strong>{correctAnswer}</strong>
            </span>
          </p>
        )}
      </div>
    </motion.div>
  );
}
