import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import { Text, Icon, Header, Left, Right, Body } from "native-base";
import { Constants, WebBrowser } from "expo";
class RefundPolicy extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="book" style={{ color: "blue" }} />
  };

  makeHeader = () => {
    return (
      <Header style={{ backgroundColor: "white" }}>
        <Left>
          <Icon
            name="menu"
            onPress={() => this.props.navigation.openDrawer()}
          />
        </Left>
        <Body>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Refund Policy
          </Text>
        </Body>
        <Right />
      </Header>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.makeHeader()}
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <Image
            style={{ height: 120, width: 240, alignSelf: "center" }}
            source={require("../../assets/logo-old.png")}
          />
          <Text
            style={{
              padding: 20,
              fontSize: 18,
              fontWeight: "500",
              paddingTop: 15
            }}
          >
            Since our Website offers non-tangible, irrevocable services we do
            not provide refunds after the services is purchased, which you
            acknowledge prior to purchasing any service on the Laundry Bay App.
          </Text>
          <Text
            style={{
              padding: 20,
              fontSize: 18,
              fontWeight: "500",
              paddingTop: 15
            }}
          >
            Please make sure that you've carefully read service description
            before making a purchase.
          </Text>
          <Text
            style={{
              padding: 20,
              fontSize: 18,
              fontWeight: "500",
              paddingTop: 15
            }}
          >
            If you have any questions about this Policy, please contact us.
          </Text>
          <Text
            style={{
              padding: 20,
              fontSize: 18,
              fontWeight: "bold",
              paddingTop: 15
            }}
          >
            Laundry Bay Team
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              padding: 20,
              paddingTop: 15
            }}
          >
          <Text>
            Read our 
          </Text>
            <Text
              style={{
                color: "blue",
                marginLeft: 5
              }}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "http://www.laundrybay.in/privacypolicy"
                )
              }
            >
              Privacy Policy, 
            </Text>
            <Text
              style={{
                marginLeft: 5,
                color: "blue"
              }}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "http://www.laundrybay.in/refundpolicy"
                )
              }
            >
              Refund Policy
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default RefundPolicy;
