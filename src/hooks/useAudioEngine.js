import { useRef, useState, useCallback, useEffect } from 'react';
import * as Tone from 'tone';
import {
  createKick, createSnare, createHihat, createClap,
  createLeadSynth, createBassSynth, createChordSynth, createAcidSynth,
} from '../audio/instruments';
import { CHORD_PRESETS, BASS_NOTES, ACID_NOTES, SCALES } from '../audio/scales';

const STEPS = 16;

const defaultDrums = {
  kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
  snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
  hihat: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0],
  clap:  [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
};

const defaultBassPattern = Array(STEPS).fill(null);
defaultBassPattern[0] = 0;
defaultBassPattern[4] = 0;
defaultBassPattern[8] = 2;
defaultBassPattern[12] = 1;

const defaultLeadPattern = Array(STEPS).fill(null);
defaultLeadPattern[0] = 4;
defaultLeadPattern[2] = 4;
defaultLeadPattern[4] = 5;
defaultLeadPattern[8] = 4;
defaultLeadPattern[10] = 3;

const defaultAcidPattern = Array(STEPS).fill(null);
defaultAcidPattern[0] = 0;
defaultAcidPattern[3] = 1;
defaultAcidPattern[6] = 0;
defaultAcidPattern[9] = 2;
defaultAcidPattern[12] = 0;
defaultAcidPattern[14] = 3;

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(126);
  const [currentStep, setCurrentStep] = useState(-1);
  const [key, setKey] = useState('A minor');

  const [drumPattern, setDrumPattern] = useState(defaultDrums);
  const [bassPattern, setBassPattern] = useState(defaultBassPattern);
  const [leadPattern, setLeadPattern] = useState(defaultLeadPattern);
  const [acidPattern, setAcidPattern] = useState(defaultAcidPattern);

  // Chord pads: which chord is "on" right now
  const [activeChords, setActiveChords] = useState([]);

  const instruments = useRef(null);
  const sequencer = useRef(null);

  const initInstruments = useCallback(() => {
    if (instruments.current) return;
    instruments.current = {
      kick: createKick(),
      snare: createSnare(),
      hihat: createHihat('closed'),
      clap: createClap(),
      lead: createLeadSynth(),
      bass: createBassSynth(),
      chords: createChordSynth(),
      acid: createAcidSynth(),
    };
  }, []);

  const stopSequencer = useCallback(() => {
    if (sequencer.current) {
      sequencer.current.stop();
      sequencer.current.dispose();
      sequencer.current = null;
    }
    Tone.getTransport().stop();
    setCurrentStep(-1);
    setIsPlaying(false);
  }, []);

  const startSequencer = useCallback((
    drumPat, bassPat, leadPat, acidPat, activeChordsArg, currentKey, currentBpm
  ) => {
    Tone.getTransport().bpm.value = currentBpm;

    let step = 0;
    sequencer.current = new Tone.Sequence(
      (time) => {
        const ins = instruments.current;
        const s = step % STEPS;

        // drums
        if (drumPat.kick[s])  ins.kick.trigger(time);
        if (drumPat.snare[s]) ins.snare.trigger(time);
        if (drumPat.hihat[s]) ins.hihat.trigger(time);
        if (drumPat.clap[s])  ins.clap.trigger(time);

        // bass
        const bassNote = bassPat[s];
        if (bassNote !== null) {
          const notes = BASS_NOTES[currentKey];
          ins.bass.triggerAttackRelease(notes[bassNote], '8n', time);
        }

        // lead
        const leadNote = leadPat[s];
        if (leadNote !== null) {
          const notes = SCALES[currentKey];
          ins.lead.triggerAttackRelease(notes[leadNote], '8n', time);
        }

        // acid
        const acidNote = acidPat[s];
        if (acidNote !== null) {
          const notes = ACID_NOTES[currentKey];
          ins.acid.triggerAttackRelease(notes[acidNote], '16n', time);
        }

        Tone.getDraw().schedule(() => setCurrentStep(s), time);
        step++;
      },
      [...Array(STEPS).keys()],
      '16n'
    );

    sequencer.current.start(0);
    Tone.getTransport().start();
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(async () => {
    await Tone.start();
    initInstruments();

    if (isPlaying) {
      stopSequencer();
    } else {
      if (sequencer.current) {
        sequencer.current.stop();
        sequencer.current.dispose();
        sequencer.current = null;
      }
      startSequencer(drumPattern, bassPattern, leadPattern, acidPattern, activeChords, key, bpm);
    }
  }, [isPlaying, drumPattern, bassPattern, leadPattern, acidPattern, activeChords, key, bpm,
      initInstruments, stopSequencer, startSequencer]);

  // Update BPM live
  useEffect(() => {
    Tone.getTransport().bpm.value = bpm;
  }, [bpm]);

  // Chord pad: play chord immediately on press
  const playChord = useCallback(async (chordName) => {
    await Tone.start();
    initInstruments();
    const chords = CHORD_PRESETS[key];
    if (chords && chords[chordName]) {
      instruments.current.chords.triggerAttackRelease(chords[chordName], '2n');
    }
  }, [key, initInstruments]);

  const toggleDrumStep = useCallback((drum, step) => {
    setDrumPattern(prev => ({
      ...prev,
      [drum]: prev[drum].map((v, i) => i === step ? (v ? 0 : 1) : v),
    }));
  }, []);

  const toggleBassNote = useCallback((step, noteIdx) => {
    setBassPattern(prev => prev.map((v, i) => {
      if (i !== step) return v;
      return v === noteIdx ? null : noteIdx;
    }));
  }, []);

  const toggleLeadNote = useCallback((step, noteIdx) => {
    setLeadPattern(prev => prev.map((v, i) => {
      if (i !== step) return v;
      return v === noteIdx ? null : noteIdx;
    }));
  }, []);

  const toggleAcidNote = useCallback((step, noteIdx) => {
    setAcidPattern(prev => prev.map((v, i) => {
      if (i !== step) return v;
      return v === noteIdx ? null : noteIdx;
    }));
  }, []);

  const randomizeDrums = useCallback(() => {
    setDrumPattern({
      kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0].map((v,i) => i%4===0 ? 1 : Math.random()>0.85?1:0),
      snare: Array(16).fill(0).map((_,i) => i===4||i===12 ? 1 : Math.random()>0.92?1:0),
      hihat: Array(16).fill(0).map((_,i) => Math.random()>0.45?1:0),
      clap:  Array(16).fill(0).map((_,i) => i===4||i===12 ? 1 : Math.random()>0.96?1:0),
    });
  }, []);

  const clearPattern = useCallback((type) => {
    if (type === 'drums') setDrumPattern({ kick: Array(16).fill(0), snare: Array(16).fill(0), hihat: Array(16).fill(0), clap: Array(16).fill(0) });
    if (type === 'bass') setBassPattern(Array(16).fill(null));
    if (type === 'lead') setLeadPattern(Array(16).fill(null));
    if (type === 'acid') setAcidPattern(Array(16).fill(null));
  }, []);

  const loadProgression = useCallback((chordNames) => {
    // Spread chords across the 16 steps, 4 steps per chord
    const newLead = Array(16).fill(null);
    const newBass = Array(16).fill(null);
    chordNames.forEach((chordName, ci) => {
      const step = ci * 4;
      const chords = CHORD_PRESETS[key];
      if (!chords || !chords[chordName]) return;
      // Map chord root to bass note
      const bassNotes = BASS_NOTES[key];
      const chordRoot = chords[chordName][0];
      const bassIdx = bassNotes.findIndex(n => n.replace(/\d/, '') === chordRoot.replace(/\d/, ''));
      if (bassIdx >= 0) newBass[step] = bassIdx;
      // melody hint from scale
      const scale = SCALES[key];
      const leadIdx = Math.floor(Math.random() * 6) + 4;
      newLead[step] = Math.min(leadIdx, scale.length - 1);
      if (step + 2 < 16) newLead[step + 2] = Math.min(leadIdx - 1, scale.length - 1);
    });
    setBassPattern(newBass);
    setLeadPattern(newLead);
  }, [key]);

  useEffect(() => {
    return () => {
      stopSequencer();
      if (instruments.current) {
        Object.values(instruments.current).forEach(ins => {
          if (ins && typeof ins.dispose === 'function') ins.dispose();
          else if (ins && ins.dispose) ins.dispose();
        });
        instruments.current = null;
      }
    };
  }, [stopSequencer]);

  return {
    isPlaying, togglePlay,
    bpm, setBpm,
    currentStep,
    key, setKey,
    drumPattern, toggleDrumStep, randomizeDrums,
    bassPattern, toggleBassNote,
    leadPattern, toggleLeadNote,
    acidPattern, toggleAcidNote,
    clearPattern,
    playChord,
    loadProgression,
    activeChords,
  };
}
