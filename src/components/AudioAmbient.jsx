import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioAmbient({ isPlaying, onToggle }) {
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const birdTimerRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) {
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
      if (birdTimerRef.current) clearInterval(birdTimerRef.current);
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Garden Breeze & Rustling Leaves (Gentle Filtered Noise)
      const bufferSize = ctx.sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02; // Pink-ish noise
        lastOut = output[i];
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(450, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, ctx.currentTime);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start();

      // 2. Warm Cozy Cafe Acoustic Chords (Soft gentle harmonic foundation)
      const frequencies = [164.81, 220.00, 246.94, 329.63]; // E3, A3, B3, E4 warm garden chord
      const chordOscs = frequencies.map((freq) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        g.gain.setValueAtTime(0.018, ctx.currentTime);
        osc.connect(g);
        g.connect(masterGain);
        osc.start();
        return osc;
      });

      // 3. Occasional delicate sweet bird chirp
      const triggerBirdChirp = () => {
        if (!isPlaying || !audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const now = ctx.currentTime;
        const birdOsc = ctx.createOscillator();
        const birdGain = ctx.createGain();

        const baseF = 2400 + Math.random() * 800;
        birdOsc.type = 'sine';
        birdOsc.frequency.setValueAtTime(baseF, now);
        birdOsc.frequency.exponentialRampToValueAtTime(baseF * 1.35, now + 0.08);
        birdOsc.frequency.exponentialRampToValueAtTime(baseF * 0.9, now + 0.16);

        birdGain.gain.setValueAtTime(0.001, now);
        birdGain.gain.linearRampToValueAtTime(0.025, now + 0.04);
        birdGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

        birdOsc.connect(birdGain);
        birdGain.connect(masterGain);

        birdOsc.start(now);
        birdOsc.stop(now + 0.25);
      };

      birdTimerRef.current = setInterval(() => {
        if (Math.random() > 0.4) {
          triggerBirdChirp();
          if (Math.random() > 0.5) {
            setTimeout(triggerBirdChirp, 180 + Math.random() * 150);
          }
        }
      }, 3500);

      return () => {
        try {
          noiseSource.stop();
          chordOscs.forEach(o => o.stop());
          if (birdTimerRef.current) clearInterval(birdTimerRef.current);
        } catch {
          // ignore cleanup on hot reload
        }
      };
    } catch (err) {
      console.warn("Ambient audio error", err);
    }
  }, [isPlaying]);

  return (
    <button
      onClick={onToggle}
      data-cursor="pointer"
      title={isPlaying ? "Mute garden ambience" : "Play garden & cafe ambience"}
      aria-label="Toggle ambient garden sound"
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sub font-semibold tracking-wider transition-all duration-300 border border-olive/30 hover:border-olive bg-cream-100/80 hover:bg-cream-100 text-espresso shadow-warm-sm"
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-0.5 h-3.5">
            <span className="w-0.5 h-3 bg-olive animate-pulse rounded-full" />
            <span className="w-0.5 h-2 bg-mustard animate-bounce rounded-full" />
            <span className="w-0.5 h-3.5 bg-olive animate-pulse rounded-full" />
          </div>
          <span className="hidden sm:inline text-olive">GARDEN SOUND: ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-espresso/60" />
          <span className="hidden sm:inline text-espresso/60">GARDEN SOUND: OFF</span>
        </>
      )}
    </button>
  );
}
