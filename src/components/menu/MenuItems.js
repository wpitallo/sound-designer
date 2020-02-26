import React from "react";

import MenuItem from "./MenuItem.js";

export default function MenuItems(props) {
  return (
    <ul style={{ listStyleType: "none" }}>
      {props.data.map((item, index) => {
        return (
          <li key={index}>
            <MenuItem item={item} menuItemClicked={props.menuItemClicked} selectedMenuItem={props.selectedMenuItem} />
          </li>
        );
      })}
    </ul>
  );
}
