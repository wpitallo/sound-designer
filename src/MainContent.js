import React from "react";

import HowlController from "./components/HowlController/HowlController.js";
import WaveVisualizer from "./components/WaveVisualizer/WaveVisualizer.js";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector.js";
import ThreeVisualizer from "./components/ThreeVisualizer/ThreeVisualizer.js";

export default class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.howlController = new HowlController();
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
            height: "230px",
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
          }}
        >
          <WaveVisualizer howlController={this.howlController} />
        </div>
      </div>
    );
  }
}
