import React from "react";
import { Button, TextBox, DropDownButton } from "devextreme-react";

import StartEndTime from "./StartEndTime.js";
import EaseType from "./EaseType.js";

import ValueControls from "./ValueControls.js";

export default class EffectSelection extends React.Component {
  constructor(props) {
    super(props);

    this.howlerEffects = [
      { id: 1, name: "Volume", icon: "fas fa-volume-up" },
      { id: 4, name: "Rate", icon: "fas fa-tachometer-alt" },
      { id: 2, name: "Center", icon: "aligncenter" },
      { id: 3, name: "Justify", icon: "alignjustify" }
    ];
    this.onHowlerEffectClick = this.onHowlerEffectClick.bind(this);

    this.easeTypes = [
      { name: "None" },
      { name: "Linear" },
      { name: "EaseIn" },
      { name: "EaseOut" },
      { name: "EaseInOut" }
    ];

    this.onEaseTypeChanged = this.onEaseTypeChanged.bind(this);

    this.state = {
      selectedEffectType: this.howlerEffects[1],
      easeType: this.easeTypes[1]
    };
  }

  onHowlerEffectClick(e) {
    this.setState({ selectedEffectType: e.itemData });
  }

  onEaseTypeChanged(e) {
    this.setState({ easeType: e.itemData });
  }

  render() {
    return (
      <div className="flex-item no-border">
        <div className="flex-container-row">
          <div
            className="flex-item no-border"
            style={{
              paddingLeft: "20px",
              marginTop: "18px"
            }}
          >
            <TextBox
              style={{ width: "100%", float: "left" }}
              placeholder="Effect Name"
              showClearButton={true}
              text={this.props.selectedEffect.name}
            />
          </div>
          <div
            className="flex-item no-border"
            style={{
              width: "180px",
              paddingLeft: "20px",
              marginTop: "18px"
            }}
          >
            <Button
              icon="save"
              type="normal"
              text="save"
              onClick={this.doneClick}
              style={{ overflow: "hidden", color: "white" }}
            />
          </div>
        </div>

        <div className="flex-container-row">
          <div
            className="flex-item no-border"
            style={{
              fontSize: "18px",
              width: "100%",
              textAlign: "center",
              marginTop: "18px"
            }}
          >
            Effect
          </div>
          <div
            className="flex-item no-border"
            style={{
              fontSize: "18px",
              width: "100%",
              textAlign: "center",
              marginTop: "18px"
            }}
          >
            Ease Type
          </div>
        </div>

        <div className="flex-container-row">
          <div
            className="flex-item no-border"
            style={{
              width: "100%",
              paddingBottom: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
              marginTop: "18px"
            }}
          >
            <DropDownButton
              style={{
                width: "100%"
              }}
              text={this.state.selectedEffectType.name}
              icon={this.state.selectedEffectType.icon}
              dropDownOptions={{ width: 300 }}
              items={this.howlerEffects}
              displayExpr="name"
              onItemClick={this.onHowlerEffectClick}
            />
          </div>
          <div
            className="flex-item no-border"
            style={{
              width: "100%",
              paddingBottom: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
              marginTop: "18px"
            }}
          >
            <DropDownButton
              style={{
                width: "100%"
              }}
              text={this.state.easeType.name}
              dropDownOptions={{ width: 300 }}
              items={this.easeTypes}
              displayExpr="name"
              onItemClick={this.onEaseTypeChanged}
            />
          </div>
        </div>

        <div className="flex-container-row">
          <div className="flex-item no-border">
            <StartEndTime
              selectedEffect={this.props.selectedEffect}
              howlController={this.props.howlController}
              effectData={this.props.effectData}
              easeType={this.state.easeType}
              startTimeChanged={this.props.startTimeChanged}
              endTimeChanged={this.props.endTimeChanged}
            />
            <ValueControls
              selectedEffect={this.props.selectedEffect}
              selectedEffectType={this.state.selectedEffectType}
              easeType={this.state.easeType}
            />
            <EaseType easeType={this.state.easeType} />
          </div>
        </div>
      </div>
    );
  }
}
