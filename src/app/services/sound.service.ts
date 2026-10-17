import { afterNextRender, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audioCtx: AudioContext | null = null;
  public isMuted = signal<boolean>(true);

  constructor() {
    // Restore after hydration so the initial server and browser markup agree.
    afterNextRender(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem('metavex_sound_muted')
          ?? window.localStorage.getItem('nexorbit_sound_muted');
        if (saved !== null) this.isMuted.set(saved === 'true');
      } catch {
        // Storage may be blocked; keep sounds opt-in for this visit.
      }
    }
    });
  }

  private initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      void this.audioCtx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    const next = !this.isMuted();
    this.isMuted.set(next);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('metavex_sound_muted', String(next));
      } catch {
        // A blocked preference store must not prevent navigation or interaction.
      }
    }
    if (!next) {
      this.playChime();
    }
    return next;
  }

  /**
   * Crisp futuristic high-tech click
   */
  public playClick() {
    if (this.isMuted()) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.045);
    } catch {
      // AudioContext policy suppression fallback
    }
  }

  /**
   * Futuristic slider tick sound
   */
  public playTick() {
    if (this.isMuted()) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(850, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.03, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, this.audioCtx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.03);
    } catch {
      // Audio suppression fallback
    }
  }

  /**
   * Ascending futuristic chime for modal launch or conversion
   */
  public playChime() {
    if (this.isMuted()) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.04);

        const startTime = this.audioCtx.currentTime + idx * 0.04;
        gain.gain.setValueAtTime(0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch {
      // Audio suppression fallback
    }
  }
}
