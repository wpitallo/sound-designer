import React from "react";

import Menu from "./components/Menu/Menu.js";
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
              <Menu dataEndpoint="./data/projects.js" menuEntity="Project" />
              <Menu dataEndpoint="./data/sprites.js" menuEntity="Sprites" />
              <Menu dataEndpoint="./data/sounds.js" menuEntity="Sounds" />
              <Menu dataEndpoint="./data/effects.js" menuEntity="Effects" />
              <MainContent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
