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
            this.props.hide();
            this.setState({ timeoutRef: null });
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
            <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: 10 }}>
                Loading ...
            </Text>
            <Spinner color="green" />
        </DialogContent>
      </Dialog>
    );
  }
}

