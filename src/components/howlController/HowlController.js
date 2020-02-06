import { Howl, Howler } from "./scripts/howler.js";

import "howler-plugin-effect-chain";

import Tuna from "tunajs";

export default class HowlController {
  constructor(loaded) {
    this.loaded = loaded;

    this.howler = Howler;
  }

  unload() {
    if (this.sound) {
      this.sound.unload();
    }
    if (this.analyser) {
      Howler.masterGain.disconnect(this.analyser);
      this.analyser.disconnect(Howler.ctx.destination);
      this.analyser = undefined;
    }
  }

  load(src) {
    this.unload();

    this.sound = new Howl({
      src: [src]
    });

    this.sound.once("load", () => {
      this.duration = this.formatTime(Math.round(this.sound.duration()));
      this.loaded();
    });

    // Create analyzer
    this.analyser = Howler.ctx.createAnalyser();

    // Connect master gain to analyzer
    Howler.masterGain.connect(this.analyser);

    //this.addFilter();

    // Connect analyzer to destination
    this.analyser.connect(Howler.ctx.destination);
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
