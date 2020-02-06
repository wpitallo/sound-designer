import React from "react";

import Menu from "./components/menu/Menu.js";
import EffectEditor from "./content/EffectEditor.js";

import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProject: undefined,
      projectsData: undefined,
      selectedSprite: undefined,
      spritesData: undefined,
      selectedSound: undefined,
      soundsData: undefined,
      selectedPreset: undefined,
      presetsData: undefined,
      selectedEffect: undefined,
      effectsData: undefined,
      width: "250px",
      opacity: 1
    };
    this.menuItemClicked = this.menuItemClicked.bind(this);
  }

  async menuItemClicked(menuEntity, menuItem) {
    //alert("menu entity: " + menuEntity + "menu name: " + menuItem.name);

    let dataHelper = {};

    if (menuEntity === "projects") {
      dataHelper = await import("./data/sprites.js");

      this.setState({ selectedProject: menuItem });

      this.setState({ selectedSprite: undefined });
      this.setState({ selectedSound: undefined });
      this.setState({ selectedPreset: undefined });
      this.setState({ selectedEffect: undefined });

      this.setState({ spritesData: dataHelper.default.getData() });
      this.setState({ soundsData: undefined });
      this.setState({ presetsData: undefined });
      this.setState({ effectsData: undefined });
    }
    if (menuEntity === "sprites") {
      if (this.state.selectedProject.name === "Project 1") {
        dataHelper = await import("./data/sounds1.js");
      } else {
        dataHelper = await import("./data/sounds2.js");
      }

      this.setState({ selectedSprite: menuItem });
      this.setState({ selectedSound: undefined });
      this.setState({ selectedPreset: undefined });
      this.setState({ selectedEffect: undefined });

      this.setState({ soundsData: dataHelper.default.getData() });
      this.setState({ presetsData: undefined });
      this.setState({ effectsData: undefined });
    }
    if (menuEntity === "sounds") {
      dataHelper = await import("./data/presets.js");
      let data = dataHelper.default.getData();
      let foundDefault = data.find(x => x.name === "Default");
      if (!foundDefault) {
        data.push({
          id: 0,
          name: "Default"
        });
        data.sort((a, b) => a.id - b.id);
      }

      this.setState({ selectedSound: menuItem });
      this.setState({ selectedPreset: undefined });
      this.setState({ selectedEffect: undefined });

      this.setState({ presetsData: data });
      this.setState({ effectsData: undefined });
    }

    if (menuEntity === "presets") {
      dataHelper = await import("./data/effects.js");

      this.setState({ selectedPreset: menuItem });
      this.setState({ selectedEffect: undefined });

      this.setState({ effectsData: dataHelper.default.getData() });
    }

    if (menuEntity === "effects") {
      this.setState({ selectedEffect: menuItem });
    }
  }
  async componentDidMount() {
    let dataHelper = await import("./data/projects.js");
    let data = dataHelper.default.getData();
    this.setState({ projectsData: data });
  }
  render() {
    let projectsMenu;
    if (this.state.projectsData) {
      projectsMenu = (
        <Menu
          menuEntity="projects"
          data={this.state.projectsData}
          menuItemClicked={this.menuItemClicked}
        />
      );
    }

    let spritesMenu;
    if (this.state.spritesData) {
      spritesMenu = (
        <Menu
          menuEntity="sprites"
          data={this.state.spritesData}
          menuItemClicked={this.menuItemClicked}
        />
      );
    }

    let soundsMenu;
    if (this.state.soundsData) {
      soundsMenu = (
        <Menu
          menuEntity="sounds"
          data={this.state.soundsData}
          menuItemClicked={this.menuItemClicked}
        />
      );
    }

    let presetsMenu;
    if (this.state.presetsData) {
      presetsMenu = (
        <Menu
          menuEntity="presets"
          data={this.state.presetsData}
          menuItemClicked={this.menuItemClicked}
        />
      );
    }

    let effectsMenu;
    if (this.state.effectsData) {
      effectsMenu = (
        <Menu
          menuEntity="effects"
          data={this.state.effectsData}
          menuItemClicked={this.menuItemClicked}
        />
      );
    }
    let mainContent;
    if (this.state.selectedEffect) {
      debugger;
      mainContent = <EffectEditor soundSrc={this.state.selectedSound.src} />;
    }

    return (
      <div>
        <div>
          <div
            style={{
              height: "120px"
            }}
          >
            <div className="heading">
              <div alt="" className="adapter-logo" />
            </div>
            <div className="heading">
              <div className="info text-center">
                <h3>
                  <span id="gameName" />
                </h3>
              </div>
            </div>

            <div className="flex-container-row">
              {projectsMenu}
              {spritesMenu}
              {soundsMenu}
              {presetsMenu}
              {effectsMenu}
              <div
                style={{
                  width: "100%"
                }}
              >
                {mainContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
