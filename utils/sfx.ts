
class SoundSynth {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  beep(freq = 440, duration = 0.1, type: OscillatorType = 'sine', volume = 0.1) {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  confirm() {
    this.beep(880, 0.1, 'sine', 0.1);
    setTimeout(() => this.beep(1320, 0.1, 'sine', 0.1), 50);
  }

  error() {
    this.beep(220, 0.2, 'sawtooth', 0.1);
  }

  scan() {
    this.beep(1500, 0.05, 'square', 0.02);
  }
}

export const sfx = new SoundSynth();
