import React from "react";
import { Button, TextBox, DropDownButton } from "devextreme-react";

import DefaultAdjustment from "./DefaultAdjustment.js";

export default class AudioAdjustmentRow extends React.Component {
  constructor(props) {
    super(props);

    this.howlerEffects = [
      { id: 1, name: "volume", icon: "alignleft" },
      { id: 4, name: "Right", icon: "alignright" },
      { id: 2, name: "Center", icon: "aligncenter" },
      { id: 3, name: "Justify", icon: "alignjustify" }
    ];

    this.state = {
      selectedEffect: this.howlerEffects[0]
    };
    this.onHowlerEffectClick = this.onHowlerEffectClick.bind(this);
  }

  onHowlerEffectClick(e) {
    this.setState({ selectedEffect: e.itemData });
  }
  render() {
    return (
      <div className="flex-item no-border">
        <div className="flex-container-row">
          <div
            className="flex-item no-border"
            style={{
              paddingTop: "0px",
              paddingLeft: "20px",
              marginTop: "18px"
            }}
          >
            <TextBox
              style={{ width: "195px", float: "left" }}
              placeholder="Effect Name"
              showClearButton={true}
            />
            <Button
              icon="save"
              type="normal"
              text="save"
              onClick={this.doneClick}
              style={{ overflow: "hidden", color: "white" }}
            />
          </div>
          <div
            className="flex-item no-border"
            style={{
              paddingBottom: "20px",
              paddingLeft: "20px"
            }}
          >
            <DropDownButton
              style={{
                width: "285px",
                textAlign: "left",
                marginTop: "18px"
              }}
              text={this.state.selectedEffect.name}
              icon={this.state.selectedEffect.icon}
              dropDownOptions={{ width: 300 }}
              items={this.howlerEffects}
              displayExpr="name"
              onItemClick={this.onHowlerEffectClick}
            />
          </div>
        </div>

        <div className="flex-container-row">
          <div
            className="flex-item no-border"
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "20px"
            }}
          >
            <DefaultAdjustment />
          </div>
        </div>
      </div>
    );
  }
}
