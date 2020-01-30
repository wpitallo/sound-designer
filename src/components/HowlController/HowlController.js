import { Howl, Howler } from "../../scripts/howler.js";

export default class HowlController {
  constructor() {
    this.sound = new Howl({
      src: ["/sounds/summarySounds.mp3"]
    });
    this.howler = Howler;
    // Create analyzer
    this.analyser = Howler.ctx.createAnalyser();

    // Connect master gain to analyzer
    Howler.masterGain.connect(this.analyser);

    // Connect analyzer to destination
    this.analyser.connect(Howler.ctx.destination);
  }
}
