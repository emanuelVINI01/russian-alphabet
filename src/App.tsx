import { useRef, useEffect, useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, RefreshCcw, Shuffle } from 'lucide-react';

import { useGame } from './hooks/useGame';
import { useTheme } from './hooks/useTheme';

import { Navbar } from './components/Navbar';
import { AlphabetDrawer } from './components/AlphabetDrawer';
import { WordDisplay } from './components/WordDisplay';
import { FeedbackBanner } from './components/FeedbackBanner';
import { StatsBar } from './components/StatsBar';

export default function App() {
  const { isDark, toggle: toggleTheme } = useTheme();
  const { state, newWord, setInput, submit, reveal, reset } = useGame();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const canSubmit = state.phase === 'playing' && state.userInput.trim().length > 0;
  const afterAnswer = state.phase === 'correct' || state.phase === 'wrong' || state.phase === 'revealed';

  // Auto-focus input when a new word appears
  useEffect(() => {
    if (state.phase === 'playing') {
      inputRef.current?.focus();
    }
  }, [state.word, state.phase]);

  // Global Enter listener: advances to next word when answer is already shown
  // (catches Enter even when input is disabled/unfocused after submitting)
  useEffect(() => {
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key !== 'Enter') return;
      // Let the input's own handler deal with it while the input is focused
      if (document.activeElement === inputRef.current) return;
      if (afterAnswer) newWord();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [afterAnswer, newWord]);

  // Input Enter: first press confirms, second press (input still focused) advances
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    if (canSubmit) {
      submit();
    } else if (afterAnswer) {
      newWord();
    }
  }

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenAlphabet={() => setDrawerOpen(true)}
      />

      <AlphabetDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-8 sm:py-12 max-w-2xl mx-auto w-full gap-8">

        {/* Hero / Idle */}
        <AnimatePresence mode="wait">
          {state.phase === 'idle' ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex flex-col items-center gap-6 text-center mt-8"
            >
              <div
                className="w-24 h-24 rounded-[var(--radius-soft)] border-2 border-accent bg-accent-muted flex items-center justify-center"
                style={{ boxShadow: 'var(--shadow-editorial)' }}
              >
                <span className="text-5xl font-sans font-black text-accent select-none">Я</span>
              </div>
              <div>
                <h2 className="font-sans font-black text-2xl sm:text-3xl text-fg">
                  Learn to read Russian
                </h2>
                <p className="mt-2 text-sm text-fg-muted font-mono max-w-xs">
                  Random Cyrillic words appear. Type the Latin transliteration to score points.
                </p>
              </div>
              <button
                onClick={newWord}
                className="flex items-center gap-2 px-6 py-3 rounded-[var(--radius-soft)] border-2 border-accent bg-accent text-white font-mono font-bold text-sm hover:bg-accent-hover hover:border-accent-hover transition-colors"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                <Shuffle size={16} />
                Start Training
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="w-full flex flex-col gap-6"
            >
              {/* Stats */}
              <div className="flex items-center justify-between">
                <StatsBar state={state} />
                <button
                  onClick={reset}
                  className="p-2 rounded-[var(--radius-soft)] border border-border text-fg-muted hover:text-fg hover:bg-bg-secondary transition-colors"
                  title="Reset session"
                >
                  <RefreshCcw size={14} />
                </button>
              </div>

              {/* Word card */}
              <div
                className="w-full rounded-[var(--radius-soft)] border border-border bg-surface p-6 sm:p-8 flex flex-col gap-6"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={state.word}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                  >
                    <WordDisplay word={state.word} />
                  </motion.div>
                </AnimatePresence>

                {/* Input area */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={state.userInput}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={afterAnswer}
                      placeholder="Type in Latin letters…"
                      spellCheck={false}
                      autoComplete="off"
                      autoCapitalize="off"
                      className={`
                        flex-1 px-4 py-3 rounded-[var(--radius-soft)] border font-mono text-sm
                        bg-surface-2 text-fg placeholder:text-fg-subtle
                        outline-none transition-colors
                        disabled:opacity-60 disabled:cursor-not-allowed
                        ${state.phase === 'correct'
                          ? 'border-success ring-1 ring-success'
                          : state.phase === 'wrong'
                          ? 'border-error ring-1 ring-error'
                          : 'border-border focus:border-accent focus:ring-1 focus:ring-accent'
                        }
                      `}
                    />
                    {!afterAnswer && (
                      <button
                        onClick={submit}
                        disabled={!canSubmit}
                        className="px-4 py-3 rounded-[var(--radius-soft)] border-2 border-accent bg-accent text-white font-mono text-sm font-bold hover:bg-accent-hover hover:border-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ boxShadow: canSubmit ? 'var(--shadow-sm)' : 'none' }}
                      >
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>

                  {/* Reveal / Next buttons */}
                  <div className="flex gap-2">
                    {!afterAnswer && (
                      <button
                        onClick={reveal}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-subtle)] border border-border text-xs font-mono text-fg-muted hover:text-fg hover:bg-bg-secondary transition-colors"
                      >
                        <Eye size={12} />
                        Reveal answer
                      </button>
                    )}
                    {afterAnswer && (
                      <button
                        onClick={newWord}
                        className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-soft)] border-2 border-accent bg-accent text-white font-mono text-sm font-bold hover:bg-accent-hover hover:border-accent-hover transition-colors"
                        style={{ boxShadow: 'var(--shadow-sm)' }}
                      >
                        <Shuffle size={14} />
                        Next word
                      </button>
                    )}
                  </div>
                </div>

                {/* Feedback */}
                <AnimatePresence mode="wait">
                  <FeedbackBanner
                    phase={state.phase}
                    correctAnswer={state.correctAnswer}
                    userInput={state.userInput}
                  />
                </AnimatePresence>
              </div>

              {/* Hint */}
              <p className="text-center text-xs text-fg-subtle font-mono">
                Press <kbd className="px-1 py-0.5 rounded border border-border bg-bg-secondary text-fg-muted">Enter</kbd> to submit
                {' · '}
                Open <strong>Alphabet</strong> for reference
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-border py-4 px-6">
        <p className="text-center text-xs text-fg-subtle font-mono">
          Russian Alphabet Trainer · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
