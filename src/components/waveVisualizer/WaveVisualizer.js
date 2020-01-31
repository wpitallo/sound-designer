import React from "react";

import WaveSurfer from "./scripts/wavesurfer.js";
import { Button } from "devextreme-react";

export default class WaveVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.playPause = this.playPause.bind(this);
  }

  playPause() {
    this.wavesurfer.setVolume(0);
    this.wavesurfer.playPause();
  }

  componentDidMount() {
    if (!this.wavesurfer) {
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#28fc03",
        audioContext: this.props.howlController.howler.ctx.destination.context,
        splitChannels: true,
        barWidth: 2,
        barHeight: 1, // the height of the wave
        barGap: null
      });

      this.wavesurfer.load("/sounds/summarySounds.mp3#t=20,30");

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
      });
    }
  }
  render() {
    return (
      <div className="flex-container-column">
        <div
          className="flex-item"
          style={{ paddingLeft: "2px", borderTop: "none" }}
        >
          <div id="waveform" />
          <div id="waveform-timeline" />
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
