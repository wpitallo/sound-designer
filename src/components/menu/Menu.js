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
      open: true,
      width: "250px",
      opacity: 1,
      labelOpacity: 0,
      selectedMenuItem: undefined
    };
    this.menuItemClicked = this.menuItemClicked.bind(this);
    this.showMenuHandler = this.showMenuHandler.bind(this);
    this.hideMenuHandler = this.hideMenuHandler.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  clearSelection() {
    this.setState({ selectedMenuItem: undefined });
  }

  menuItemClicked(menuItem) {
    this.setState({ selectedMenuItem: menuItem });
    this.props.menuItemClicked(this.props.menuEntity, menuItem);
  }

  showMenuHandler() {
    setTimeout(() => {
      this.setState({
        labelOpacity: 1
      });
      this.setState({
        width: "250px",
        labelOpacity: 0
      });
      setTimeout(() => {
        this.setState({
          opacity: 1
        });
        this.setState({ open: true });
      }, 200);
    }, 200);
  }

  hideMenuHandler() {
    this.setState({
      opacity: 0
    });
    setTimeout(() => {
      this.setState({
        width: "40px"
      });
      this.setState({ open: false });
      setTimeout(() => {
        this.setState({
          labelOpacity: 1
        });
      }, 200);
    }, 200);
  }
  render() {
    let name;
    if (this.state.selectedMenuItem) name = this.state.selectedMenuItem.name;
    let menuButton;
    if (this.state.open) {
      menuButton = (
        <div
          className="flex-item"
          style={{
            width: "100%",
            height: "25px",
            border: "none"
          }}
        >
          <HideMenuButton handler={this.hideMenuHandler} />{" "}
        </div>
      );
    } else {
      menuButton = (
        <div>
          <div
            className="flex-item"
            style={{
              width: "100%",
              height: "25px",
              border: "none"
            }}
          >
            <ShowMenuButton handler={this.showMenuHandler} />
          </div>
          <div
            className="flex-item"
            style={{
              width: "100%",
              height: "100%",
              border: "none"
            }}
          >
            <div
              style={{
                cursor: "pointer",
                color: "white",
                transform: "rotate(-90deg)",
                marginTop: "330px",
                left: "-15px",
                fontSize: "18px",
                textTransform: "capitalize",
                transition: "opacity 200ms linear",
                opacity: `${this.state.labelOpacity}`
              }}
              onClick={this.showMenuHandler}
            >
              {this.props.menuEntity}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className="flex-item"
        style={{
          height: "100%",
          width: `${this.state.width}`,
          transition: "width 200ms linear"
        }}
      >
        <div className="flex-container-column">
          {menuButton}

          <div
            className="flex-item"
            style={{
              transition: "opacity 200ms linear",
              opacity: `${this.state.opacity}`,
              paddingTop: "10px",
              borderTop: "none"
            }}
          >
            <div
              style={{
                width: "100%",
                height: "25px",
                textAlign: "center"
              }}
            >
              <p style={{ color: "white" }}>{name}</p>
            </div>
            <div
              style={{
                border: "0.2px solid #595959",
                width: "100%",
                height: "70px"
              }}
            >
              <AddControl
                menuEntity={this.props.menuEntity}
                parentName={this.props.parentName}
              />
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
                selectedMenuItem={this.state.selectedMenuItem}
                menuItemClicked={this.menuItemClicked}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
