import React from "react";
import { Button } from "devextreme-react";

export default function MenuItem(props) {
  return (
    <div style={{ marginTop: "10px" }}>
      <Button icon="trash" />
      <Button
        style={{ height: "36px", width: "195px" }}
        onClick={() => {
          props.menuItemClicked(props.item);
        }}
      >
        {props.item.name}
      </Button>
    </div>
  );
}
