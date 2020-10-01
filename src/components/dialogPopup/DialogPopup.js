import React from "react";
import { Popup } from "devextreme-react";

export default class DialogPopup extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    return (
      <div>
        <Popup
          visible={this.props.notificationVisible}
          onHiding={this.props.dismissNotification}
          dragEnabled={false}
          closeOnOutsideClick={true}
          showTitle={true}
          title={this.props.notificationTitle}
          width={400}
          height={300}
        >
          <div>
            <h4> {this.props.notificationMessage}</h4>
            <span>
              <br />
            </span>
          </div>
        </Popup>
      </div>
    );
  }
}
