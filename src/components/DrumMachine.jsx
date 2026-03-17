import React from 'react';

const DRUM_LABELS = {
  kick:  { label: 'KICK',  icon: '🥁' },
  snare: { label: 'SNARE', icon: '🪘' },
  hihat: { label: 'HI-HAT', icon: '🎵' },
  clap:  { label: 'CLAP',  icon: '👏' },
};

const GROUPS = [0, 4, 8, 12]; // beat groupings

export default function DrumMachine({ drumPattern, toggleDrumStep, randomizeDrums, clearPattern, currentStep }) {
  return (
    <div className="panel drum-panel">
      <div className="panel-header">
        <span className="panel-title">🥁 DRUM MACHINE</span>
        <div className="panel-actions">
          <button className="btn btn-sm" onClick={randomizeDrums}>Randomize</button>
          <button className="btn btn-sm btn-danger" onClick={() => clearPattern('drums')}>Clear</button>
        </div>
      </div>

      <div className="drum-grid">
        {/* Step numbers */}
        <div className="drum-row drum-labels-row">
          <div className="drum-row-label" />
          {Array.from({ length: 16 }, (_, i) => (
            <div
              key={i}
              className={`step-num ${GROUPS.includes(i) ? 'beat-marker' : ''} ${currentStep === i ? 'active-step-num' : ''}`}
            >
              {GROUPS.includes(i) ? Math.floor(i / 4) + 1 : '·'}
            </div>
          ))}
        </div>

        {Object.entries(DRUM_LABELS).map(([drum, { label, icon }]) => (
          <div key={drum} className="drum-row">
            <div className="drum-row-label">
              <span className="drum-icon">{icon}</span>
              <span className="drum-name">{label}</span>
            </div>
            {drumPattern[drum].map((active, stepIdx) => (
              <button
                key={stepIdx}
                className={[
                  'step-btn',
                  active ? 'step-on' : '',
                  currentStep === stepIdx ? 'step-playing' : '',
                  GROUPS.includes(stepIdx) ? 'beat-start' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => toggleDrumStep(drum, stepIdx)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
