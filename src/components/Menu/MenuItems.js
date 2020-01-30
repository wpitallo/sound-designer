import React from "react";

import MenuItem from "./MenuItem.js";

export default function MenuItems(props) {
  return (
    <ul style={{ listStyleType: "none" }}>
      {props.data.map(function(item, index) {
        return (
          <li key={index}>
            <MenuItem item={item} />
          </li>
        );
      })}
    </ul>
  );
}
