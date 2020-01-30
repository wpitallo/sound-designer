import React from "react";
import { Button } from "devextreme-react";

export default class HideMenuButton extends React.Component {
  render() {
    return (
      <Button
        icon="close"
        type="normal"
        onClick={this.props.handler}
        style={{
          marginTop: "-9px",
          marginLeft: "260px",
          position: "absolute",
          overflow: "hidden",
          color: "white",
          border: "none"
        }}
      />
    );
  }
}
