import React, { Component } from "react";
import Dialog, {
  DialogContent,
  ScaleAnimation,
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";
import { Text } from "native-base";

export default class PopSimple extends Component {
  render() {
    const { show, hide, onPressOk, onPressCancel, title } = this.props;
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
            key="DialogButtonok"
            text="Dismiss"
            onPress={() => {
              onPressOk();
            }}
          />
        ]}
      >
        <DialogContent>
          <Text style={{ padding: 20, fontWeight: "700" }}>
            No cycles left. Kindly purchase a new package.
          </Text>
        </DialogContent>
      </Dialog>
    );
  }
}

