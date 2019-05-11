import React, { Component } from "react";
import Dialog, {
  DialogContent,
  ScaleAnimation,
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";
import { Text } from "native-base";

export default class ConfirmLocation extends Component {
  render() {
    const { show, hide, onPressOk, title } = this.props;
    return (
      <Dialog
        width={0.9}
        // height={0.5}
        dialogAnimation={
          new ScaleAnimation({
            slideFrom: "bottom"
          })
        }
        containerStyle={{ zIndex: 10, elevation: 10 }}
        dialogTitle={<DialogTitle title={title} />}
        visible={show}
        onTouchOutside={() => {
          hide(true);
        }}
        onHardwareBackPress={() => {
          console.log("onHardwareBackPress");
        }}
        actions={[
          <DialogButton
            key="DialogButtoncancel"
            text="cancel"
            onPress={() => {
              hide();
            }}
          />,
          <DialogButton
            key="DialogButtonok"
            text="confirm"
            onPress={() => {
              onPressOk();
            }}
          />,
        ]}
      >
        <DialogContent>
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20 }}>
            Are you sure ?
          </Text>
        </DialogContent>
      </Dialog>
    );
  }
}

