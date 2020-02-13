import React from "react";
import SeekTime from "./seekTime/SeekTime.js";

import "./slider.css";

export default class StartEndTime extends React.Component {
  constructor(props) {
    super(props);

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
  }

  render() {
    let seekType;
    if (this.props.easeType.name === "None") {
      seekType = (
        <div className="flex-container-row">
          <SeekTime
            label="Start Time:"
            startSeeker={true}
            howlController={this.props.howlController}
            selectedEffect={this.props.selectedEffect}
            onValueChanged={this.props.startTimeChanged}
          />
        </div>
      );
    } else {
      seekType = (
        <div className="flex-container-row">
          <SeekTime
            label="Start Time:"
            startSeeker={true}
            howlController={this.props.howlController}
            selectedEffect={this.props.selectedEffect}
            onValueChanged={this.props.startTimeChanged}
          />
          <SeekTime
            label="End Time:"
            howlController={this.props.howlController}
            selectedEffect={this.props.selectedEffect}
            onValueChanged={this.props.endTimeChanged}
          />
        </div>
      );
    }

    return seekType;
  }
}
