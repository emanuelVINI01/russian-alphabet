// Russian syllable-based word generator
// Produces plausible-sounding Russian-like words

const consonants = ['б','в','г','д','ж','з','к','л','м','н','п','р','с','т','ф','х','ц','ч','ш','щ'];
const vowels = ['а','е','ё','и','о','у','ы','э','ю','я'];
const softSign = 'ь';

// Common Russian syllable patterns
const syllablePatterns = [
  () => randomFrom(consonants) + randomFrom(vowels),
  () => randomFrom(consonants) + randomFrom(vowels),
  () => randomFrom(consonants) + randomFrom(vowels),
  () => randomFrom(vowels),
  () => randomFrom(consonants) + randomFrom(consonants) + randomFrom(vowels),
  () => randomFrom(consonants) + randomFrom(vowels) + randomFrom(consonants),
  () => randomFrom(consonants) + softSign + randomFrom(vowels),
];

// Common Russian word endings
const endings = [
  'ть', 'ние', 'ость', 'ий', 'ый', 'ая', 'ое', 'ка', 'ко', 'на', 'ло',
  'ет', 'ют', 'ат', 'ит', 'ов', 'ев', 'ин', 'ен', 'но', 'ла',
  '', '', '', '', // empty = no special ending, more frequent
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateWord(): string {
  const syllableCount = Math.floor(Math.random() * 3) + 2; // 2-4 syllables
  let word = '';
  
  for (let i = 0; i < syllableCount - 1; i++) {
    const pattern = randomFrom(syllablePatterns);
    word += pattern();
  }
  
  // Add a common ending for the last syllable
  word += randomFrom(endings);
  
  // Ensure minimum length
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
