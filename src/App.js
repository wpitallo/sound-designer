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

    this.showEffectsMenu = this.showEffectsMenu.bind(this);
    this.showPresetsMenu = this.showPresetsMenu.bind(this);
    this.showSoundsMenu = this.showSoundsMenu.bind(this);
    this.showSpritesMenu = this.showSpritesMenu.bind(this);
    this.showProjectsMenu = this.showProjectsMenu.bind(this);
  }

  async menuItemClicked(menuEntity, menuItem) {
    //alert("menu entity: " + menuEntity + "menu name: " + menuItem.name);

    let dataHelper = {};

    if (menuEntity === "projects") {
      dataHelper = await import("./data/sprites.js");

      this.setState({ selectedEffect: undefined });
      this.setState({ selectedPreset: undefined });
      this.setState({ selectedSound: undefined });
      this.setState({ selectedSprite: undefined });
      this.setState({ selectedProject: menuItem });

      this.setState({ effectsData: undefined });
      this.setState({ presetsData: undefined });
      this.setState({ soundsData: undefined });
      this.setState({ spritesData: dataHelper.default.getData() });
    }
    if (menuEntity === "sprites") {
      if (this.state.selectedProject.name === "Project 1") {
        dataHelper = await import("./data/sounds1.js");
      } else {
        dataHelper = await import("./data/sounds2.js");
      }

      this.setState({ selectedEffect: undefined });
      this.setState({ selectedPreset: undefined });
      this.setState({ selectedSound: undefined });
      this.setState({ selectedSprite: menuItem });

      this.setState({ effectsData: undefined });
      this.setState({ presetsData: undefined });
      this.setState({ soundsData: dataHelper.default.getData() });
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

      this.setState({ selectedEffect: undefined });
      this.setState({ selectedPreset: undefined });
      this.setState({ selectedSound: menuItem });

      this.setState({ effectsData: undefined });
      this.setState({ presetsData: data });
    }

    if (menuEntity === "presets") {
      dataHelper = await import("./data/effects.js");

      this.setState({ selectedEffect: undefined });
      this.setState({ selectedPreset: menuItem });

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

  showEffectsMenu() {
    if (this.effectsMenu) {
      this.effectsMenu.showMenu();
    }
  }
  showPresetsMenu() {
    if (this.presetsMenu) {
      this.presetsMenu.showMenu();
    }
  }
  showSoundsMenu() {
    if (this.soundsMenu) {
      this.soundsMenu.showMenu();
    }
  }
  showSpritesMenu() {
    if (this.spritesMenu) {
      this.spritesMenu.showMenu();
    }
  }
  showProjectsMenu() {
    if (this.showProjectsMenu) {
      this.showProjectsMenu.showMenu();
    }
  }

  render() {
    let projectsMenu;
    if (this.state.projectsData) {
      projectsMenu = (
        <Menu
          menuEntity="projects"
          onRef={ref => (this.projectsMenu = ref)}
          data={this.state.projectsData}
          menuItemClicked={this.menuItemClicked}
          showMenu={this.showSpritesMenu}
        />
      );
    }

    let spritesMenu;
    if (this.state.spritesData) {
      spritesMenu = (
        <Menu
          menuEntity="sprites"
          onRef={ref => (this.spritesMenu = ref)}
          data={this.state.spritesData}
          menuItemClicked={this.menuItemClicked}
          showMenu={this.showSoundsMenu}
        />
      );
    }

    let soundsMenu;
    if (this.state.soundsData) {
      soundsMenu = (
        <Menu
          menuEntity="sounds"
          onRef={ref => (this.soundsMenu = ref)}
          data={this.state.soundsData}
          menuItemClicked={this.menuItemClicked}
          showMenu={this.showPresetsMenu}
        />
      );
    }

    let presetsMenu;
    if (this.state.presetsData) {
      presetsMenu = (
        <Menu
          menuEntity="presets"
          onRef={ref => (this.presetsMenu = ref)}
          data={this.state.presetsData}
          menuItemClicked={this.menuItemClicked}
          showMenu={this.showEffectsMenu}
        />
      );
    }

    let effectsMenu;
    if (this.state.effectsData) {
      effectsMenu = (
        <Menu
          menuEntity="effects"
          onRef={ref => (this.effectsMenu = ref)}
          data={this.state.effectsData}
          menuItemClicked={this.menuItemClicked}
        />
      );
    }
    let mainContent;
    if (this.state.selectedEffect) {
      mainContent = <EffectEditor soundSrc={this.state.selectedSound.src} />;
    }

    return (
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
    );
  }
}

export default App;
