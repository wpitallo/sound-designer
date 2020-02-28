import React from "react";

import Menu from "./components/menu/Menu.js";
import EffectEditor from "./content/EffectEditor.js";
import ThreeVisualizer from "./components/threeVisualizer/ThreeVisualizer.js";
import "./app.css";
import PresetPlayer from "./content/PresetPlayer.js";
import BackgroundVisualizer from "./components/backgroundVisualizer/backgroundVisualizer.js";

import HowlController from "./components/howlController/HowlController.js";

import "./background.js";

let serverBaseUrl = "https://w97sc.sse.codesandbox.io/";
let soundsBaseUrl = "https://w97sc.sse.codesandbox.io/sound-files";

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
      effectsData: undefined,
      width: "250px",
      opacity: 1
    };
    this.menuItemClicked = this.menuItemClicked.bind(this);
    this.attachAnalyser = this.attachAnalyser.bind(this);
    this.howlLoaded = this.howlLoaded.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.getAddUrl = this.getAddUrl.bind(this);
    this.addPresetDefault = this.addPresetDefault.bind(this);
  }

  howlLoaded() {
    let selectedSound = this.state.selectedSound;
    selectedSound.soundDuration = this.howlController.duration();

    this.setState({ selectedSound: selectedSound });

    this.attachAnalyser(this.howlController.analyser, this.howlController.howler.ctx.destination.context);

    //this.threeVisualizer.attachAnalyser();
  }

  addPresetDefault(data) {
    let foundDefault = data.find(x => x.name === "Default");
    if (!foundDefault) {
      data.push({
        id: "DEFAULT",
        order: 0,
        name: "Default",
        effects: []
      });
      data.sort((a, b) => a.order - b.order);
    }
    return data;
  }

  attachAnalyser(analyser, audioContext) {
    this.threeVisualizer.attachAnalyser(analyser);
    //this.backgroundVisualizer.attachAnalyser(analyser, audioContext);
  }

  async menuItemClicked(menuEntity, menuItem) {
    if (menuEntity === "projects") {
      if (this.spritesMenu) this.spritesMenu.clearSelection();

      this.setState({ selectedEffect: undefined });
      this.setState({ effectsData: undefined });
      this.setState({ selectedPreset: undefined });
      this.setState({ selectedSound: undefined });
      this.setState({ selectedSprite: undefined });
      this.setState({ selectedProject: menuItem });

      this.setState({ presetsData: undefined });
      this.setState({ soundsData: undefined });

      let projectData = await (async () => await (await fetch(`${serverBaseUrl}projects/${this.state.selectedProject.id}`)).json())();
      this.setState({
        spritesData: projectData.sprites
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
      this.setState({ effectsData: undefined });
      this.setState({ selectedPreset: undefined });
      this.setState({ selectedSound: undefined });
      this.setState({ selectedSprite: menuItem });

      this.setState({ presetsData: undefined });

      this.setState({
        soundsData: this.state.spritesData.find(x => x.id === this.state.selectedSprite.id).sounds
      });
    }
    if (menuEntity === "sounds") {
      if (this.presetsMenu) this.presetsMenu.clearSelection();

      this.setState({ selectedSound: menuItem });

      this.howlController.load(soundsBaseUrl + this.state.selectedSound.src, this.howlLoaded);

      let data = this.state.soundsData.find(x => x.id === this.state.selectedSound.id).presets;
      data = this.addPresetDefault(data);

      this.setState({ selectedEffect: undefined });
      this.setState({ effectsData: undefined });

      this.setState({ selectedPreset: undefined });
      this.setState({ selectedSound: menuItem });
      this.setState({ presetsData: data });
    }

    if (menuEntity === "presets") {
      if (this.effectsMenu) this.effectsMenu.clearSelection();

      this.setState({ selectedEffect: undefined });
      this.setState({ selectedPreset: menuItem });
      this.setState({
        effectsData: this.state.presetsData.find(x => x.id === this.state.selectedPreset.id).effects
      });
    }

    if (menuEntity === "effects") {
      if (!menuItem.effectsData) {
        menuItem.effectsData = {};
        menuItem.effectsData.startTime = 0;
        menuItem.effectsData.endTime = this.state.selectedSound.soundDuration;
        menuItem.effectsData.soundDuration = this.state.selectedSound.soundDuration;
      }
      this.setState({ selectedEffect: menuItem });
    }
  }

  refreshData(menuEntity, data) {
    if (menuEntity === "projects") {
      this.setState({ projectsData: data });
    }
    if (menuEntity === "sprites") {
      this.setState({ spritesData: data });
    }
    if (menuEntity === "sounds") {
      this.setState({ soundsData: data });
    }
    if (menuEntity === "presets") {
      data = this.addPresetDefault(data);
      this.setState({ presetsData: data });
    }
    if (menuEntity === "effects") {
      this.setState({ effectsData: data });
    }
  }

  unloadPresetPlayer(callback) {
    if (this.presetPlayer) {
      this.presetPlayer.unload(() => callback());
    } else {
      callback();
    }
  }

  async getAddUrl(menuEntity, addText) {
    if (menuEntity === "projects") {
      return `${serverBaseUrl}${menuEntity}?projectId=${addText}`;
    }
    if (menuEntity === "sprites") {
      return `${serverBaseUrl}${menuEntity}?projectId=${this.state.selectedProject.id}&spriteId=${addText}`;
    }
    if (menuEntity === "presets") {
      return `${serverBaseUrl}${menuEntity}?projectId=${this.state.selectedProject.id}&spriteId=${this.state.selectedSprite.id}&soundId=${
        this.state.selectedSound.id
      }&presetId=${addText}`;
    }
    if (menuEntity === "effects") {
      return `${serverBaseUrl}${menuEntity}?projectId=${this.state.selectedProject.id}&spriteId=${this.state.selectedSprite.id}&soundId=${
        this.state.selectedSound.id
      }&presetId=${this.state.selectedPreset.id}&effectId=${addText}`;
    }
  }

  async componentDidMount() {
    //let dataHelper = await import("./data/projects.js");
    let data = await (async () => await (await fetch(`${serverBaseUrl}projects`)).json())();
    this.setState({ projectsData: data });
  }

  render() {
    let projectsMenu;
    if (this.state.projectsData) {
      projectsMenu = (
        <Menu
          serverBaseUrl={serverBaseUrl}
          menuEntity="projects"
          noParent={true}
          onRef={ref => (this.projectsMenu = ref)}
          data={this.state.projectsData}
          menuItemClicked={this.menuItemClicked}
          menuType="create-directory"
          getAddUrl={this.getAddUrl}
          refreshData={this.refreshData}
        />
      );
    }

    let spritesMenu;
    if (this.state.spritesData) {
      spritesMenu = (
        <Menu
          serverBaseUrl={serverBaseUrl}
          menuEntity="sprites"
          onRef={ref => (this.spritesMenu = ref)}
          data={this.state.spritesData}
          menuItemClicked={this.menuItemClicked}
          showMenu={this.showProjectsMenu}
          menuType="create-directory"
          getAddUrl={this.getAddUrl}
          refreshData={this.refreshData}
        />
      );
    }

    let soundsMenu;
    if (this.state.soundsData) {
      soundsMenu = (
        <Menu
          serverBaseUrl={serverBaseUrl}
          menuEntity="sounds"
          onRef={ref => (this.soundsMenu = ref)}
          selectedProject={this.state.selectedProject}
          selectedSprite={this.state.selectedSprite}
          data={this.state.soundsData}
          menuItemClicked={this.menuItemClicked}
          showMenu={this.showSpritesMenu}
          menuType="multiple-files"
          refreshData={this.refreshData}
        />
      );
    }

    let presetsMenu;
    if (this.state.presetsData) {
      presetsMenu = (
        <Menu
          serverBaseUrl={serverBaseUrl}
          menuEntity="presets"
          onRef={ref => (this.presetsMenu = ref)}
          data={this.state.presetsData}
          menuItemClicked={this.menuItemClicked}
          showMenu={this.showSoundsMenu}
          menuType="create-directory"
          getAddUrl={this.getAddUrl}
          refreshData={this.refreshData}
        />
      );
    }

    let effectsMenu;
    if (this.state.effectsData) {
      effectsMenu = (
        <Menu
          serverBaseUrl={serverBaseUrl}
          menuEntity="effects"
          parentName={this.state.selectedPreset.name}
          onRef={ref => (this.effectsMenu = ref)}
          data={this.state.effectsData}
          menuItemClicked={this.menuItemClicked}
          showMenu={this.showPresetsMenu}
          menuType="create-directory"
          getAddUrl={this.getAddUrl}
          refreshData={this.refreshData}
        />
      );
    }
    let mainContent;
    if (this.state.selectedPreset && !this.state.selectedEffect) {
      mainContent = (
        <PresetPlayer
          soundsBaseUrl={soundsBaseUrl}
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
          soundsBaseUrl={soundsBaseUrl}
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
          position: "absolute",
          zIndex: 100,
          width: "100vw",
          height: "100vh"
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
