import { Flame, Target, Percent } from 'lucide-react';
import type { GameState } from '../hooks/useGame';

interface StatsBarProps {
  state: GameState;
}

export function StatsBar({ state }: StatsBarProps) {
  const accuracy =
    state.totalAttempts > 0
      ? Math.round((state.correctAttempts / state.totalAttempts) * 100)
      : 0;

  const stats = [
    {
      icon: <Flame size={14} />,
      label: 'Streak',
      value: state.streak,
      highlight: state.streak >= 3,
    },
    {
      icon: <Target size={14} />,
      label: 'Attempts',
      value: state.totalAttempts,
      highlight: false,
    },
    {
      icon: <Percent size={14} />,
      label: 'Accuracy',
      value: `${accuracy}%`,
      highlight: accuracy >= 80 && state.totalAttempts > 0,
    },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {stats.map(({ icon, label, value, highlight }) => (
        <div
          key={label}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-soft)] border font-mono text-xs
            transition-colors
            ${highlight
              ? 'border-accent text-accent bg-accent-muted'
              : 'border-border text-fg-muted bg-surface'
            }
          `}
        >
          <span className="opacity-70">{icon}</span>
          <span className="font-bold tabular-nums">{value}</span>
          <span className="hidden sm:inline opacity-60">{label}</span>
        </div>
      ))}
    </div>
  );
}
