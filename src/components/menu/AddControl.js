import React from "react";
import { Button, TextBox } from "devextreme-react";
import UploadPopup from "./UploadPopup";
import axios from "axios";
import DialogPopup from "../dialogPopup/DialogPopup";

export default class AddControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addText: "",
      notificationVisible: false
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.dismissNotification = this.dismissNotification.bind(this);
  }

  // onChangeHandler = event => {
  //   this.setState({
  //     selectedFile: event.target.files
  //   });
  // };

  handleTextChange = e => {
    this.setState({ addText: e.event.target.value });
  };

  onClickHandler = async e => {
    if (this.state.addText !== undefined) {
      if (this.state.addText.trim() !== "") {
        let url = await this.props.getAddUrl(this.props.menuEntity, this.state.addText);
        const result = await axios.post(url);
        if (result.data.status === "ok") {
          this.props.refreshData(this.props.menuEntity, result.data.message);
        } else {
          this.setState({ notificationVisible: true });
          this.setState({ notificationTitle: `Add ${this.props.menuEntity} error` });
          this.setState({ notificationMessage: result.data.message });
        }
      }
    }
  };

  dismissNotification() {
    this.setState({ notificationVisible: false });
  }

  render() {
    let disabled = false;

    let error = (
      <DialogPopup
        notificationVisible={this.state.notificationVisible}
        dismissNotification={this.dismissNotification}
        notificationTitle={this.state.notificationTitle}
        notificationMessage={this.state.notificationMessage}
      />
    );

    if (this.props.parentName === "Default") {
      disabled = true;
    }
    let control;
    if (this.props.menuType === "multiple-files") {
      control = (
        <UploadPopup
          serverBaseUrl={this.props.serverBaseUrl}
          selectedProject={this.props.selectedProject}
          selectedSprite={this.props.selectedSprite}
          refreshData={this.props.refreshData}
        />
      );
    }
    if (this.props.menuType === "create-directory") {
      control = (
        <div
          style={{
            paddingTop: "0px",
            paddingLeft: "7px",
            overflow: "hidden"
          }}
        >
          {error}
          <TextBox
            style={{
              marginTop: "18px",
              width: "145px",
              float: "left"
            }}
            placeholder={this.props.menuEntity}
            showClearButton={true}
            disabled={disabled}
            value={this.state.addText}
            onChange={this.handleTextChange}
          />
          <Button
            icon="add"
            type="normal"
            text="Add"
            disabled={disabled}
            onClick={this.onClickHandler}
            style={{
              marginTop: "18px",
              overflow: "hidden",
              color: "white"
            }}
          />
        </div>
      );
    }
    return control;
  }
}
