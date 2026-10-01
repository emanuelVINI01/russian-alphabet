// Russian syllable-based word generator
// Produces plausible-sounding Russian-like words.
//
// NOTE: ь (soft sign) and ъ (hard sign) are intentionally EXCLUDED.
// They are silent modifier letters with no Latin equivalent — including
// them would confuse beginners who see a letter but type nothing for it.

const consonants = ['б','в','г','д','ж','з','к','л','м','н','п','р','с','т','ф','х','ц','ч','ш','щ'];
const vowels     = ['а','е','ё','и','о','у','ы','э','ю','я'];

// Common Russian syllable patterns (CV, CCV, CVC — no silent signs)
const syllablePatterns = [
  (): string => randomFrom(consonants) + randomFrom(vowels),          // CV  (most common)
  (): string => randomFrom(consonants) + randomFrom(vowels),          // CV  (weight boost)
  (): string => randomFrom(consonants) + randomFrom(vowels),          // CV  (weight boost)
  (): string => randomFrom(vowels),                                    // V   (word-initial)
  (): string => randomFrom(consonants) + randomFrom(consonants) + randomFrom(vowels), // CCV
  (): string => randomFrom(consonants) + randomFrom(vowels) + randomFrom(consonants), // CVC
];

// Common Russian word endings (no ь/ъ)
const endings = [
  'ть', 'ние', 'ость', 'ий', 'ый', 'ая', 'ое', 'ка', 'ко', 'на', 'ло',
  'ет', 'ют', 'ат', 'ит', 'ов', 'ев', 'ин', 'ен', 'но', 'ла',
  '', '', '', '', // no special ending (higher probability)
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateWord(): string {
  const syllableCount = Math.floor(Math.random() * 3) + 2; // 2–4 syllables
  let word = '';

  for (let i = 0; i < syllableCount - 1; i++) {
    word += randomFrom(syllablePatterns)();
  }

  // Last part: a common ending
  word += randomFrom(endings);

  // Ensure minimum readable length
  if (word.length < 3) {
    word += randomFrom(vowels) + randomFrom(consonants) + randomFrom(vowels);
  }

  // Capitalize first letter
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generateWords(count: number = 1): string[] {
  return Array.from({ length: count }, generateWord);
}

export function generateSingleWord(): string {
  return generateWord();
}
