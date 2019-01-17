import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, Alert, Dimensions, ScrollView, ImageBackground, WebView } from "react-native";
import {
  Container,
  Header,
  View,
  Text,
  Left,
  Body,
  Icon,
  Right,
  Spinner,
  Button,
} from "native-base";
import PackageTile from "./PackageTile";
import BaseURL from "../BaseURL";
export default class ShowPackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      userId: null,
      packageId: null,
      amount: null
    }
  }

  parentSetState = obj => this.setState(obj);

  refreshIcon = () => {
    if (!this.state.refreshing) {
      return (
        <Icon
          name="refresh"
          onPress={() => {
            this.props.fetchPackages();
            this.setState({
              refreshing: true,
              transaction: false,
              buying: false
            });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 2000);
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
            onPress={() => this.props.navigation.openDrawer()}
          />
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>Recharge</Text>
        </Body>
        <Right>{this.refreshIcon()}</Right>
      </Header>
    );
  };

  makeTiles = data => {
    return data.map((item, index) => (
      <PackageTile
        data={item}
        key={index}
        parentSetState={this.parentSetState}
        userid={this.props.user.id}
      />
    ));
  };

  _onNavigationStateChange(webViewState){
    if(webViewState.url == "http://laundrybay.in/close") {
      this.setState({
        transaction: "completed",
        userId: null,
        packageId: null,
        amount: null,
        buying: false
      })
    }
    else if(webViewState.url == "http://laundrybay.in/failed") {
      this.setState({
        transaction: "failed",
        userId: null,
        packageId: null,
        amount: null,
        buying: false
      })
    }
    else if(webViewState.url == "http://laundrybay.in/cancel") {
      this.setState({
        transaction: false,
        userId: null,
        packageId: null,
        amount: null,
        buying: false
      })
    }
    console.log(webViewState.url)
  }

  render() {
    const { height } = Dimensions.get("window");
    const { data, length } = this.props;
    const { userId, packageId, amount } = this.state;

    if(this.state.buying) {
      if(!userId || !packageId || !amount) {
        alert("error");
        console.log(userId, packageId, amount)
        return null;
      }
      return (
        <WebView
          // source={{ uri: `http://google.com` }}
          source={{uri: `${BaseURL}/account/buy?userid=${userId}&packageid=${packageId}&amount=${amount}`}}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        />
      );
    } else if (this.state.transaction == "completed") {
      return (
        <Container>
          {this.makeHeader()}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons name="ios-cloud-done" size={50} color="green" />
            <Text style={{ fontStyle: "italic", fontSize: 17 }}>
              Transaction completed
            </Text>
            <Text style={{ fontSize: 15, padding: 10 }}>
              Receipt in "Purchase History".
            </Text>
            <Text style={{ fontSize: 15, padding: 10 }}>
              Report shortly by Email or SMS
            </Text>
          </View>
        </Container>
      );
    } else if (this.state.transaction == "failed") {
      return (
        <Container>
          {this.makeHeader()}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons name="ios-close-circle-outline" size={50} color="red" />
            <Text style={{ fontStyle: "italic", fontSize: 17, color: "red" }}>
              Server Error Occurred
            </Text>
            <Text style={{ fontSize: 15 }}>
              We'll report you shortly by Email or SMS
            </Text>
          </View>
        </Container>
      );
    } else if (data.length) {
      return (
        <Container>
          {this.makeHeader()}
          <ImageBackground
            source={require("../../assets/bg.png")}
            style={{
              flex: 1,
              width: "100%",
              height: "100%"
              // resizeMode: "cover"
            }}
          >
            <ScrollView
              style={{ flex: 1, padding: 10 }}
            >
              {this.makeTiles(data)}
            </ScrollView>
          </ImageBackground>
        </Container>
      );
    } else {
      return (
        <Container>
          {this.makeHeader()}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Spinner />
            <Text style={{ fontStyle: "italic", fontSize: 17 }}>
              fetching packages from server
            </Text>
          </View>
        </Container>
      );
    }
  }
}
