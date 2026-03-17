import * as Tone from 'tone';

// ── Drum sounds ──────────────────────────────────────────────────────────────

export function createKick() {
  const env = new Tone.AmplitudeEnvelope({ attack: 0.001, decay: 0.3, sustain: 0, release: 0.1 }).toDestination();
  const osc = new Tone.Oscillator({ type: 'sine', frequency: 60 }).connect(env);
  const pitchEnv = new Tone.FrequencyEnvelope({ attack: 0.001, decay: 0.15, sustain: 0, release: 0.1, baseFrequency: 60, octaves: 3 });
  pitchEnv.connect(osc.frequency);
  return {
    trigger(time) {
      osc.start(time).stop(time + 0.5);
      env.triggerAttackRelease(0.4, time);
      pitchEnv.triggerAttackRelease(0.4, time);
    },
    dispose() { osc.dispose(); env.dispose(); pitchEnv.dispose(); },
  };
}

export function createSnare() {
  const noise = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.18, sustain: 0, release: 0.05 },
    volume: -6,
  }).toDestination();
  const osc = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 3,
    envelope: { attack: 0.001, decay: 0.12, sustain: 0, release: 0.05 },
    volume: -10,
  }).toDestination();
  return {
    trigger(time) {
      noise.triggerAttackRelease('16n', time);
      osc.triggerAttackRelease('D2', '16n', time);
    },
    dispose() { noise.dispose(); osc.dispose(); },
  };
}

export function createHihat(type = 'closed') {
  const filter = new Tone.Filter({ frequency: type === 'open' ? 8000 : 12000, type: 'highpass' }).toDestination();
  const noise = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: type === 'open' ? 0.25 : 0.05, sustain: 0, release: 0.02 },
    volume: -14,
  }).connect(filter);
  return {
    trigger(time) { noise.triggerAttackRelease('32n', time); },
    dispose() { noise.dispose(); filter.dispose(); },
  };
}

export function createClap() {
  const reverb = new Tone.Reverb({ decay: 0.4, wet: 0.3 }).toDestination();
  const noise = new Tone.NoiseSynth({
    noise: { type: 'pink' },
    envelope: { attack: 0.001, decay: 0.14, sustain: 0, release: 0.05 },
    volume: -8,
  }).connect(reverb);
  return {
    trigger(time) {
      noise.triggerAttackRelease('16n', time);
      noise.triggerAttackRelease('16n', time + 0.01);
      noise.triggerAttackRelease('16n', time + 0.02);
    },
    dispose() { noise.dispose(); reverb.dispose(); },
  };
}

// ── Synth sounds ──────────────────────────────────────────────────────────────

export function createLeadSynth() {
  const reverb = new Tone.Reverb({ decay: 1.2, wet: 0.25 }).toDestination();
  const delay = new Tone.PingPongDelay({ delayTime: '8n', feedback: 0.2, wet: 0.15 }).connect(reverb);
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.02, decay: 0.3, sustain: 0.4, release: 0.8 },
    filter: { frequency: 2000, type: 'lowpass', rolloff: -24 },
    filterEnvelope: { attack: 0.02, decay: 0.3, sustain: 0.5, release: 0.5, baseFrequency: 300, octaves: 3 },
    volume: -8,
  }).connect(delay);
  return synth;
}

export function createBassSynth() {
  const comp = new Tone.Compressor({ threshold: -20, ratio: 4 }).toDestination();
  const synth = new Tone.MonoSynth({
    oscillator: { type: 'square' },
    envelope: { attack: 0.005, decay: 0.2, sustain: 0.6, release: 0.3 },
    filter: { frequency: 500, type: 'lowpass', rolloff: -24 },
    filterEnvelope: { attack: 0.005, decay: 0.2, sustain: 0.3, release: 0.2, baseFrequency: 80, octaves: 3 },
    volume: -4,
  }).connect(comp);
  return synth;
}

export function createChordSynth() {
  const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.4 }).toDestination();
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.1, decay: 0.5, sustain: 0.6, release: 1.5 },
    volume: -10,
  }).connect(reverb);
  return synth;
}

export function createAcidSynth() {
  const dist = new Tone.Distortion({ distortion: 0.15, wet: 0.3 }).toDestination();
  const reverb = new Tone.Reverb({ decay: 0.8, wet: 0.2 }).connect(dist);
  const synth = new Tone.MonoSynth({
    oscillator: { type: 'sawtooth' },
    envelope: { attack: 0.001, decay: 0.15, sustain: 0.4, release: 0.4 },
    filter: { frequency: 800, type: 'lowpass', rolloff: -24, Q: 10 },
    filterEnvelope: { attack: 0.001, decay: 0.2, sustain: 0.2, release: 0.3, baseFrequency: 200, octaves: 4 },
    volume: -8,
  }).connect(reverb);
  return synth;
}
