import React, { Component } from "react";
import Slider from "react-rangeslider";

import "./vertical-slider.css";

export default class VerticalSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      volume: 20
    };
  }

  handleOnChange = value => {
    this.setState({
      volume: value
    });
  };

  render() {
    let { volume } = this.state;
    return (
      <div className="slider-vertical">
        <Slider
          value={volume}
          orientation="vertical"
          onChange={this.handleOnChange}
          tooltip={false}
        />
      </div>
    );
  }
}
