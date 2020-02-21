import React from "react";
import { Button, TextBox } from "devextreme-react";
import UploadPopup from "./UploadPopup";
import axios from "axios";

export default class AddControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files
    });
  };

  onClickHandler = () => {
    const data = new FormData();
    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append("file", this.state.selectedFile[x]);
    }

    axios
      .post("http://localhost:8000/upload", data, {
        // receive two    parameter endpoint url ,form data
      })

      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
  };

  checkMimeType = event => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/gif"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + " is not a supported format\n";
      }
    }

    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      return false;
    }
    return true;
  };

  render() {
    let disabled = false;
    if (this.props.parentName === "Default") {
      disabled = true;
    }
    let control;
    if (this.props.menuType === "multiple-files") {
      control = <UploadPopup />;
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
          <TextBox
            style={{
              marginTop: "18px",
              width: "145px",
              float: "left"
            }}
            placeholder={this.props.menuEntity}
            showClearButton={true}
            disabled={disabled}
          />
          <Button
            icon="add"
            type="normal"
            text="Add"
            disabled={disabled}
            onClick={this.doneClick}
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
