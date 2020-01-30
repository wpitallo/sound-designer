import React from "react";
import { Button, TextBox } from "devextreme-react";

export default class HideMenuButton extends React.Component {
  render() {
    return (
      <Button
        icon="close"
        type="normal"
        onClick={this.props.handler}
        style={{
          "margin-top": "-9px",
          "margin-left": "260px",
          position: "absolute",
          overflow: "hidden",
          color: "white",
          border: "none"
        }}
      />
    );
  }
}
