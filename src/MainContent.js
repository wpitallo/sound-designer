import React from "react";

import HowlController from "./components/howlController/HowlController.js";
import WaveVisualizer from "./components/waveVisualizer/WaveVisualizer.js";
import LanguageSelector from "./components/languageSelector/LanguageSelector.js";
import ThreeVisualizer from "./components/threeVisualizer/ThreeVisualizer.js";

import AudioAdjustmentRow from "./components/audioAdjustments/AudioAdjustmentRow.js";

export default class MainContent extends React.Component {
  constructor(props) {
    super(props);
    if (!this.howlController) {
      this.howlController = new HowlController();
    }
    this.howlChanged = this.howlChanged.bind(this);
  }

  componentDidMount() {
    this.howlChanged();
  }
  howlChanged() {
    this.threeVisualizer.attachAnalyser();
  }

  render() {
    return (
      <div
        style={{
          width: "100%"
        }}
      >
        <div
          className="flex-item"
          style={{
            height: "180px",
            marginTop: "-100px",
            borderBottom: "none"
          }}
        >
          <ThreeVisualizer
            onRef={ref => (this.threeVisualizer = ref)}
            analyser={this.howlController.analyser}
          />
        </div>

        <div
          className="flex-item"
          style={{
            borderTop: "none"
            // backgroundColor: "blue"
          }}
        >
          <WaveVisualizer howlController={this.howlController} />
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
  }
}
