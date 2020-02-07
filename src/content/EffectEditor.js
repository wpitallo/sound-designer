import React from "react";

import HowlController from "../components/howlController/HowlController.js";
import ThreeVisualizer from "../components/threeVisualizer/ThreeVisualizer.js";

import WaveVisualizer from "../components/waveVisualizer/WaveVisualizer.js";

import AudioAdjustmentRow from "../components/audioAdjustments/AudioAdjustmentRow.js";

export default class EffectEditor extends React.Component {
  constructor(props) {
    super(props);
    if (!this.howlController) {
      this.howlController = new HowlController(() => {});
      this.howlController.unload();
      this.howlController.load(this.props.selectedSound.src);
    }
    this.howlChanged = this.howlChanged.bind(this);
  }

  componentDidMount() {
    if (this.props.selectedSound.src) {
      this.howlChanged();
    }
  }

  componentWillUnmount() {
    this.howlController.unload();

    this.howlController = undefined;
  }

  howlChanged() {
    this.threeVisualizer.attachAnalyser();
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
          <ThreeVisualizer
            onRef={ref => (this.threeVisualizer = ref)}
            analyser={this.howlController.analyser}
          />
          <div
            className="flex-item"
            style={{
              borderTop: "none",
              marginTop: "200px"
            }}
          >
            <WaveVisualizer
              selectedEffect={this.props.selectedEffect}
              howlController={this.howlController}
              src={this.props.selectedSound.src}
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
              <AudioAdjustmentRow />
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
