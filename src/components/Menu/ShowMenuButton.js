import React from "react";
import { Button, TextBox } from "devextreme-react";

export default class ShowMenuButton extends React.Component {
  render() {
    return (
      <Button
        icon="menu"
        type="normal"
        onClick={this.doneClick}
        style={{
          "margin-top": "-9px",
          "margin-left": "5px",
          position: "absolute",
          overflow: "hidden",
          color: "white",
          border: "none"
        }}
      />
    );
  }
}
