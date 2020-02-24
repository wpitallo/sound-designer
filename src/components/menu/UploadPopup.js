import React from "react";
import { Button, Popup } from "devextreme-react";
import Upload from "./Upload";

export default class UploadPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEmployee: {},
      popupVisible: false
    };

    this.showInfo = this.showInfo.bind(this);
    this.hideInfo = this.hideInfo.bind(this);
  }

  render() {
    return (
      <div
        style={{
          paddingTop: "20px",
          paddingLeft: "10px",
          overflow: "hidden"
        }}
      >
        <Button className="button-info" style={{ width: "230px" }} text="Upload Sounds" onClick={this.showInfo} />
        <Popup
          visible={this.state.popupVisible}
          onHiding={this.hideInfo}
          dragEnabled={false}
          closeOnOutsideClick={true}
          showTitle={true}
          title="Upload Sound Files"
          width={800}
          height={600}
        >
          <Upload serverBaseUrl={this.props.serverBaseUrl} selectedProject={this.props.selectedProject} selectedSprite={this.props.selectedSprite} />
        </Popup>
      </div>
    );
  }

  showInfo(employee) {
    this.setState({
      currentEmployee: employee,
      popupVisible: true
    });
  }

  hideInfo() {
    this.setState({
      currentEmployee: {},
      popupVisible: false
    });
  }
}
