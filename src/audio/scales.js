// House music friendly keys and scales

export const SCALES = {
  'A minor': ['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'],
  'C major': ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4'],
  'G minor': ['G3', 'A3', 'Bb3', 'C4', 'D4', 'Eb4', 'F4', 'G4', 'A4', 'Bb4', 'C5', 'D5'],
  'F# minor': ['F#3', 'G#3', 'A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G#4', 'A4', 'B4', 'C#5'],
};

export const CHORD_PRESETS = {
  'A minor': {
    'Am': ['A3', 'C4', 'E4'],
    'F': ['F3', 'A3', 'C4'],
    'C': ['C4', 'E4', 'G4'],
    'G': ['G3', 'B3', 'D4'],
    'Dm': ['D3', 'F3', 'A3'],
    'Em': ['E3', 'G3', 'B3'],
  },
  'C major': {
    'C': ['C4', 'E4', 'G4'],
    'Am': ['A3', 'C4', 'E4'],
    'F': ['F3', 'A3', 'C4'],
    'G': ['G3', 'B3', 'D4'],
    'Dm': ['D4', 'F4', 'A4'],
    'Em': ['E4', 'G4', 'B4'],
  },
  'G minor': {
    'Gm': ['G3', 'Bb3', 'D4'],
    'Cm': ['C4', 'Eb4', 'G4'],
    'Bb': ['Bb3', 'D4', 'F4'],
    'Eb': ['Eb4', 'G4', 'Bb4'],
    'Dm': ['D4', 'F4', 'A4'],
    'F': ['F3', 'A3', 'C4'],
  },
  'F# minor': {
    'F#m': ['F#3', 'A3', 'C#4'],
    'D': ['D3', 'F#3', 'A3'],
    'A': ['A3', 'C#4', 'E4'],
    'E': ['E3', 'G#3', 'B3'],
    'Bm': ['B3', 'D4', 'F#4'],
    'C#m': ['C#4', 'E4', 'G#4'],
  },
};

export const BASS_NOTES = {
  'A minor': ['A2', 'C3', 'D3', 'E3', 'F3', 'G3'],
  'C major': ['C2', 'D2', 'E2', 'F2', 'G2', 'A2'],
  'G minor': ['G2', 'Bb2', 'C3', 'D3', 'Eb3', 'F3'],
  'F# minor': ['F#2', 'A2', 'B2', 'C#3', 'D3', 'E3'],
};

export const ACID_NOTES = {
  'A minor': ['A1', 'A2', 'E2', 'D2', 'C2', 'G2'],
  'C major': ['C2', 'G2', 'F2', 'E2', 'A2', 'D2'],
  'G minor': ['G1', 'G2', 'D2', 'C2', 'Bb1', 'F2'],
  'F# minor': ['F#1', 'F#2', 'C#2', 'B1', 'A1', 'E2'],
};

// John Summit style chord progressions
export const PROGRESSIONS = {
  'A minor': [
    { name: 'Classic House', chords: ['Am', 'F', 'C', 'G'] },
    { name: 'Deep Vibe', chords: ['Am', 'Dm', 'G', 'C'] },
    { name: 'Summit Style', chords: ['Am', 'G', 'F', 'Em'] },
  ],
  'C major': [
    { name: 'Uplifting', chords: ['C', 'Am', 'F', 'G'] },
    { name: 'Feel Good', chords: ['C', 'G', 'Am', 'F'] },
    { name: 'Club Energy', chords: ['C', 'F', 'G', 'Am'] },
  ],
  'G minor': [
    { name: 'Dark Groove', chords: ['Gm', 'Cm', 'Bb', 'Eb'] },
    { name: 'Underground', chords: ['Gm', 'Dm', 'Bb', 'F'] },
    { name: 'Festival', chords: ['Gm', 'Bb', 'Eb', 'F'] },
  ],
  'F# minor': [
    { name: 'Tech House', chords: ['F#m', 'D', 'A', 'E'] },
    { name: 'Peak Time', chords: ['F#m', 'Bm', 'D', 'A'] },
    { name: 'DJ Booth', chords: ['F#m', 'A', 'E', 'D'] },
  ],
};
