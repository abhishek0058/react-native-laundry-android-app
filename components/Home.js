import React, { Component } from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import Profile from "./profile/Profile";
import Package from "./packages/Package";
import Machine from "./machine/Machine";
import Verify from './verify/Verify';
import PurchaseHistory from './purchaseHistory/PurchaseHistory';
import Logout from './Logout'

import { getData } from "./FetchService";


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
    Purchases: PurchaseHistory,
    Verify: Verify,
    Profile: Profile,
    Logout: Logout
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

  async componentWillMount() {
    const id = this.props.navigation.state.params.userid;
    const result = await getData(`user/single/${id}`);
  } 

  render() {
    // console.log('home', this.props.navigation.state.params)
    return <HomeNavigator />;
  }
}
