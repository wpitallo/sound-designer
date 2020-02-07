import React from "react";
import { Button } from "devextreme-react";

export default class ShowMenuButton extends React.Component {
  render() {
    return (
      <Button
        icon="menu"
        type="normal"
        onClick={this.props.handler}
        style={{
          marginTop: "5px",
          marginRight: "5px",
          float: "right",
          overflow: "hidden",
          color: "white",
          border: "none"
        }}
      />
    );
  }
}
