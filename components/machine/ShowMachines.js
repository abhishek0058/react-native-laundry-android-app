import React, { Component } from "react";
import { ImageBackground, AppState } from "react-native";
import SocketIOClient from "socket.io-client";
import PopUpStart from "../PopUp/PopUpStart";
import PopUpEnd from "../PopUp/PopUpEnd";
import PopSimple from "../PopUp/PopSimple";
import PopError from "../PopUp/PopError";
import PopLoadingMachinesStatus from "../PopUp/PopLoadingMachinesStatus";

import { View,  Text,  Spinner,  Content,  Card,  CardItem, Icon, Header, Left, Right, Body, Button } from "native-base";
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
      cycles_left: 0,
      showStartPopup: false,
      showEndPopup: false,
      PopSimple: false,
      error: false,
      loadingPopup: true,
      appState: AppState.currentState,
      timeoutRef: null
    };
  }

  static navigationOptions = {
    header: null
  };

  fetchMachineFromServer = async (user) => {
    this.setState({ loading: true });
    try {
      const url = `newMachineSocket/getAllMachines/${user.hostelid}`;
      const response = await getData(url);
      const machines = Object.values(response.result);

      if(machines && machines.length) {
        console.log("machines", machines);
        this.setState({ data: machines, loading: false });
      }
      else {
        this.setState({ loading: false });
      }
    } catch (e) {
      console.log("fetchMachineFromServer", e);
    }
  };

  fetchCycles = async userid => {
    try {
      const data = await getData(`account/cyclesLeft/${userid}`);
      if (data && data.result && data.result.length)
        this.setState({ cycles_left: data.result[0].cycles_left });
    } catch(e) {
      console.log("fetch cycles", e);
    }
  };

  async componentDidMount() {
    const user = await getFromAsync("user");
    this.setState({ user });
    this.fetchMachineFromServer(user);
    this.socket.on("refresh", (response) => {
      const selectHostelId = response.selectHostelId;
      this.setState({ loading: false });
      if (response.machines && response.machines[selectHostelId]) {
        const machines = Object.values(response.machines[selectHostelId]);
        if (this.state.user.hostelid == selectHostelId) {
          this.setState({ data: machines });
        }
      }
    });
    this.socket.on("show_pop_up", (response) => {
      const { user, type } = response;
      if(user != this.state.user.id)
        return;
      switch (type) {
        case "machineStarted":
          this.setState({ showStartPopup: true });
          break;
        
        case "machineStopped":
          this.setState({ showEndPopup: true });
          break;
      }
    });
    this.socket.on("error_while_turning_machine_on", (response) => {
      const { user, message } = response;
      if(user != this.props.user.id) 
        return;
      alert(message);
    });
    this.fetchCycles(user.id);
    console.log(this.socket.id);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    if(this.state.timeoutRef) {
      clearTimeout(timeoutRef);
    }
    this.socket.disconnect();
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  showMachinesCards = () => {
    return this.state.data.map(machine => (
      <MachineHelper
        key={machine.id}
        machine={machine}
        user={this.state.user}
        socket={this.socket}
        cycles_left={this.state.cycles_left}
        openStartInstructionPopup={() =>
          this.setState({ showStartPopup: true })
        }
        openEndInstructionPopup={() => this.setState({ showEndPopup: true })}
        openPopSimple={() => this.setState({ PopSimple: true })}
        openPopError={() => this.setState({ PopError: true })}
      />
    ));
  };

  showLocation = (data) => {
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
        <ImageBackground
          source={require("../../assets/bg.png")}
          style={{
            flex: 1,
            width: "100%",
            height: "100%"
            // resizeMode: "cover"
          }}
        >
          <View style={{ flex: 1 }}>
            <PopUpStart
              show={this.state.showStartPopup}
              hide={() => this.setState({ showStartPopup: false })}
              onPressOk={() => this.setState({ showStartPopup: false })}
              onPressCancel={() => this.setState({ showStartPopup: false })}
              title={"Instructions"}
            />
            <PopUpEnd
              show={this.state.showEndPopup}
              hide={() => this.setState({ showEndPopup: false })}
              onPressOk={() => this.setState({ showEndPopup: false })}
              onPressCancel={() => this.setState({ showEndPopup: false })}
              title={"Washing Done"}
            />
            <PopSimple 
              show={this.state.PopSimple}
              hide={() => this.setState({ PopSimple: false })}
              onPressOk={() => this.setState({ PopSimple: false })}
              onPressCancel={() => this.setState({ PopSimple: false })}
              title={"Reminder"}
            />
            <PopError 
              show={this.state.error}
              hide={() => this.setState({ error: false })}
              onPressOk={() => this.setState({ error: false })}
              title={"Oops"}
            />
            {this.makeHeader()}
            {this.showLocation(data)}
            <View style={{ flex: 10 }}>
              <Content>{this.showMachinesCards()}</Content>
            </View>
          </View>
        </ImageBackground>
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

  _handleAppStateChange = async (nextAppState) => {
    console.log("state -> ", nextAppState);
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      try {
        let { user } = this.state;
        this.fetchMachineFromServer(user);        
      } catch (e) {
        console.log("fetchMachineFromServer", e);
      }
      // this.fetchMachineFromServer(this.state.user);
    }
    this.setState({appState: nextAppState });
  }
}
export default ShowMachines;
