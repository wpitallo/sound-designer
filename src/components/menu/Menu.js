import React from "react";
import { Accordion, Button, TextBox } from "devextreme-react";

import AddControl from "./AddControl.js";
import ShowMenuButton from "./ShowMenuButton.js";
import HideMenuButton from "./HideMenuButton.js";

import MenuItems from "./MenuItems.js";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "250px",
      opacity: 1
    };
    this.menuItemClicked = this.menuItemClicked.bind(this);
  }

  menuItemClicked(e) {
    this.props.menuItemClicked(this.props.menuEntity, e);
  }
  showMenuButton() {
    this.setState({
      width: "200px"
    });
    setTimeout(() => {
      this.setState({
        opacity: 1
      });
    }, 2000);
  }
  hideMenuButton() {
    this.setState({
      opacity: 0
    });
    setTimeout(() => {
      this.setState({
        width: "0px"
      });
    }, 2000);
  }
  render() {
    return (
      <div
        className="flex-item"
        style={{
          height: "100%",
          width: `${this.state.width}`,
          transition: "width 2s, opacity 2s linear",
          opacity: `${this.state.opacity}`,
          paddingTop: "10px"
        }}
      >
        <div
          style={{
            width: "100%",
            height: "25px"
          }}
        >
          <ShowMenuButton handler={this.showMenuButton} />
          <HideMenuButton handler={this.hideMenuButton} />
        </div>
        <div
          style={{
            width: "100%",
            height: "25px",
            textAlign: "center"
          }}
        >
          <p style={{ color: "white" }}>Test</p>
        </div>
        <div
          style={{
            border: "0.2px solid #595959",
            width: "100%",
            height: "70px"
          }}
        >
          <AddControl menuEntity={this.props.menuEntity} />
        </div>
        <div
          style={{
            height: "100vh",
            width: "250px",
            border: "0.2px solid #595959",
            paddingLeft: "10px",
            paddingRight: "1px"
          }}
        >
          <MenuItems
            data={this.props.data}
            menuItemClicked={this.menuItemClicked}
          />
        </div>
      </div>
    );
  }
}
