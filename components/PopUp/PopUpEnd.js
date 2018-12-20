import React, { Component } from "react";
import Dialog, {
  DialogContent,
  ScaleAnimation,
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";
import { List, ListItem, Text, Icon } from "native-base";

export default class PopUpEnd extends Component {
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
            text="Sure"
            onPress={() => {
              onPressOk();
            }}
          />
        ]}
      >
        <DialogContent>
          <List>
            <ListItem>
              <Text style={{ fontWeight: '800' }}>Your clothes has been washed, kindly collect them from the washing machine.</Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontWeight: '800' }}>To arrange a pick-up of cloths for IRONING, Please call on +91-123-456-7890</Text>
            </ListItem>
            <ListItem>
              <Text style={{ fontStyle: 'italic' }}>Thank you</Text>
              <Icon name="happy" style={{ marginLeft: 10, color: "green" }} />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    );
  }
}

