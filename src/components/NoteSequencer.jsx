import React from 'react';
import { SCALES, BASS_NOTES, ACID_NOTES } from '../audio/scales';

function PianoRollGrid({ pattern, noteList, onToggle, currentStep, noteColor, label, icon }) {
  // Show only top 8 notes for compactness, reversed so high notes at top
  const displayNotes = [...noteList].reverse().slice(0, 8);
  const displayIndices = displayNotes.map(n => noteList.indexOf(n));

  return (
    <div className="panel sequencer-panel">
      <div className="panel-header">
        <span className="panel-title">{icon} {label}</span>
      </div>
      <div className="piano-roll">
        <div className="pr-note-labels">
          {displayNotes.map((note, i) => (
            <div key={i} className="pr-note-label">{note.replace(/\d/, '')}</div>
          ))}
        </div>
        <div className="pr-grid">
          {displayNotes.map((note, rowIdx) => {
            const noteIdx = displayIndices[rowIdx];
            return (
              <div key={rowIdx} className={`pr-row ${rowIdx % 2 === 0 ? 'pr-row-alt' : ''}`}>
                {Array.from({ length: 16 }, (_, stepIdx) => {
                  const isActive = pattern[stepIdx] === noteIdx;
                  const isPlaying = currentStep === stepIdx;
                  return (
                    <button
                      key={stepIdx}
                      className={[
                        'pr-step',
                        isActive ? `pr-step-on ${noteColor}` : '',
                        isPlaying ? 'pr-step-playing' : '',
                        [0,4,8,12].includes(stepIdx) ? 'beat-start' : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => onToggle(stepIdx, noteIdx)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function BassSequencer({ bassPattern, toggleBassNote, currentStep, musicalKey }) {
  const notes = BASS_NOTES[musicalKey] || BASS_NOTES['A minor'];
  return (
    <PianoRollGrid
      pattern={bassPattern}
      noteList={notes}
      onToggle={toggleBassNote}
      currentStep={currentStep}
      noteColor="note-bass"
      label="BASS LINE"
      icon="🎸"
    />
  );
}

export function LeadSequencer({ leadPattern, toggleLeadNote, currentStep, musicalKey }) {
  const notes = (SCALES[musicalKey] || SCALES['A minor']).slice(0, 8);
  return (
    <PianoRollGrid
      pattern={leadPattern}
      noteList={notes}
      onToggle={toggleLeadNote}
      currentStep={currentStep}
      noteColor="note-lead"
      label="LEAD MELODY"
      icon="🎹"
    />
  );
}

export function AcidSequencer({ acidPattern, toggleAcidNote, currentStep, musicalKey }) {
  const notes = ACID_NOTES[musicalKey] || ACID_NOTES['A minor'];
  return (
    <PianoRollGrid
      pattern={acidPattern}
      noteList={notes}
      onToggle={toggleAcidNote}
      currentStep={currentStep}
      noteColor="note-acid"
      label="ACID / RIFF"
      icon="⚡"
    />
  );
}
