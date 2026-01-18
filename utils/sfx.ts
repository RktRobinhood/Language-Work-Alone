
class SoundSynth {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.1, ramp = true) {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    if (ramp) {
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    } else {
      setTimeout(() => gain.gain.setValueAtTime(0, this.ctx.currentTime), (duration * 1000) - 10);
    }

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // LCARS style chirp
  click() {
    this.playTone(880, 0.05, 'square', 0.03);
  }

  // System navigation thud-click
  nav() {
    this.playTone(120, 0.1, 'sine', 0.15);
    setTimeout(() => this.playTone(80, 0.05, 'square', 0.05), 30);
  }

  confirm() {
    this.playTone(660, 0.1, 'sine', 0.08);
    setTimeout(() => this.playTone(880, 0.1, 'sine', 0.08), 60);
  }

  error() {
    this.playTone(110, 0.3, 'sawtooth', 0.1);
  }

  scan() {
    const duration = 0.2;
    this.playTone(1200, duration, 'square', 0.02);
    this.playTone(400, duration, 'sine', 0.05);
  }

  // Glitch/Malfunction sound
  glitch() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        this.playTone(Math.random() * 1000 + 100, 0.03, 'sawtooth', 0.05);
      }, i * 40);
    }
  }
}

export const sfx = new SoundSynth();
