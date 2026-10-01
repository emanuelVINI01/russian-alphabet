import { useState, useCallback } from 'react';
import { generateSingleWord } from '../lib/word-generator';
import { checkTransliteration, getCorrectTransliteration } from '../lib/transliteration';

export type GamePhase = 'idle' | 'playing' | 'correct' | 'wrong' | 'revealed';

export interface GameState {
  word: string;
  correctAnswer: string;
  userInput: string;
  phase: GamePhase;
  streak: number;
  totalAttempts: number;
  correctAttempts: number;
  wrongAttempts: number;
}

const initialState: GameState = {
  word: '',
  correctAnswer: '',
  userInput: '',
  phase: 'idle',
  streak: 0,
  totalAttempts: 0,
  correctAttempts: 0,
  wrongAttempts: 0,
};

export function useGame() {
  const [state, setState] = useState<GameState>(initialState);

  const newWord = useCallback(() => {
    const word = generateSingleWord();
    setState((prev) => ({
      ...prev,
      word,
      correctAnswer: getCorrectTransliteration(word),
      userInput: '',
      phase: 'playing',
    }));
  }, []);

  const setInput = useCallback((value: string) => {
    setState((prev) => ({ ...prev, userInput: value }));
  }, []);

  const submit = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== 'playing') return prev;
      const isCorrect = checkTransliteration(prev.word, prev.userInput);

      return {
        ...prev,
        phase: isCorrect ? 'correct' : 'wrong',
        streak: isCorrect ? prev.streak + 1 : 0,
        totalAttempts: prev.totalAttempts + 1,
        correctAttempts: prev.correctAttempts + (isCorrect ? 1 : 0),
        wrongAttempts: prev.wrongAttempts + (isCorrect ? 0 : 1),
      };
    });
  }, []);

  const reveal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: 'revealed',
      streak: 0,
      totalAttempts: prev.totalAttempts + (prev.phase === 'playing' ? 1 : 0),
      wrongAttempts: prev.wrongAttempts + (prev.phase === 'playing' ? 1 : 0),
    }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return { state, newWord, setInput, submit, reveal, reset };
}
