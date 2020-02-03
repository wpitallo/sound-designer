import React from "react";
import { DropDownButton } from "devextreme-react";

import Knob from "./knob/Knob.js";
import EaseGraph from "./easeGraph/EaseGraph.js";

import SeekTime from "./SeekTime.js";

import "./slider.css";

export default class AudioAdjustmentRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleValue1Change = this.handleValue1Change.bind(this);
    this.handleValue2Change = this.handleValue2Change.bind(this);

    this.onEaseFunctionChanged = this.onEaseFunctionChanged.bind(this);

    this.easeFunctions = [
      { name: "Quad" },
      { name: "Cubic" },
      { name: "Quart" },
      { name: "Quint" },
      { name: "Sine" },
      { name: "Expo" },
      { name: "Circ" },
      { name: "Back" },
      { name: "Bounce" }
    ];

    this.state = {
      stateValue1: 50,
      stateValue2: 50,
      startTime: 0,
      endTime: 10,
      easeFunction: this.easeFunctions[0]
    };

    this.knobFlexItemStyle = {
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "5px",
      paddingBottom: "20px",
      textAlign: "-webkit-center"
    };

    this.EaseGraphFlexItemStyle = {
      paddingLeft: "20px",
      paddingRight: "20px",
      textAlign: "-webkit-center"
    };

    this.easeGraph = React.createRef();
  }

  onEaseFunctionChanged(e) {
    this.setState({ easeFunction: e.itemData });
  }

  handleValue1Change(value) {
    this.setState({ stateValue1: value });
  }
  handleValue2Change(value) {
    this.setState({ stateValue2: value });
  }
  render() {
    let easeType;
    if (this.props.easeType.name !== "None") {
      easeType = (
        <div className="flex-container-colum">
          <div
            className="flex-item no-border"
            style={this.EaseGraphFlexItemStyle}
          >
            <EaseGraph ref={this.easeGraph} />
          </div>

          <div className="flex-item no-border" style={this.knobFlexItemStyle}>
            <DropDownButton
              style={{
                width: "285px",
                textAlign: "left"
              }}
              text={this.state.easeFunction.name}
              dropDownOptions={{ width: 300 }}
              items={this.easeFunctions}
              displayExpr="name"
              onItemClick={this.onEaseFunctionChanged}
            />
          </div>
        </div>
      );
    }

    let seekType;
    if (this.props.easeType.name === "None") {
      seekType = (
        <div className="flex-container-row">
          <SeekTime label="Start Time:" />
        </div>
      );
    } else {
      seekType = (
        <div className="flex-container-row">
          <SeekTime label="Start Time:" />
          <SeekTime label="End Time:" />
        </div>
      );
    }

    let valueControllers;
    if (this.props.easeType.name === "None") {
      valueControllers = (
        <div className="flex-container-row">
          <div className="flex-container-row">
            <div className="flex-item no-border" style={this.knobFlexItemStyle}>
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
            <div className="flex-item no-border" style={this.knobFlexItemStyle}>
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

            <div className="flex-item no-border" style={this.knobFlexItemStyle}>
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

    return (
      <div className="flex-item no-border" style={{ paddingRight: "20px" }}>
        {seekType}
        {valueControllers}
        {easeType}
      </div>
    );
  }
}
