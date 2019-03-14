import React, { Component } from "react";
import Dialog, {
  DialogContent,
  ScaleAnimation,
  DialogTitle,
  DialogButton
} from "react-native-popup-dialog";
import { View, Text, Spinner } from "native-base";

export default class PopLoadingMachinesStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeoutRef: null
        }
    }
    
    componentWillMount() {
        const timeoutRef = setTimeout(() => {
          this.setState({ timeoutRef: null });
          this.props.hide();
        }, 5000);
        this.setState({ timeoutRef });
    }

    componentWillUnmount() {
        if(this.state.timeoutRef)
            clearTimeout(this.state.timeoutRef);
    }

  render() {
    const { show, title } = this.props;
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
        onHardwareBackPress={() => {
          console.log("onHardwareBackPress");
        }}
      >
        <DialogContent>
            <Spinner color="green" />
            <Text style={{ padding: 10, fontSize: 15, fontWeight: '400', textAlign: 'center' }}>
              Fetching live status
            </Text>
            <Text style={{ padding: 10, fontSize: 15, fontWeight: '300' }}>
             Kindly wait a few seconds or press the refresh button at the the top right corner in case your washing machine's status shows power failure
            </Text>
        </DialogContent>
      </Dialog>
    );
  }
}

