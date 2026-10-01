# Russian Alphabet 🇷🇺

A minimal, beautiful **Cyrillic transliteration trainer** built with React + TypeScript + Tailwind CSS v4.

Random Russian-like words appear (generated syllabically to sound authentic). You type the Latin transliteration — the app checks your answer with multiple accepted alternatives.

## Features

- 🎲 **Random word generator** — syllable-based Cyrillic words that sound plausibly Russian
- ✅ **Lenient checker** — accepts multiple valid transliteration conventions (e.g. `ya` / `ja` / `ia` for `я`)
- 📖 **Alphabet reference** — sliding panel with all 33 letters, transliterations & pronunciation
- 🔥 **Streak & accuracy tracking** — per-session stats
- 🌙 **Dark / Light theme** — follows system preference, persisted in localStorage
- ⌨️ **Keyboard-first** — press Enter to submit, auto-focus on new word
- 🎨 **Swiss-learn design system** — Alpenglow palette, directional shadows, Bricolage Grotesque + DM Mono

## Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Framer Motion](https://www.framer.com/motion/) — word entrance & feedback animations
- [Lucide React](https://lucide.dev/) — icons

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── AlphabetDrawer.tsx   # Sliding alphabet reference panel
│   ├── FeedbackBanner.tsx   # Correct / wrong / revealed feedback
│   ├── Navbar.tsx           # Top navigation bar
│   ├── StatsBar.tsx         # Streak, attempts & accuracy
│   └── WordDisplay.tsx      # Animated letter cards
├── hooks/
│   ├── useGame.ts           # Core game state machine
│   └── useTheme.ts          # Dark/light theme persistence
├── lib/
│   ├── transliteration.ts   # Cyrillic → Latin map + checker
│   └── word-generator.ts    # Syllabic Russian word generator
├── styles/
│   └── globals.css          # Tailwind v4 + design tokens
├── App.tsx
└── main.tsx
```
