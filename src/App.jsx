import React from 'react';
import Transport from './components/Transport';
import DrumMachine from './components/DrumMachine';
import { BassSequencer, LeadSequencer, AcidSequencer } from './components/NoteSequencer';
import ChordPads from './components/ChordPads';
import { useAudioEngine } from './hooks/useAudioEngine';
import './App.css';

export default function App() {
  const engine = useAudioEngine();

  return (
    <div className="app">
      <Transport
        isPlaying={engine.isPlaying}
        togglePlay={engine.togglePlay}
        bpm={engine.bpm}
        setBpm={engine.setBpm}
        musicalKey={engine.key}
        setKey={engine.setKey}
      />

      <div className="workspace">
        <DrumMachine
          drumPattern={engine.drumPattern}
          toggleDrumStep={engine.toggleDrumStep}
          randomizeDrums={engine.randomizeDrums}
          clearPattern={engine.clearPattern}
          currentStep={engine.currentStep}
        />

        <ChordPads
          musicalKey={engine.key}
          playChord={engine.playChord}
          loadProgression={engine.loadProgression}
        />

        <BassSequencer
          bassPattern={engine.bassPattern}
          toggleBassNote={engine.toggleBassNote}
          currentStep={engine.currentStep}
          musicalKey={engine.key}
        />

        <LeadSequencer
          leadPattern={engine.leadPattern}
          toggleLeadNote={engine.toggleLeadNote}
          currentStep={engine.currentStep}
          musicalKey={engine.key}
        />

        <AcidSequencer
          acidPattern={engine.acidPattern}
          toggleAcidNote={engine.toggleAcidNote}
          currentStep={engine.currentStep}
          musicalKey={engine.key}
        />
      </div>
    </div>
  );
}
