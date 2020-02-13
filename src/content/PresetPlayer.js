import React from "react";
import WaveVisualizer from "../components/waveVisualizer/WaveVisualizer.js";

export default class PresetPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedTime: 0
    };
  }

  componentDidMount() {
    this.props.howlController.elapsedUpdate = elapsedTime => {
      this.setState({ elapsedTime: elapsedTime });
    };
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
              elapsedTime={this.state.elapsedTime}
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
