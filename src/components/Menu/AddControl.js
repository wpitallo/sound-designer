import React from "react";
import { Button, TextBox } from "devextreme-react";

export default class AddControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          paddingTop: "0px",
          paddingLeft: "7px",
          overflow: "hidden"
        }}
      >
        <TextBox
          style={{ marginTop: "18px", width: "195px", float: "left" }}
          placeholder={this.props.menuEntity}
          showClearButton={true}
        />
        <Button
          icon="add"
          type="normal"
          text="Add"
          onClick={this.doneClick}
          style={{ marginTop: "18px", overflow: "hidden", color: "white" }}
        />
      </div>
    );
  }
}
