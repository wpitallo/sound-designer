import React from "react";
import { NumberBox, Slider, DropDownButton } from "devextreme-react";

import Knob from "./knob/Knob.js";
import EaseGraph from "./easeGraph/EaseGraph.js";

import "./slider.css";

export default class AudioAdjustmentRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onEffectTypeChanged = this.onEffectTypeChanged.bind(this);
    this.onEaseFunctionChanged = this.onEaseFunctionChanged.bind(this);

    this.effectTypes = [
      { name: "Direct" },
      { name: "Linear" },
      { name: "EaseIn" },
      { name: "EaseOut" },
      { name: "EaseInOut" }
    ];

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
      effect: this.effectTypes[0],
      easeFunction: this.easeFunctions[0]
    };

    this.seekRangeItemStyle = {
      paddingTop: "0px",
      paddingLeft: "90px",
      paddingRight: "0px",
      marginTop: "18px",
      paddingBottom: "0px",
      textAlign: "-webkit-center"
    };

    this.knobFlexItemStyle = {
      paddingTop: "0px",
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "18px",
      paddingBottom: "20px",
      textAlign: "-webkit-center"
    };

    this.EaseGraphFlexItemStyle = {
      paddingLeft: "20px",
      paddingRight: "20px",
      textAlign: "-webkit-center"
    };

    this.seekBoxItemStyle = {
      paddingTop: "0px",
      paddingLeft: "0px",
      paddingRight: "0px",
      marginTop: "18px",
      paddingBottom: "20px",
      textAlign: "-webkit-center"
    };

    this.seekLabelItemStyle = {
      paddingLeft: "0px",
      paddingRight: "0px",
      paddingTop: "25px",
      textAlign: "-webkit-center"
    };

    this.easeGraph = React.createRef();
  }

  onEffectTypeChanged(e) {
    this.setState({ effect: e.itemData });
  }
  onEaseFunctionChanged(e) {
    this.setState({ easeFunction: e.itemData });
  }

  handleChange(value) {
    this.setState({ stateValue1: value });
  }
  render() {
    return (
      <div className="flex-item no-border" style={{ paddingRight: "20px" }}>
        <div className="flex-container-row">
          <div className="flex-item no-border" style={this.seekRangeItemStyle}>
            <Slider
              min={0}
              max={100}
              defaultValue={0}
              showRange={false}
              className="seekSlider"
            />
          </div>

          <div className="flex-item no-border" style={this.seekRangeItemStyle}>
            <Slider
              className="seekSlider"
              min={0}
              max={100}
              defaultValue={100}
              showRange={false}
            />
          </div>
        </div>

        <div className="flex-container-row">
          <div className="flex-item no-border" style={this.seekLabelItemStyle}>
            Start:
          </div>
          <div className="flex-item no-border" style={this.seekBoxItemStyle}>
            <NumberBox
              value={this.state.startTime}
              min={0}
              max={59}
              step={1}
              showSpinButtons={true}
              onValueChanged={this.onEndChanged}
            />
          </div>

          <div className="flex-item no-border" style={this.seekBoxItemStyle}>
            <NumberBox
              value={this.state.endTime}
              min={0}
              max={59}
              step={1}
              showSpinButtons={true}
              onValueChanged={this.onEndChanged}
            />
          </div>

          <div className="flex-item no-border" style={this.seekBoxItemStyle}>
            <NumberBox
              value={this.state.startTime}
              min={0}
              max={59}
              step={1}
              showSpinButtons={true}
              onValueChanged={this.onEndChanged}
            />
          </div>
          {/* <div className="flex-item no-border" style={this.seekBoxItemStyle} /> */}
          <div className="flex-item no-border" style={this.seekLabelItemStyle}>
            End:
          </div>
          <div className="flex-item no-border" style={this.seekBoxItemStyle}>
            <NumberBox
              value={this.state.endTime}
              min={0}
              max={59}
              step={1}
              showSpinButtons={true}
              onValueChanged={this.onEndChanged}
            />
          </div>
          <div className="flex-item no-border" style={this.seekBoxItemStyle}>
            <NumberBox
              value={this.state.startTime}
              min={0}
              max={59}
              step={1}
              showSpinButtons={true}
              onValueChanged={this.onEndChanged}
            />
          </div>

          <div className="flex-item no-border" style={this.seekBoxItemStyle}>
            <NumberBox
              value={this.state.endTime}
              min={0}
              max={59}
              step={1}
              showSpinButtons={true}
              onValueChanged={this.onEndChanged}
            />
          </div>
        </div>
        <div className="flex-container-row">
          <div className="flex-item no-border" style={this.knobFlexItemStyle}>
            <Knob
              size={50}
              numTicks={100}
              degrees={260}
              min={1}
              max={100}
              value={50}
              color={true}
              onChange={this.handleChange}
            />
          </div>

          <div className="flex-item no-border" style={this.knobFlexItemStyle}>
            <Knob
              size={50}
              numTicks={100}
              degrees={260}
              min={1}
              max={100}
              value={50}
              color={true}
              onChange={this.handleChange}
            />
          </div>
        </div>

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
              text={this.state.effect.name}
              dropDownOptions={{ width: 300 }}
              items={this.effectTypes}
              displayExpr="name"
              onItemClick={this.onEffectTypeChanged}
            />

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
      </div>
    );
  }
}
