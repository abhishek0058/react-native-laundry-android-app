import React, { Component } from "react";
import { ImageBackground } from "react-native";
import { createStackNavigator } from "react-navigation";
import { Text, Icon, Header, Left, Body, Right, View, Spinner } from "native-base";
import Panel from "./Panel";

const Nav = createStackNavigator({
  Panel: Panel
});

class Verify extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="git-compare" style={{ color: "blue" }} />
  };

  state = {
    refresh: true,
    refreshing: false
  };
  
  refreshIcon = () => {
    if (!this.state.refreshing) {
      return (
        <Icon
          name="refresh"
          onPress={() => {
            this.setState({ refresh: !this.state.refresh, refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
            }, 2000);
          }}
        />
      );
    } else {
      return(
        <Spinner color="blue" />
      )
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
          <Text
            style={{ fontWeight: "bold", fontSize: 18, fontStyle: "italic" }}
          >
            Verification Panel
          </Text>
        </Body>
        <Right>{this.refreshIcon()}</Right>
      </Header>
    );
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
          {this.makeHeader()}
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Panel refresh={this.state.refresh} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Verify;
