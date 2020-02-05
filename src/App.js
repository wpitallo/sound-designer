import React from "react";

import Menu from "./components/menu/Menu.js";
import MainContent from "./MainContent.js";

import "./app.css";

class App extends React.Component {
  render() {
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
              <Menu dataEndpoint="projects" menuEntity="Project" />
              <Menu dataEndpoint="sprites" menuEntity="Sprites" />
              <Menu dataEndpoint="sounds" menuEntity="Sounds" />
              <Menu dataEndpoint="presets" menuEntity="Presets" />
              <Menu dataEndpoint="effects" menuEntity="effects" />
              <MainContent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
