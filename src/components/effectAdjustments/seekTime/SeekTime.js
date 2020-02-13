import React from "react";
import { NumberBox, Slider } from "devextreme-react";

export default class SeekTime extends React.Component {
  constructor(props) {
    super(props);

    this.seekBoxItemStyle = {
      marginTop: "18px",
      paddingBottom: "10px",
      paddingLeft: "20px",
      paddingRight: "20px",
      textAlign: "-webkit-center"
    };

    this.seekLabelItemStyle = {
      paddingLeft: "0px",
      paddingRight: "0px",
      paddingTop: "25px",
      textAlign: "-webkit-center"
    };

    this.seekRangeItemStyle = {
      paddingTop: "0px",
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "18px",
      paddingBottom: "0px",
      textAlign: "-webkit-center"
    };

    this.state = {};

    //this.onValueChanged = this.onValueChanged.bind(this);
  }

  // onValueChanged(e) {
  //   this.props.onValueChanged(e);
  // }

  render() {
    let seeker;
    if (this.props.startSeeker === true) {
      seeker = (
        <div className="flex-container-column">
          <div className="flex-container-row">
            <div
              className="flex-item no-border"
              style={this.seekLabelItemStyle}
            >
              {this.props.label}
            </div>
          </div>
          <div className="flex-item no-border" style={this.seekRangeItemStyle}>
            <Slider
              min={0}
              step={0.1}
              max={this.props.selectedEffect.effectData.soundDuration}
              value={this.props.selectedEffect.effectData.startTime}
              showRange={false}
              className="seekSlider"
              onValueChanged={this.props.onValueChanged}
            />
          </div>
          <div className="flex-container-row">
            <div className="flex-item no-border" style={this.seekBoxItemStyle}>
              <NumberBox
                format="#0.##"
                width={"100%"}
                value={this.props.selectedEffect.effectData.startTime}
                min={0}
                max={this.props.selectedEffect.effectData.soundDuration}
                step={0.1}
                showSpinButtons={true}
                onValueChanged={this.props.onValueChanged}
              />
            </div>
          </div>
        </div>
      );
    } else {
      seeker = (
        <div className="flex-container-column">
          <div className="flex-container-row">
            <div
              className="flex-item no-border"
              style={this.seekLabelItemStyle}
            >
              {this.props.label}
            </div>
          </div>
          <div className="flex-item no-border" style={this.seekRangeItemStyle}>
            <Slider
              min={0}
              step={0.1}
              max={this.props.selectedEffect.effectData.soundDuration}
              value={this.props.selectedEffect.effectData.endTime}
              showRange={false}
              className="seekSlider"
              onValueChanged={this.props.onValueChanged}
            />
          </div>
          <div className="flex-container-row">
            <div className="flex-item no-border" style={this.seekBoxItemStyle}>
              <NumberBox
                format="#0.##"
                width={"100%"}
                value={this.props.selectedEffect.effectData.endTime}
                min={0}
                max={this.props.selectedEffect.effectData.soundDuration}
                step={0.1}
                showSpinButtons={true}
                onValueChanged={this.props.onValueChanged}
              />
            </div>
          </div>
        </div>
      );
    }

    return seeker;
  }
}
