import React, { Component } from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation";

import Profile from "./profile/Profile";
import Package from "./packages/Package";
import Machine from "./machine/Machine";
import BaseURL from "./BaseURL";

const CustomDrawerComponents = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 200,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image
        source={require("../assets/user.png")}
        style={{ height: 150, resizeMode: "contain" }}
      />
    </View>
    <ScrollView style={{ padding: 20 }}>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const HomeNavigator = createDrawerNavigator(
  {
    Machine: Machine,
    Package: Package,
    Profile: Profile
  },
  {
    contentComponent: CustomDrawerComponents,
    contentOptions: {
      activeTintColor: "blue"
    }
  }
);

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    // console.log('home', this.props.navigation.state.params)
    return <HomeNavigator />;
  }
}
