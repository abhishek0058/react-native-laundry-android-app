import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, Alert, Dimensions, ScrollView, ImageBackground } from "react-native";
import {
  Container,
  Header,
  View,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Right,
  Spinner,
  Button
} from "native-base";
import PackageTile from "./PackageTile";

export default class ShowPackages extends Component {
  state = {
    refreshing: false
  };

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

  render() {
    const { height } = Dimensions.get("window");
    const { data, length } = this.props;
    console.log(data);
    if (this.state.transaction == "completed") {
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
    } else if (this.state.buying) {
      return (
        <Container>
          {this.makeHeader()}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons name="ios-cloud-upload-outline" size={50} color="green" />
            <Spinner color="blue" />
            <Text style={{ fontStyle: "italic", fontSize: 17 }}>
              Buying Package of {"\u20B9"} {data.amount} for {data.cycles}{" "}
              cycles
            </Text>
            <Text style={{ fontSize: 15 }}>Please Wait</Text>
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
