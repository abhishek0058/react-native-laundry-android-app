import React, { Component } from "react";
import { Container, Icon } from "native-base";
import { createStackNavigator } from "react-navigation";
import ShowMachines from "./ShowMachines";

const StackNav = createStackNavigator({
  ShowMachines: ShowMachines
});

export default class Machine extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="build" style={{ color: "blue" }} />
  };

  render() {
    return (
        <Container>
          <StackNav screenProps={{ root: this.props.navigation }} />
        </Container>
      );
  }
}