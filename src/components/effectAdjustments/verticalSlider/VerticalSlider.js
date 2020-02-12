import React from "react";
import Slider from "react-rangeslider";

import "./vertical-slider.css";

export default class VerticalSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    this.props.onChange(value);
    // this.setState({
    //   value: value
    // });
  }

  render() {
    return (
      <div className="flex-container-column">
        <div
          className="flex-item no-border"
          style={{
            fontSize: "25px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "10px",
            paddingTop: "15px"
          }}
        >
          {this.props.value}
        </div>
        <div className="flex-item no-border">
          <div className="slider-vertical">
            <Slider
              value={this.props.value}
              orientation="vertical"
              onChange={this.handleOnChange}
              tooltip={false}
            />
          </div>
        </div>
      </div>
    );
  }
}
