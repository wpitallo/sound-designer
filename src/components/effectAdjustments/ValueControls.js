import React from "react";

import VerticalSlider from "./verticalSlider/VerticalSlider.js";
import Knob from "./knob/Knob.js";

import "./slider.css";

export default class ValueControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateValue1: 50,
      stateValue2: 50
    };

    this.knobFlexItemStyle = {
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "50px",
      paddingBottom: "20px",
      textAlign: "-webkit-center"
    };

    this.verticalSliderFlexItemStyle = {
      paddingLeft: "20px",
      paddingRight: "20px",
      marginBottom: "-45px",
      textAlign: "-webkit-center"
    };

    this.handleValue1Change = this.handleValue1Change.bind(this);
    this.handleValue2Change = this.handleValue2Change.bind(this);
  }

  handleValue1Change(value) {
    this.setState({ stateValue1: value });
  }
  handleValue2Change(value) {
    this.setState({ stateValue2: value });
  }
  render() {
    let valueControllers;

    if (this.props.selectedEffect.name === "Volume") {
      if (this.props.easeType.name === "None") {
        valueControllers = (
          <div className="flex-container-row">
            <div className="flex-container-row">
              <div
                className="flex-item no-border"
                style={this.knobFlexItemStyle}
              >
                <Knob
                  size={50}
                  numTicks={100}
                  degrees={260}
                  min={1}
                  max={100}
                  value={this.state.stateValue1}
                  color={true}
                  onChange={this.handleValue1Change}
                />
              </div>
            </div>
          </div>
        );
      } else {
        valueControllers = (
          <div className="flex-container-row">
            <div className="flex-container-row">
              <div
                className="flex-item no-border"
                style={this.knobFlexItemStyle}
              >
                <Knob
                  size={50}
                  numTicks={100}
                  degrees={260}
                  min={1}
                  max={100}
                  value={this.state.stateValue1}
                  color={true}
                  onChange={this.handleValue1Change}
                />
              </div>

              <div
                className="flex-item no-border"
                style={this.knobFlexItemStyle}
              >
                <Knob
                  size={50}
                  numTicks={100}
                  degrees={260}
                  min={1}
                  max={100}
                  value={this.state.stateValue2}
                  color={true}
                  onChange={this.handleValue2Change}
                />
              </div>
            </div>
          </div>
        );
      }
    }

    if (this.props.selectedEffect.name === "Rate") {
      if (this.props.easeType.name === "None") {
        valueControllers = (
          <div className="flex-container-row">
            <div className="flex-container-row">
              <div
                className="flex-item no-border"
                style={this.verticalSliderFlexItemStyle}
              >
                <VerticalSlider
                  value={this.state.stateValue1}
                  onChange={this.handleValue1Change}
                />
              </div>
            </div>
          </div>
        );
      } else {
        valueControllers = (
          <div className="flex-container-row">
            <div className="flex-container-row">
              <div
                className="flex-item no-border"
                style={this.verticalSliderFlexItemStyle}
              >
                <VerticalSlider
                  value={this.state.stateValue1}
                  onChange={this.handleValue1Change}
                />
              </div>

              <div
                className="flex-item no-border"
                style={this.verticalSliderFlexItemStyle}
              >
                <VerticalSlider
                  value={this.state.stateValue1}
                  onChange={this.handleValue1Change}
                />
              </div>
            </div>
          </div>
        );
      }
    }

    return valueControllers;
  }
}
