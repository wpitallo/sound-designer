import React from "react";
import { Button, TextBox } from "devextreme-react";

export default class AddControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let disabled = false;
    if (this.props.parentName === "Default") {
      disabled = true;
    }

    return (
      <div
        style={{
          paddingTop: "0px",
          paddingLeft: "7px",
          overflow: "hidden"
        }}
      >
        <TextBox
          style={{
            marginTop: "18px",
            width: "145px",
            float: "left",
            zIndex: "-100"
          }}
          placeholder={this.props.menuEntity}
          showClearButton={true}
          disabled={disabled}
        />
        <Button
          icon="add"
          type="normal"
          text="Add"
          disabled={disabled}
          onClick={this.doneClick}
          style={{
            marginTop: "18px",
            overflow: "hidden",
            color: "white"
          }}
        />
      </div>
    );
  }
}
