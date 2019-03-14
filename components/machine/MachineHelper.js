import React, { Component } from "react";
import SocketIOClient from "socket.io-client";
import BaseURL from "../BaseURL";
import { getData } from "../FetchService";
import {  Content,  Card,  CardItem,  Text,  Body,  Button,  Spinner,  Icon } from "native-base";
import { View } from "react-native";

export default class MachineHelper extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient(BaseURL);
    this.state = {
      loading: false,
      timer: "",
      clockColor: "black",
      message: ""
    };
  }

  async componentDidMount() {
    try {
      this.socket.on("startTimer", data => {
        if(this.props.machine.channel == data.channel) {
          console.log("startTimer", data);
          this.setState({
            timer: `${data.timer} minutes left`,
            clockColor: "green",
            message: "Started"
          });
          if(this.props.user.id == data.userid)
            this.props.openStartInstructionPopup();
        }
      });
      this.socket.on("timerUpdated", data => {
        if(this.props.machine.channel == data.channel) {
          console.log("timerUpdated", data);
          this.setState({
            timer: `${data.timer} minutes left`,
            message: ""
          });
        }
      });
      this.socket.on("stopTimer", data => {
        if(this.props.machine.channel == data.channel) {
          console.log("stopTimer", data);
          this.setState({
            timer: `${data.timer} minutes left`,
            clockColor: "red",
            message: "Times Up"
          });
          if(this.props.user.id == data.userid)
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
            message: "Timer is Paused"
          });
        }
      });
      this.socket.on("error", data => {
        if(this.props.user.id == data.userid && this.props.machine.channel == data.channel) {
          console.log("error", data);
          openPopError();
          this.setState({
            clockColor: "black",
            message: ""
          });
        }
      });
      const timerData = await getData(`machine/timer/${this.props.machine.channel}`);
      if(timerData.length) {
        console.log("timerData", timerData)
        this.setState({
          timer: `${timerData[0].minutes_left} minutes left`,
          clockColor: "black",
          message: "waiting for status"
        })
      }
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
        > Power failure </Text>
      );
    } else if (machine.status == "active") {
      return (
        <Button success onPress={() => this.checkCycles()}>
          <Text>Start</Text>
        </Button>
      );
    } else if (machine.status == "busy") {
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {this.state.timer}
          </Text>
        </View>
      )
    } 
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

  checkCycles = async () => {
    if(confirm("are you sure")) {
      alert("ok")
    }
    else {
      alert("here")
    }
    return null;
    const data = await getData(`account/cyclesLeft/${this.props.user.id}`);
    if (data.result.length) {
      // this.setState({ cycles_left:  });
      if (parseInt(data.result[0].cycles_left) > 0) {
        if(confirm("Are you sure ?")) {
          // this.start();
          alert("true")
        }
      } else {
        // alert(
        //   "You do not have any cycles in your account please.\nPlease purchase a package to add cycles."
        // );
        this.props.openPopSimple()
      }
    }
    else {
      alert(
        "Can't Fetch your Account Details right now.\nConsider trying again."
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
          </CardItem>
          <CardItem>
            <Body>
              {this.makeButtonOrTimer()}
              <Text style={{ color: clockColor, fontStyle: 'italic' }}>
                {message}
              </Text>
            </Body>
          </CardItem>
          <View />
          <CardItem footer>{this.showStatus(machine.status)}</CardItem>
        </Card>
      </Content>
    );
  }
}
