import React from "react";
import { Button } from "devextreme-react";

export default class ShowMenuButton extends React.Component {
  render() {
    return (
      <Button
        icon="menu"
        type="normal"
        onClick={this.doneClick}
        style={{
          marginTop: "-9px",
          marginLeft: "5px",
          position: "absolute",
          overflow: "hidden",
          color: "white",
          border: "none"
        }}
      />
    );
  }
}
