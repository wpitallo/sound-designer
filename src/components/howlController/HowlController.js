import { Howl, Howler } from "./scripts/howler.js";

import "howler-plugin-effect-chain";

import Tuna from "tunajs";

export default class HowlController {
  constructor() {
    this.howler = Howler;
    //this.state = { duration: 0 };
    this.load = this.load.bind(this);
    this.unload = this.unload.bind(this);
    this.play = this.play.bind(this);
    this.seek = this.seek.bind(this);
    this.stop = this.stop.bind(this);
    this.pause = this.stop.bind(this);
    this.addFilter = this.addFilter.bind(this);
  }

  unload(callback) {
    if (this.sound) {
      this.sound.unload();
    }
    if (this.analyser) {
      Howler.masterGain.disconnect(this.analyser);
      this.analyser.disconnect(Howler.ctx.destination);
      this.analyser = undefined;
    }
    if (callback) callback();
  }

  load(src, callback) {
    this.unload();

    this.sound = new Howl({
      src: [src]
    });

    this.sound.once("load", () => {
      this.soundDuration = this.sound.duration();
      this.formattedSoundDuration = this.formatTime(
        Math.round(this.sound.duration())
      );

      this.analyser = Howler.ctx.createAnalyser();

      // Connect master gain to analyzer
      Howler.masterGain.connect(this.analyser);

      //this.addFilter();

      // Connect analyzer to destination
      this.analyser.connect(Howler.ctx.destination);

      callback();
    });
  }

  duration() {
    return this.soundDuration;
  }

  play() {
    this.sound.play();
  }

  seek(time) {
    this.sound.seek(time);
  }

  stop() {
    this.sound.stop();
  }

  pause() {
    this.sound.pause();
  }

  step() {
    // Determine our current seek position.
    var seek = this.sound.seek() || 0;
    console.log(this.formatTime(Math.round(seek)));
    //progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

    // If the sound is still playing, continue stepping.
    if (this.sound.playing()) {
      requestAnimationFrame(this.step.bind(this));
    }
  }

  formatTime(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = secs - minutes * 60 || 0;

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  addFilter() {
    const tuna = new Tuna(Howler.ctx);
    let filter = new tuna.Filter({
      frequency: 200,
      resonance: 2,
      gain: 1.0,
      filterType: "lowpass",
      bypass: false
    });
    this.howler.addEffect(filter);
  }
}
