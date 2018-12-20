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
              <Text style={{ fontStyle: 'italic' }}>Kindly wash coloured clothes separately</Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontStyle: 'italic' }}>Close the machine Lid and press the button 'ON' on the washing machine</Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontWeight: '700' }}>In case of any issue, call on +91-964-403-5102</Text>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    );
  }
}

