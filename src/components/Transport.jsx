import React from 'react';

const KEYS = ['A minor', 'C major', 'G minor', 'F# minor'];

export default function Transport({ isPlaying, togglePlay, bpm, setBpm, musicalKey, setKey }) {
  return (
    <div className="transport">
      <div className="transport-brand">
        <span className="brand-icon">🏠</span>
        <span className="brand-name">HOUSE STUDIO</span>
        <span className="brand-sub">by John Summit Mode</span>
      </div>

      <div className="transport-controls">
        <button
          className={`play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
        >
          {isPlaying ? '⏹ STOP' : '▶ PLAY'}
        </button>
      </div>

      <div className="transport-bpm">
        <label className="ctrl-label">BPM</label>
        <div className="bpm-control">
          <button className="bpm-btn" onClick={() => setBpm(b => Math.max(80, b - 1))}>−</button>
          <span className="bpm-value">{bpm}</span>
          <button className="bpm-btn" onClick={() => setBpm(b => Math.min(160, b + 1))}>+</button>
        </div>
        <input
          type="range"
          min="80"
          max="160"
          value={bpm}
          onChange={e => setBpm(Number(e.target.value))}
          className="bpm-slider"
        />
      </div>

      <div className="transport-key">
        <label className="ctrl-label">KEY</label>
        <div className="key-selector">
          {KEYS.map(k => (
            <button
              key={k}
              className={`key-btn ${musicalKey === k ? 'key-active' : ''}`}
              onClick={() => setKey(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="transport-tips">
        <div className="tip">💡 House music tip: Kick on every beat (1, 2, 3, 4)</div>
        <div className="tip">💡 Try BPM 124–130 for classic house vibes</div>
      </div>
    </div>
  );
}
