import React from "react";
import { Button } from "devextreme-react";

export default class LanguageSelector extends React.Component {
  render() {
    return (
      <div
        style={{
          paddingLeft: "7px",
          overflow: "hidden"
        }}
      >
        <Button
          icon="add"
          type="normal"
          text="EN"
          onClick={this.doneClick}
          style={{ marginTop: "12px", overflow: "hidden", color: "white" }}
        />
        <Button
          icon="add"
          type="normal"
          text="CN"
          onClick={this.doneClick}
          style={{ marginTop: "12px", overflow: "hidden", color: "white" }}
        />
        <Button
          icon="add"
          type="normal"
          text="RU"
          onClick={this.doneClick}
          style={{ marginTop: "12px", overflow: "hidden", color: "white" }}
        />
      </div>
    );
  }
}
