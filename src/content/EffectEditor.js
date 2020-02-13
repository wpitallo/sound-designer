import React from "react";

import WaveVisualizer from "../components/waveVisualizer/WaveVisualizer.js";
import EffectSelection from "../components/effectAdjustments/EffectSelection.js";

export default class EffectEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEffect: this.props.selectedEffect,
      elapsedTime: 0
    };
    this.selectedEffect = this.props.selectedEffect;

    this.startTimeChanged = this.startTimeChanged.bind(this);
    this.endTimeChanged = this.endTimeChanged.bind(this);
  }

  componentDidMount() {
    this.waveVisualizer.updateRegion(
      this.state.selectedEffect.effectData.startTime,
      this.state.selectedEffect.effectData.endTime
    );

    this.props.howlController.elapsedUpdate = elapsedTime => {
      this.setState({ elapsedTime: elapsedTime });
    };
  }

  startTimeChanged(e) {
    this.selectedEffect = this.state.selectedEffect;
    if (e.value > this.selectedEffect.effectData.endTime) {
      this.selectedEffect.effectData.startTime = this.selectedEffect.effectData.endTime;
    } else {
      this.selectedEffect.effectData.startTime = e.value;
    }
    this.setState({ selectedEffect: this.selectedEffect });
    this.waveVisualizer.updateRegion(
      this.selectedEffect.effectData.startTime,
      this.selectedEffect.effectData.endTime
    );
  }

  endTimeChanged(e) {
    this.selectedEffect = this.state.selectedEffect;
    if (e.value < this.selectedEffect.effectData.startTime) {
      this.selectedEffect.effectData.endTime = this.selectedEffect.effectData.startTime;
    } else {
      this.selectedEffect.effectData.endTime = e.value;
    }
    this.setState({ selectedEffect: this.selectedEffect });
    this.waveVisualizer.updateRegion(
      this.selectedEffect.effectData.startTime,
      this.selectedEffect.effectData.endTime
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
              elapsedTime={this.state.elapsedTime}
              waveLabel={`Effect: ${this.props.selectedEffect.name}`}
              selectedSound={this.props.selectedSound}
              selectedEffect={this.state.selectedEffect}
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
                selectedEffect={this.state.selectedEffect}
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
