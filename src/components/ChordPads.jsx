import React from 'react';
import { CHORD_PRESETS, PROGRESSIONS } from '../audio/scales';

const CHORD_COLORS = ['pad-c1', 'pad-c2', 'pad-c3', 'pad-c4', 'pad-c5', 'pad-c6'];

export default function ChordPads({ musicalKey, playChord, loadProgression }) {
  const chords = CHORD_PRESETS[musicalKey] || {};
  const chordNames = Object.keys(chords);
  const progressions = PROGRESSIONS[musicalKey] || [];

  return (
    <div className="panel chord-panel">
      <div className="panel-header">
        <span className="panel-title">🎵 CHORD PADS</span>
        <span className="panel-subtitle">tap to hear · load progression to sequence</span>
      </div>

      <div className="chord-pads">
        {chordNames.map((name, i) => (
          <button
            key={name}
            className={`chord-pad ${CHORD_COLORS[i % CHORD_COLORS.length]}`}
            onMouseDown={() => playChord(name)}
          >
            <span className="chord-name">{name}</span>
            <span className="chord-notes">{(chords[name] || []).map(n => n.replace(/\d/, '')).join(' - ')}</span>
          </button>
        ))}
      </div>

      <div className="progressions">
        <div className="progressions-title">Quick Progressions</div>
        <div className="progression-list">
          {progressions.map((prog) => (
            <button
              key={prog.name}
              className="progression-btn"
              onClick={() => loadProgression(prog.chords)}
            >
              <span className="prog-name">{prog.name}</span>
              <span className="prog-chords">{prog.chords.join(' → ')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
