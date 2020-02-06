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
    this.destroy = this.destroy.bind(this);
    this.state = {
      icon: "fas fa-play",
      ready: false
    };
  }

  playPause() {
    this.wavesurfer.setVolume(0);
    this.wavesurfer.playPause();
  }

  componentDidMount() {
    this.createWaveform();
    window.addEventListener("resize", this.createWaveform.bind(this));
  }

  componentWillUnmount() {
    this.destroy();
  }

  destroy() {
    if (this.wavesurfer) {
      this.wavesurfer._onResize = undefined;
      //this.wavesurfer.clearRegions();
      try {
        this.wavesurfer.initialisedPluginList = {};
        this.wavesurfer.Regions = {};
        this.wavesurfer.regions = {};
        this.wavesurfer.destroy();
        this.wavesurfer = undefined;
      } catch (err) {}
    }
  }

  createWaveform() {
    WaveSurfer.regions = RegionsPlugin;

    this.destroy();

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

    this.wavesurfer.load(this.props.src);
    //this.wavesurfer.regions = RegionsPlugin;

    //this.wavesurfer.backend.params.audioContext = this.props.howlController.howler.ctx.destination.context;

    this.wavesurfer.setVolume(0);
    this.wavesurfer.setMute(true);

    this.wavesurfer.on("play", () => {
      console.log("Play");
      this.setState({ icon: "fas fa-pause" });
      this.props.howlController.sound.play();
    });

    this.wavesurfer.on("pause", () => {
      console.log("Pause");
      //player.pauseVideo();
      this.setState({ icon: "fas fa-play" });
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
      this.setState({ ready: true });
      this.props.howlController.sound.seek(0);
      this.props.howlController.sound.stop();
    });

    this.wavesurfer.on("finish", () => {
      console.log("finish");
      this.setState({ icon: "fas fa-play" });
      this.props.howlController.sound.seek(0);
      this.props.howlController.sound.stop();
    });

    this.wavesurfer.on("ready", () => {
      console.log("Reset to beginning (ready)");
      this.setState({ ready: true });
      this.setState({ icon: "fas fa-play" });
      this.props.howlController.sound.seek(0);
      this.props.howlController.sound.stop();

      // this.wavesurfer.regions.create({
      //   start: 1,
      //   end: 4,
      //   color: "hsla(400, 100%, 30%, 0.5)"
      // });
    });

    this.wavesurfer.regions.list.newRegion.reSizeCallback = region => {
      console.log(region.start);
      console.log(region.end);
      console.log(region);
    };
  }

  render() {
    let controls;
    if (this.state.ready === true) {
      controls = (
        <Button
          id="play-button"
          icon={this.state.icon}
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
      );
    }

    return (
      <div className="flex-container-column">
        <div className="flex-item no-border" style={{ paddingLeft: "2px" }}>
          <div id="waveform" style={{ width: "100%" }} />
          <div id="waveform-regions" />
        </div>
        <div className="flex-item" style={{ height: "70px" }}>
          <div align="center">
            <label style={{ position: "absolute", marginTop: "-30px" }}>
              EffectName
            </label>
            {controls}
          </div>
        </div>
      </div>
    );
  }
}
