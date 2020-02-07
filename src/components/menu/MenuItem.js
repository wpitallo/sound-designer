import React from "react";
import { Button } from "devextreme-react";

export default function MenuItem(props) {
  let style = { height: "36px", width: "195px" };
  if (props.selectedMenuItem) {
    if (props.item.name === props.selectedMenuItem.name) {
      style = { height: "36px", width: "195px", backgroundColor: "#fc039d" };
    }
  }
  return (
    <div style={{ marginTop: "10px" }}>
      <Button icon="trash" />
      <Button
        style={style}
        onClick={() => {
          props.menuItemClicked(props.item);
        }}
      >
        {props.item.name}
      </Button>
    </div>
  );
}
