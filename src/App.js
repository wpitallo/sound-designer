import React from "react";

import Menu from "./components/menu/Menu.js";
import EffectEditor from "./content/EffectEditor.js";
import ThreeVisualizer from "./components/threeVisualizer/ThreeVisualizer.js";
import "./app.css";
import PresetPlayer from "./content/PresetPlayer.js";
import BackgroundVisualizer from "./components/backgroundVisualizer/backgroundVisualizer.js";

import HowlController from "./components/howlController/HowlController.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    if (!this.howlController) {
      this.howlController = new HowlController();
    }

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
      effectData: undefined,
      width: "250px",
      opacity: 1
    };
    this.menuItemClicked = this.menuItemClicked.bind(this);
    this.attachAnalyser = this.attachAnalyser.bind(this);
    this.howlLoaded = this.howlLoaded.bind(this);
  }

  howlLoaded() {
    let selectedSound = this.state.selectedSound;
    selectedSound.soundDuration = this.howlController.duration();

    this.setState({ selectedSound: selectedSound });

    this.attachAnalyser(
      this.howlController.analyser,
      this.howlController.howler.ctx.destination.context
    );

    //this.threeVisualizer.attachAnalyser();
  }

  attachAnalyser(analyser, audioContext) {
    this.threeVisualizer.attachAnalyser(analyser);
    //this.backgroundVisualizer.attachAnalyser(analyser, audioContext);
  }

  async menuItemClicked(menuEntity, menuItem) {
    if (menuEntity === "projects") {
      if (this.spritesMenu) this.spritesMenu.clearSelection();

      this.setState({ selectedEffect: undefined });
      this.setState({ effectData: undefined });
      this.setState({ selectedPreset: undefined });
      this.setState({ selectedSound: undefined });
      this.setState({ selectedSprite: undefined });
      this.setState({ selectedProject: menuItem });

      this.setState({ presetsData: undefined });
      this.setState({ soundsData: undefined });
      this.setState({
        spritesData: this.state.projectsData.find(
          x => x.id === this.state.selectedProject.id
        ).sprites
      });
    }
    if (menuEntity === "sprites") {
      if (this.soundsMenu) this.soundsMenu.clearSelection();

      // if (this.state.selectedProject.name === "Project 1") {
      //   dataHelper = await import("./data/sounds1.js");
      // } else {
      //   dataHelper = await import("./data/sounds2.js");
      // }

      this.setState({ selectedEffect: undefined });
      this.setState({ effectData: undefined });
      this.setState({ selectedPreset: undefined });
      this.setState({ selectedSound: undefined });
      this.setState({ selectedSprite: menuItem });

      this.setState({ presetsData: undefined });

      this.setState({
        soundsData: this.state.spritesData.find(
          x => x.id === this.state.selectedSprite.id
        ).sounds
      });
    }
    if (menuEntity === "sounds") {
      if (this.presetsMenu) this.presetsMenu.clearSelection();

      this.setState({ selectedSound: menuItem });

      this.howlController.unload();
      this.howlController.load(this.state.selectedSound.src, this.howlLoaded);

      let data = this.state.soundsData.find(
        x => x.id === this.state.selectedSound.id
      ).presets;

      let foundDefault = data.find(x => x.name === "Default");
      if (!foundDefault) {
        data.push({
          id: 0,
          name: "Default",
          effects: []
        });
        data.sort((a, b) => a.id - b.id);
      }

      this.setState({ selectedEffect: undefined });
      this.setState({ effectData: undefined });

      this.setState({ selectedPreset: undefined });
      this.setState({ selectedSound: menuItem });
      this.setState({ presetsData: data });
    }

    if (menuEntity === "presets") {
      if (this.effectsMenu) this.effectsMenu.clearSelection();

      this.setState({ selectedEffect: undefined });
      this.setState({ selectedPreset: menuItem });
      this.setState({
        effectData: this.state.presetsData.find(
          x => x.id === this.state.selectedPreset.id
        ).effects
      });
    }

    if (menuEntity === "effects") {
      if (!menuItem.effectData) {
        menuItem.effectData = {};
        menuItem.effectData.startTime = 0;
        menuItem.effectData.endTime = this.state.selectedSound.soundDuration;
        menuItem.effectData.soundDuration = this.state.selectedSound.soundDuration;
      }
      this.setState({ selectedEffect: menuItem });
    }
  }

  unloadPresetPlayer(callback) {
    if (this.presetPlayer) {
      this.presetPlayer.unload(() => callback());
    } else {
      callback();
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
          noParent={true}
          onRef={ref => (this.projectsMenu = ref)}
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
          onRef={ref => (this.spritesMenu = ref)}
          data={this.state.spritesData}
          menuItemClicked={this.menuItemClicked}
          showMenu={this.showProjectsMenu}
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
          showMenu={this.showSpritesMenu}
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
          showMenu={this.showSoundsMenu}
        />
      );
    }

    let effectsMenu;
    if (this.state.effectData) {
      effectsMenu = (
        <Menu
          menuEntity="effects"
          parentName={this.state.selectedPreset.name}
          onRef={ref => (this.effectsMenu = ref)}
          data={this.state.effectData}
          menuItemClicked={this.menuItemClicked}
          showMenu={this.showPresetsMenu}
        />
      );
    }
    let mainContent;
    if (this.state.selectedPreset && !this.state.selectedEffect) {
      mainContent = (
        <PresetPlayer
          howlController={this.howlController}
          selectedPreset={this.state.selectedPreset}
          selectedSound={this.state.selectedSound}
          attachAnalyser={this.attachAnalyser}
        />
      );
    }
    if (this.state.selectedEffect) {
      mainContent = (
        <EffectEditor
          howlController={this.howlController}
          selectedEffect={this.state.selectedEffect}
          selectedSound={this.state.selectedSound}
          attachAnalyser={this.attachAnalyser}
        />
      );
    }

    return (
      <div
        style={{
          height: "120px"
        }}
      >
        <div className="heading">
          <div alt="" className="adapter-logo">
            {/* <BackgroundVisualizer
              onRef={ref => (this.backgroundVisualizer = ref)}
            /> */}
            <ThreeVisualizer onRef={ref => (this.threeVisualizer = ref)} />
          </div>
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
