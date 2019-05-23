import React, { Component } from "react";
import { getData } from "../FetchService";
import {  Content,  Card,  CardItem,  Text,  Body,  Button,  Spinner,  Icon } from "native-base";
import { View } from "react-native";

export default class MachineHelper extends Component {
  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.state = {
      loading: false,
      timer: "",
      clockColor: "black",
      message: ""
    };
  }

  start = () => {
    this.setState({ loading: true });
    this.props.socket.emit("machine_on", {
      channel: this.props.machine.channel,
      user: this.props.user.id
    });
  };

  componentDidUpdate(prevProps) {
    if(prevProps.machine._status != this.props.machine._status) {
      this.setState({ loading: false });
    }
  }

  makeButtonOrTimer = () => {
    const { machine } = this.props;
    const { timer } = this.props.machine;
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
    } else if (machine._status == "inactive") {
      return (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 10,
            textAlign: "center",
            color: "red"
          }}
        > Connection failure </Text>
      );
    } else if (machine._status == "active") {
      return (
        <Button success onPress={() => this.checkCycles()}>
          <Text>Start</Text>
        </Button>
      );
    } else if (machine._status == "busy") {
      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            {timer.min} min {timer.sec} sec
          </Text>
        </View>
      )
    } else if (machine._status == "inProgress") {
      return (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 10,
            textAlign: "center",
          }}
        > In progress </Text>
      )
    }
  };

  showStatus = (status) => {
    const { machine } = this.props;
    if (status == "active") {
      return <Text style={{ color: "green" }}>Active</Text>;
    }
    else if(status == "busy" && machine.user == this.props.user.id) {
      return (<Text style={{ color: "green" }}>You are using this machine</Text>)
    }
    else if (status == "busy") {
      return (<Text style={{ color: "red" }}>Machine is being used by another user</Text>);
    }
  };

  checkCycles = async () => {

    const data = await getData(`account/cyclesLeft/${this.props.user.id}`);
    if (data.result.length) {
      if (parseInt(data.result[0].cycles_left) > 0) {
          this.start();
      } else {
        this.props.openPopSimple();
      }
    }
    else {
      alert("Can't Fetch your Account Details right now.\nConsider trying again.");
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
          <CardItem footer>{this.showStatus(machine._status)}</CardItem>
        </Card>
      </Content>
    );
  }
}
