// Transliteration map: Cyrillic → Latin (scientific/ISO 9 style)
// This is what we accept as correct answers
export const cyrillicToLatin: Record<string, string> = {
  'а': 'a',
  'б': 'b',
  'в': 'v',
  'г': 'g',
  'д': 'd',
  'е': 'e',
  'ё': 'yo',
  'ж': 'zh',
  'з': 'z',
  'и': 'i',
  'й': 'y',
  'к': 'k',
  'л': 'l',
  'м': 'm',
  'н': 'n',
  'о': 'o',
  'п': 'p',
  'р': 'r',
  'с': 's',
  'т': 't',
  'у': 'u',
  'ф': 'f',
  'х': 'kh',
  'ц': 'ts',
  'ч': 'ch',
  'ш': 'sh',
  'щ': 'shch',
  'ъ': '',
  'ы': 'y',
  'ь': '',
  'э': 'e',
  'ю': 'yu',
  'я': 'ya',
};

// Alternative accepted transliterations (more lenient)
const alternativeMap: Record<string, string[]> = {
  'е': ['e', 'ye'],
  'ё': ['yo', 'jo', 'io'],
  'ж': ['zh', 'j'],
  'х': ['kh', 'h', 'x'],
  'ц': ['ts', 'c', 'tz'],
  'ч': ['ch', 'tch'],
  'ш': ['sh'],
  'щ': ['shch', 'sch', 'sh'],
  'ъ': ['', "'", '"'],
  'ы': ['y', 'i', 'iy'],
  'ь': ["'", '', 'j'],
  'э': ['e', 'eh'],
  'ю': ['yu', 'ju', 'iu'],
  'я': ['ya', 'ja', 'ia'],
};

export function getCorrectTransliteration(word: string): string {
  return word
    .toLowerCase()
    .split('')
    .map((char) => cyrillicToLatin[char] ?? char)
    .join('');
}

export function checkTransliteration(word: string, userInput: string): boolean {
  const normalized = userInput.trim().toLowerCase();
  const correct = getCorrectTransliteration(word);
  
  if (normalized === correct) return true;
  
  // Build all alternative correct answers
  const lowerWord = word.toLowerCase();
  
  // Try to generate alternative correct answers
  const alternatives = generateAlternatives(lowerWord);
  return alternatives.includes(normalized);
}

function generateAlternatives(cyrillicWord: string): string[] {
  const chars = cyrillicWord.split('');
  let results = [''];
  
  for (const char of chars) {
    const alts = alternativeMap[char] ?? [cyrillicToLatin[char] ?? char];
    const primary = cyrillicToLatin[char] ?? char;
    const allAlts = [primary, ...alts].filter((v, i, arr) => arr.indexOf(v) === i);
    
    const newResults: string[] = [];
    for (const prev of results) {
      for (const alt of allAlts) {
        newResults.push(prev + alt);
      }
    }
    results = newResults;
  }
  
  return results;
}

// Letter-by-letter guide for the alphabet panel
export interface LetterInfo {
  cyrillic: string;
  latin: string;
  pronunciation: string;
}

export const russianAlphabet: LetterInfo[] = [
  { cyrillic: 'А а', latin: 'a', pronunciation: 'like "a" in father' },
  { cyrillic: 'Б б', latin: 'b', pronunciation: 'like "b" in bed' },
  { cyrillic: 'В в', latin: 'v', pronunciation: 'like "v" in vine' },
  { cyrillic: 'Г г', latin: 'g', pronunciation: 'like "g" in go' },
  { cyrillic: 'Д д', latin: 'd', pronunciation: 'like "d" in dog' },
  { cyrillic: 'Е е', latin: 'e/ye', pronunciation: 'like "ye" in yes' },
  { cyrillic: 'Ё ё', latin: 'yo', pronunciation: 'like "yo" in yore' },
  { cyrillic: 'Ж ж', latin: 'zh', pronunciation: 'like "s" in measure' },
  { cyrillic: 'З з', latin: 'z', pronunciation: 'like "z" in zone' },
  { cyrillic: 'И и', latin: 'i', pronunciation: 'like "ee" in see' },
  { cyrillic: 'Й й', latin: 'y', pronunciation: 'like "y" in boy' },
  { cyrillic: 'К к', latin: 'k', pronunciation: 'like "k" in kite' },
  { cyrillic: 'Л л', latin: 'l', pronunciation: 'like "l" in lamp' },
  { cyrillic: 'М м', latin: 'm', pronunciation: 'like "m" in map' },
  { cyrillic: 'Н н', latin: 'n', pronunciation: 'like "n" in note' },
  { cyrillic: 'О о', latin: 'o', pronunciation: 'like "o" in more' },
  { cyrillic: 'П п', latin: 'p', pronunciation: 'like "p" in park' },
  { cyrillic: 'Р р', latin: 'r', pronunciation: 'rolled "r"' },
  { cyrillic: 'С с', latin: 's', pronunciation: 'like "s" in sun' },
  { cyrillic: 'Т т', latin: 't', pronunciation: 'like "t" in ten' },
  { cyrillic: 'У у', latin: 'u', pronunciation: 'like "oo" in moon' },
  { cyrillic: 'Ф ф', latin: 'f', pronunciation: 'like "f" in fun' },
  { cyrillic: 'Х х', latin: 'kh', pronunciation: 'like "ch" in Bach' },
  { cyrillic: 'Ц ц', latin: 'ts', pronunciation: 'like "ts" in cats' },
  { cyrillic: 'Ч ч', latin: 'ch', pronunciation: 'like "ch" in chair' },
  { cyrillic: 'Ш ш', latin: 'sh', pronunciation: 'like "sh" in show' },
  { cyrillic: 'Щ щ', latin: 'shch', pronunciation: 'like "shch" in fresh cheese' },
  { cyrillic: 'Ъ ъ', latin: '(hard sign)', pronunciation: 'separates consonant from vowel' },
  { cyrillic: 'Ы ы', latin: 'y', pronunciation: 'deep guttural "i"' },
  { cyrillic: 'Ь ь', latin: '(soft sign)', pronunciation: 'softens preceding consonant' },
  { cyrillic: 'Э э', latin: 'e', pronunciation: 'like "e" in set' },
  { cyrillic: 'Ю ю', latin: 'yu', pronunciation: 'like "yu" in yule' },
  { cyrillic: 'Я я', latin: 'ya', pronunciation: 'like "ya" in yard' },
];
