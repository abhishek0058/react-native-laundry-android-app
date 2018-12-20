import React, { Component } from "react";
import SocketIOClient from "socket.io-client";
import {
  View,
  Text,
  Spinner,
  Content,
  Card,
  CardItem,
  Icon,
  Header,
  Left,
  Right,
  Body,
  Button
} from "native-base";
import { getFromAsync } from "../AsyncService";
import { getData } from "../FetchService";
import MachineHelper from "./MachineHelper";
import BaseURL from "../BaseURL";

class ShowMachines extends Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient(BaseURL);
    this.state = {
      data: [],
      user: {},
      loading: false,
      cycles_left: 0
    };
  }

  static navigationOptions = {
    header: null
  };

  fetchMachineFromServer = async user => {
    this.setState({ loading: true });
    const machines = await getData(
      `machineSocket/ByCityAndHostel/${user.cityid}/${user.hostelid}`
    );
    this.setState({ data: machines.result, loading: false });
  };

  fetchCycles = async userid => {
    const data = await getData(`account/cyclesLeft/${userid}`);
    if (data.result.length)
      this.setState({ cycles_left: data.result[0].cycles_left });
  };

  async componentDidMount() {
    const user = await getFromAsync("user");
    await this.setState({ user });
    this.fetchMachineFromServer(user);
    this.socket.on("newMachines", data => {
      console.log(data.result.length);
      this.setState({ loading: false });
      if (data.result.length) {
        if (
          this.state.user.cityid == data.result[0].cityid &&
          this.state.user.hostelid == data.result[0].hostelid
        ) {
          this.setState({ data: data.result });
        }
      }
    });
    this.fetchCycles(user.id);
    console.log(this.socket.id);
  }

  componentWillUnmount() {
    console.log("unmounting");
    this.socket.disconnect();
  }

  showMachinesCards = () => {
    return this.state.data.map(machine => (
      <MachineHelper
        key={machine.id}
        machine={machine}
        user={this.state.user}
        socket={this.socket}
        cycles_left={this.state.cycles_left}
      />
    ));
  };

  showLocation = data => {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Card>
          <CardItem>
            <Icon name="home" style={{ color: "orange" }} />
            <Text style={{ marginLeft: 15, fontSize: 16, fontStyle: "italic" }}>
              {`${data[0].hostelname}, ${data[0].cityname}`}
            </Text>
          </CardItem>
        </Card>
      </View>
    );
  };

  refreshIcon = () => {
    if (!this.state.loading) {
      return (
        <Icon
          name="refresh"
          onPress={() => {
            this.fetchMachineFromServer(this.state.user);
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 1000);
          }}
        />
      );
    } else {
      return <Spinner color="blue" />;
    }
  };

  makeHeader = () => {
    return (
      <Header style={{ backgroundColor: "white" }}>
        <Left>
          <Icon
            name="menu"
            onPress={() => this.props.screenProps.root.openDrawer()}
          />
        </Left>
        <Body>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Laundry Bay</Text>
        </Body>
        <Right>{this.refreshIcon()}</Right>
      </Header>
    );
  };

  render() {
    const { data } = this.state;

    if (this.state.loading) {
      return (
        <View style={{ flex: 1 }}>
          {this.makeHeader()}
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spinner color="green" />
            <Text
              style={{ fontSize: 16, fontStyle: "italic", fontWeight: "bold" }}
            >
              fetching machines for you
            </Text>
          </View>
        </View>
      );
    } else if (data.length) {
      return (
        <View style={{ flex: 1 }}>
          {this.makeHeader()}
          {this.showLocation(data)}
          <View style={{ flex: 10 }}>
            <Content>{this.showMachinesCards()}</Content>
          </View>
        </View>
      );
    } else if (data.length == 0 && !this.state.loading) {
      return (
        <View style={{ flex: 1 }}>
          {this.makeHeader()}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <Icon name="sad" style={{ fontSize: 36 }} />
            <Text
              style={{ fontSize: 16, fontStyle: "italic", fontWeight: "bold" }}
            >
              No machines found.
            </Text>
            <Text style={{ fontSize: 20, padding: 20 }}>Try</Text>
            <Button
              info
              full
              iconRight
              onPress={() => this.props.screenProps.root.navigate("Profile")}
              style={{
                width: 250,
                alignSelf: "center"
              }}
            >
              <Text style={{ fontSize: 15 }}>Set Location</Text>
              <Icon name="send" style={{ color: "white" }} />
            </Button>
          </View>
        </View>
      );
    }
  }
}
export default ShowMachines;
