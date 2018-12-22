import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { View, ImageBackground } from 'react-native';
import { Icon } from 'native-base'
import DataFetcher from './DataFetcher'

const Nav = createStackNavigator({
  DataFetcher: DataFetcher
});

class PurchaseHistory extends Component {
  
  static navigationOptions = {
    drawerIcon: () => <Icon name="cash" style={{ color: "blue" }} />
  };

  render() {
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
          <Nav screenProps={{ rootNav: this.props.navigation }} />
        </View>
      </ImageBackground>
    );
  }
}

export default PurchaseHistory;
