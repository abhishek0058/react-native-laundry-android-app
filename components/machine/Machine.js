import React, { Component } from "react";
import { Container, Header, Left, Right, Body, Text, Icon, Spinner, View, Button } from "native-base";
import { createStackNavigator } from "react-navigation";
import ShowMachines from "./ShowMachines";
import { getData } from '../FetchService'; 

const StackNav = createStackNavigator({
  ShowMachines: ShowMachines
});

export default class Machine extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="build" style={{ color: "blue" }} />
  };

  state = {
    refresh: false
  };

  render() {
    return (
        <Container>
          <StackNav screenProps={{ root: this.props.navigation }} />
        </Container>
      );
  }
}