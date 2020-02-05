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
  }
  render() {
    return (
      <div className="flex-container-column">
        <div className="flex-container-row">
          <div className="flex-item no-border" style={this.seekLabelItemStyle}>
            {this.props.label}
          </div>
        </div>
        <div className="flex-item no-border" style={this.seekRangeItemStyle}>
          <Slider
            min={0}
            max={100}
            defaultValue={0}
            showRange={false}
            className="seekSlider"
          />{" "}
        </div>
        <div className="flex-container-row">
          <div className="flex-item no-border" style={this.seekBoxItemStyle}>
            <NumberBox
              width={"100%"}
              value={this.state.endTime}
              min={0}
              max={59}
              step={1}
              showSpinButtons={true}
              onValueChanged={this.onEndChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}
