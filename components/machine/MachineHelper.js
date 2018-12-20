import React, { Component } from "react";
import SocketIOClient from "socket.io-client";
import BaseURL from "../BaseURL";
import {
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Spinner,
  Icon
} from "native-base";
import { View } from "react-native";

export default class MachineHelper extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient(BaseURL);
    this.state = {
      loading: false,
      timer: "--",
      clockColor: "black",
      message: ""
    };
  }

  componentDidMount() {
    try {
      this.socket.on("startTimer", data => {
        if(this.props.user.id == data.userid && this.props.machine.channel == data.channel) {
          console.log("startTimer", data);
          this.setState({
            timer: `${data.timer} minutes left`,
            clockColor: "green",
            message: "Machine has started"
          });
          this.props.openStartInstructionPopup();
        }
      });
      this.socket.on("timerUpdated", data => {
        if(this.props.user.id == data.userid && this.props.machine.channel == data.channel) {
          console.log("timerUpdated", data);
          this.setState({
            timer: `${data.timer} minutes left`,
            message: ""
          });
        }
      });
      this.socket.on("stopTimer", data => {
        if(this.props.user.id == data.userid && this.props.machine.channel == data.channel) {
          console.log("stopTimer", data);
          this.setState({
            timer: `${data.timer} minutes left`,
            clockColor: "red",
            message: "Times Up"
          });
          this.props.openEndInstructionPopup();
        }
      });
      this.socket.on("machineIsOn", data => {
        if(this.props.user.id == data.userid && this.props.machine.channel == data.channel) {
          console.log("machineIsOn", data);
          this.setState({
            clockColor: "green",
            message: "Machine is running"
          });
        }
      });
      this.socket.on("machineISOff", data => {
        if(this.props.user.id == data.userid && this.props.machine.channel == data.channel) {
          console.log("machineISOff", data);
          this.setState({
            clockColor: "red",
            message: "Machine is OFF"
          });
        }
      });
    } catch (e) {
      console.log("machinehelper -> component did mount", e);
    }
  }

  componentDidUpdate(old) {
    if (old.machine.status !== this.props.machine.status) {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    console.log("unmounting");
    this.socket.disconnect();
  }

  start = () => {
    this.setState({ loading: true });
    this.props.socket.emit("machineOn", {
      channel: this.props.machine.channel,
      cityid: this.props.user.cityid,
      hostelid: this.props.user.hostelid,
      machineid: this.props.machine.id,
      userid: this.props.user.id
    });
  };

  stop = () => {
    this.setState({ loading: true });
    this.props.socket.emit("machineOff", {
      channel: this.props.machine.channel,
      cityid: this.props.user.cityid,
      hostelid: this.props.user.hostelid,
      machineid: this.props.machine.id,
      userid: this.props.user.id
    });
  };

  makeButtonOrTimer = () => {
    const { machine } = this.props;
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spinner color="green" />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
              textAlign: "center"
            }}
          >
            Loading ..
          </Text>
        </View>
      );
    } else if (machine.status == "inactive") {
      return (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 10,
            textAlign: "center",
            color: "red"
          }}
        >
          Machine is not connected to the server.
        </Text>
      );
    } else if (machine.status == "active") {
      return (
        <Button success onPress={() => this.checkCycles()}>
          <Text>Start</Text>
        </Button>
      );
    } else if (
      machine.status == "busy" 
      // &&
      // machine.activator_user == this.props.user.id
    ) {
      // return (
        // <View style={{ flex: 1, flexDirection: "row" }}>
        //   <Button danger onPress={() => this.stop()}>
        //     <Text>Stop</Text>
        //   </Button>
        // </View>
      // );
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {this.state.timer}
          </Text>
        </View>
      )
    } 
    // else if (machine.status == "busy") {
    //   return (
    //     <Text
    //       style={{
    //         fontSize: 16,
    //         fontWeight: "bold",
    //         marginLeft: 10,
    //         textAlign: "center"
    //       }}
    //     >
    //       Machine is being used by another user
    //     </Text>
    //   );
    // }
  };

  showStatus = status => {
    const { machine } = this.props;
    if (status == "active")
      return <Text style={{ color: "green" }}>Active</Text>;
    else if(status == "busy" && machine.activator_user == this.props.user.id)
      return (<Text style={{ color: "green" }}>You are using this machine</Text>)
    else if (status == "busy")
      return (<Text style={{ color: "red" }}>Machine is being used by another user</Text>);
  };

  checkCycles = () => {
    if (this.props.cycles_left > 0) {
      this.start();
    } else {
      alert(
        "You do not have any cycles in your account please.\nPlease purchase a package to add cycles."
      );
    }
  };

  render() {
    const { machine } = this.props;
    const { clockColor, message } = this.state;
    return (
      <Content padder>
        <Card>
          <CardItem header>
            <Text>
              {machine.name}
            </Text>
            <Icon name="timer" style={{ marginLeft: 10, marginRight: 10, color: clockColor }} />
            <Text style={{ color: clockColor }}>
              {message}
            </Text>
          </CardItem>
          <CardItem>
            <Body>{this.makeButtonOrTimer()}</Body>
          </CardItem>
          <View />
          <CardItem footer>{this.showStatus(machine.status)}</CardItem>
        </Card>
      </Content>
    );
  }
}
