import React from "react";
import { Button } from "devextreme-react";

export default class MenuItem extends React.Component {
  render() {
    return (
      <div style={{ "margin-top": "10px" }}>
        <Button icon="trash" onClick={this.plusClick} />
        <Button style={{ height: "36px", width: "235px" }}>
          {this.props.item.name}
        </Button>
      </div>
    );
  }
}
