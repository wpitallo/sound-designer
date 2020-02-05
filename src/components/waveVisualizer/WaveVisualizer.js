import React from "react";

import WaveSurfer from "./wavesurfer/wavesurfer.js";
import RegionsPlugin from "./wavesurfer/plugin/regions.js";

import { Button } from "devextreme-react";

import "./wavesurfer.css";

export default class WaveVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.playPause = this.playPause.bind(this);
    this.createWaveform = this.createWaveform.bind(this);
  }

  playPause() {
    this.wavesurfer.setVolume(0);
    this.wavesurfer.playPause();
  }

  componentDidMount() {
    this.createWaveform();
    window.addEventListener("resize", this.createWaveform.bind(this));
  }

  createWaveform() {
    if (this.wavesurfer) {
      debugger;
      this.wavesurfer._onResize = undefined;
      //this.wavesurfer.clearRegions();
      try {
        this.wavesurfer.initialisedPluginList = {};
        this.wavesurfer.Regions = {};
        this.wavesurfer.regions = {};
        this.wavesurfer.destroy();
        debugger;
        this.wavesurfer = undefined;
      } catch (err) {}
    }

    WaveSurfer.regions = RegionsPlugin;

    let regions = {
      regions: [
        {
          id: "newRegion",
          start: 1,
          end: 3,
          loop: false,
          color: "hsla(120, 100%, 30%, 0.25)"
        }
      ]
    };

    this.wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#28fc03",
      audioContext: this.props.howlController.howler.ctx.destination.context,
      // backend: "MediaElement",
      splitChannels: true,
      responsive: true,
      barWidth: 2,
      barHeight: 1, // the height of the wave
      barGap: null,
      plugins: [RegionsPlugin.create(regions)]
    });

    this.wavesurfer.regions.disableDragSelection();

    //this.wavesurfer.load("/sounds/summarySounds.mp3");
    this.wavesurfer.load("/sounds/as_Base_Background.mp3");
    //this.wavesurfer.regions = RegionsPlugin;

    //this.wavesurfer.backend.params.audioContext = this.props.howlController.howler.ctx.destination.context;

    this.wavesurfer.setVolume(0);
    this.wavesurfer.setMute(true);

    this.wavesurfer.on("play", () => {
      console.log("Play");
      this.props.howlController.sound.play();
    });

    this.wavesurfer.on("pause", () => {
      console.log("Pause");
      //player.pauseVideo();
      this.props.howlController.sound.pause();
    });

    this.wavesurfer.on("seek", progress => {
      console.log(progress);
      this.props.howlController.sound.seek(
        progress * this.props.howlController.sound.duration()
      );
    });

    this.wavesurfer.on("waveform-ready", () => {
      console.log("Reset to beginning (waveform-ready)");
      this.props.howlController.sound.seek(0);
      this.props.howlController.sound.stop();
    });

    this.wavesurfer.on("finish", () => {
      console.log("finish");
      this.props.howlController.sound.seek(0);
      this.props.howlController.sound.stop();
    });

    this.wavesurfer.on("ready", () => {
      console.log("Reset to beginning (ready)");
      this.props.howlController.sound.seek(0);
      this.props.howlController.sound.stop();

      // this.wavesurfer.regions.create({
      //   start: 1,
      //   end: 4,
      //   color: "hsla(400, 100%, 30%, 0.5)"
      // });
    });

    debugger;
    this.wavesurfer.regions.list.newRegion.reSizeCallback = region => {
      console.log(region.start);
      console.log(region.end);
      console.log(region);
    };
  }

  render() {
    return (
      <div className="flex-container-column">
        <div
          className="flex-item"
          style={{ paddingLeft: "2px", borderTop: "none" }}
        >
          <div id="waveform" style={{ width: "100%" }} />
          <div id="waveform-regions" />
        </div>
        <div className="flex-item" style={{ height: "70px" }}>
          <div align="center">
            <label style={{ position: "absolute", marginTop: "-30px" }}>
              EffectName
            </label>
            <Button
              id="play-button"
              icon="fas fa-play"
              type="normal"
              onClick={this.playPause}
              stylingMode="text"
              style={{
                marginLeft: "15px",
                marginTop: "10px",
                borderRadius: "50px",
                width: "50px",
                height: "50px",
                fontSize: "50px",
                color: "white",
                border: "none"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
