import { Moon, Sun, BookOpen } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAlphabet: () => void;
}

export function Navbar({ isDark, onToggleTheme, onOpenAlphabet }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-sans font-black text-accent select-none">Я</span>
          <div>
            <h1 className="font-sans font-bold text-sm text-fg leading-none">Russian Alphabet</h1>
            <p className="text-xs text-fg-muted font-mono leading-none mt-0.5">Transliteration Trainer</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAlphabet}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-[var(--radius-soft)] border border-border hover:bg-bg-secondary text-fg-muted hover:text-fg transition-colors"
            title="Open alphabet reference"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">Alphabet</span>
          </button>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-[var(--radius-soft)] border border-border hover:bg-bg-secondary text-fg-muted hover:text-fg transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
