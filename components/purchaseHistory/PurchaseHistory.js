import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { View } from "react-native";
import { Icon } from "native-base";
import DataFetcher from "./DataFetcher";

const Nav = createStackNavigator({
  DataFetcher: DataFetcher
});

class PurchaseHistory extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="cash" style={{ color: "blue" }} />
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Nav screenProps={{ rootNav: this.props.navigation }} />
      </View>
    );
  }
}

export default PurchaseHistory;
