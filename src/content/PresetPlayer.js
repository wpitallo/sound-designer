import React from "react";

import HowlController from "../components/howlController/HowlController.js";

import WaveVisualizer from "../components/waveVisualizer/WaveVisualizer.js";

export default class PresetPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let content;
    if (this.props.selectedSound.src) {
      content = (
        <div>
          <div
            className="flex-item"
            style={{
              marginTop: "-100px",
              borderBottom: "none"
            }}
          />

          <div
            className="flex-item"
            style={{
              borderTop: "none",
              marginTop: "200px",
              borderBottom: "none"
            }}
          >
            <WaveVisualizer
              waveLabel={`Preset: ${this.props.selectedPreset.name}`}
              selectedSound={this.props.selectedSound}
              howlController={this.props.howlController}
              src={this.props.selectedSound.src}
              onRef={ref => (this.waveVisualizer = ref)}
            />
          </div>
          <div
            className="flex-item no-border"
            style={{
              borderTop: "none"
              // backgroundColor: "red"
            }}
          >
            <div className="flex-container-row">
              {/* <AudioAdjustmentRow /> */}
            </div>
          </div>
        </div>
      );
    } else {
      content = <p />;
    }

    return content;
  }
}
