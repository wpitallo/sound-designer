import { Howl, Howler } from "../../scripts/howler.js";

import "howler-plugin-effect-chain";

import Tuna from "tunajs";

export default class HowlController {
  constructor() {
    this.howler = Howler;

    this.sound = new Howl({
      src: ["/sounds/summarySounds.mp3"]
    });

    // Create analyzer
    this.analyser = Howler.ctx.createAnalyser();

    // Connect master gain to analyzer
    Howler.masterGain.connect(this.analyser);

    //this.addFilter();

    // Connect analyzer to destination
    this.analyser.connect(Howler.ctx.destination);
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
