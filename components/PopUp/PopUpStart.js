import React, { Component } from "react";
import Dialog, {
  DialogContent,
  ScaleAnimation,
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";
import { List, ListItem, Text } from "native-base";

export default class PopUpStart extends Component {
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
            text="OK"
            onPress={() => {
              onPressOk();
            }}
          />
        ]}
      >
        <DialogContent>
          <List>
            <ListItem>
              <Text style={{ fontStyle: 'italic' }}>Kindly press power button on the washing machine</Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontWeight: 'bold' }}>Please note</Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontWeight: '700' }}>
                Once you press the START button, the washing machine will remain powered 'ON' for 80 minutes, as displayed by the app timer.
              </Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontStyle: 'italic' }}>
                The Actual washing machine time is much lesser than 80 minutes, which is displayed by the timer on washing machine.
              </Text>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    );
  }
}

