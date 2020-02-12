import React from "react";
import { DropDownButton } from "devextreme-react";

import EaseGraph from "./easeGraph/EaseGraph.js";

import "./slider.css";

export default class EaseType extends React.Component {
  constructor(props) {
    super(props);

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
      easeFunction: this.easeFunctions[0]
    };

    this.EaseGraphFlexItemStyle = {
      paddingLeft: "20px",
      paddingRight: "20px",
      textAlign: "-webkit-center",
      marginTop: "-100px"
    };

    this.flexItemStyle = {
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "50px",
      paddingBottom: "20px",
      textAlign: "-webkit-center"
    };

    this.easeGraph = React.createRef();

    this.onEaseFunctionChanged = this.onEaseFunctionChanged.bind(this);
  }

  onEaseFunctionChanged(e) {
    this.setState({ easeFunction: e.itemData });
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

          <div className="flex-item no-border" style={this.flexItemStyle}>
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
    } else {
      easeType = <div />;
    }

    return easeType;
  }
}
