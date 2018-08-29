import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Spinner, Icon } from "native-base";
import { removeFromAsync } from "./AsyncService";
import NavigationService from "./NavigationService";

class Logout extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="log-out" style={{ color: "red" }} />
  };

  async componentDidMount() {
    try {
      await removeFromAsync("user");
      NavigationService.top();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    console.log();
    return (
      <View style={styles.container}>
        <Text>Logging you out ...</Text>
        <Spinner color="green" />
      </View>
    );
  }
}
export default Logout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
