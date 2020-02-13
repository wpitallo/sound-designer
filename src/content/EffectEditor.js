import React from "react";

import WaveVisualizer from "../components/waveVisualizer/WaveVisualizer.js";
import EffectSelection from "../components/effectAdjustments/EffectSelection.js";

export default class EffectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { effectData: this.props.selectedEffect.effectData };
    this.effectData = this.props.selectedEffect.effectData;

    this.startTimeChanged = this.startTimeChanged.bind(this);
    this.endTimeChanged = this.endTimeChanged.bind(this);
  }

  componentDidMount() {
    debugger;
    this.waveVisualizer.updateRegion(
      this.state.effectData.startTime,
      this.state.effectData.endTime
    );
  }

  startTimeChanged(e) {
    this.effectData = this.state.effectData;
    if (e.value > this.effectData.endTime) {
      this.effectData.startTime = this.effectData.endTime;
    } else {
      this.effectData.startTime = e.value;
    }
    this.setState({ effectData: this.effectData });
    this.waveVisualizer.updateRegion(
      this.effectData.startTime,
      this.effectData.endTime
    );
  }

  endTimeChanged(e) {
    this.effectData = this.state.effectData;
    if (e.value < this.effectData.startTime) {
      this.effectData.endTime = this.effectData.startTime;
    } else {
      this.effectData.endTime = e.value;
    }
    this.setState({ effectData: this.effectData });
    this.waveVisualizer.updateRegion(
      this.effectData.startTime,
      this.effectData.endTime
    );
  }

  render() {
    let content;
    if (this.props.selectedSound.src) {
      content = (
        <div>
          <div
            className="flex-item"
            style={{
              marginTop: "-255px",
              borderBottom: "none"
            }}
          />

          <div
            className="flex-item"
            style={{
              borderTop: "none",
              borderBottom: "none"
            }}
          >
            <WaveVisualizer
              waveLabel={`Effect: ${this.props.selectedEffect.name}`}
              selectedSound={this.props.selectedSound}
              effectData={this.state.effectData}
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
              <EffectSelection
                howlController={this.props.howlController}
                effectData={this.state.effectData}
                selectedSound={this.props.selectedSound}
                startTimeChanged={this.startTimeChanged}
                endTimeChanged={this.endTimeChanged}
              />
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
