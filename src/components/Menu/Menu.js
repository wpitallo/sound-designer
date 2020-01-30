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
      data: [],
      width: "300px",
      opacity: 1
    };
    this.selectionChanged = this.selectionChanged.bind(this);
    this.selectedItemsChanged = this.selectedItemsChanged.bind(this);
    this.multipleChanged = this.multipleChanged.bind(this);
    this.collapsibleChanged = this.collapsibleChanged.bind(this);
    this.animationDurationChanged = this.animationDurationChanged.bind(this);
    this.showMenuButton = this.showMenuButton.bind(this);
    this.hideMenuButton = this.hideMenuButton.bind(this);
  }
  async componentDidMount() {
    const dataHelper = await import(this.props.dataEndpoint);
    const data = dataHelper.default.getData();
    this.setState({ data: data });
  }

  showMenuButton() {
    this.setState({
      width: "300px"
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
            width: "300px",
            border: "0.2px solid #595959",
            paddingLeft: "10px",
            paddingRight: "1px"
          }}
        >
          <MenuItems data={this.state.data} />
          {/* <div id="accordion">
            <Accordion
              dataSource={this.companies}
              collapsible={collapsible}
              multiple={multiple}
              animationDuration={animationDuration}
              selectedItems={selectedItems}
              onSelectionChanged={this.selectionChanged}
              itemTitleRender={SoundGroupTitle}
              itemRender={SoundTrackItem}
            />
          </div> */}
        </div>
      </div>
    );
  }

  selectionChanged(e) {
    let newItems = [...this.state.selectedItems];
    e.removedItems.forEach(item => {
      let index = newItems.indexOf(item);
      if (index >= 0) {
        newItems.splice(index, 1);
      }
    });
    if (e.addedItems.length) {
      newItems = [...newItems, ...e.addedItems];
    }
    this.setState({
      selectedItems: newItems
    });
  }

  selectedItemsChanged(e) {
    this.setState({
      selectedItems: e.value
    });
  }

  multipleChanged(e) {
    this.setState({
      multiple: e.value
    });
  }

  collapsibleChanged(e) {
    this.setState({
      collapsible: e.value
    });
  }

  animationDurationChanged(e) {
    this.setState({
      animationDuration: e.value
    });
  }
}
