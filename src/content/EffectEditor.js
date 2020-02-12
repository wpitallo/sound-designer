import React from "react";

import HowlController from "../components/howlController/HowlController.js";

import WaveVisualizer from "../components/waveVisualizer/WaveVisualizer.js";
import EffectSelection from "../components/effectAdjustments/EffectSelection.js";

export default class EffectEditor extends React.Component {
  constructor(props) {
    super(props);
    if (!this.howlController) {
      this.howlController = new HowlController(() => {});
      this.howlController.unload();
      this.howlController.load(this.props.selectedSound.src);
    }
    this.howlChanged = this.howlChanged.bind(this);

    this.effectData = {};
    this.effectData.duration = 0;
    this.effectData.startTime = 0;

    if (this.props.selectedEffect.effectData) {
      this.effectData = this.props.selectedEffect.effectData;
    }

    if (this.howlController) {
      this.effectData.duration = this.howlController.sound.duration(0);
    }

    this.effectData.endTime = this.effectData.duration;

    this.startTimeChanged = this.startTimeChanged.bind(this);
    this.endTimeChanged = this.endTimeChanged.bind(this);

    this.state = {
      effectData: this.effectData
    };
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
    this.props.attachAnalyser(
      this.howlController.analyser,
      this.howlController.howler.ctx.destination.context
    );
    //this.threeVisualizer.attachAnalyser();
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
              effectData={this.state.effectData}
              howlController={this.howlController}
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
                howlController={this.howlController}
                effectData={this.state.effectData}
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
