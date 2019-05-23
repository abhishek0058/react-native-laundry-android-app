import React, { Component } from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
// import Profile from "./profile/Profile";
import Package from "./packages/Package";
import Machine from "./machine/Machine";
// import Verify from "./verify/Verify";
import RefundPolicy from "./refund-policy/RefundPolicy";
import PurchaseHistory from "./purchaseHistory/PurchaseHistory";
import Logout from "./Logout";
import Instructions from './instruction/Instructions';
import Faq from "./faq/Faq";
import ContactUs from "./contactus/ContactUs";

// import { getData } from "./FetchService";

const CustomDrawerComponents = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 180,
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
    'Washing Machines': Machine,
    Package: Package,
    Purchases: PurchaseHistory,
    Instructions: Instructions,
    // Profile: Profile,
    Faq: Faq,
    'Our Policies': RefundPolicy,
    'Contact us': ContactUs,
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

  render() {
    return <HomeNavigator />;
  }
}
