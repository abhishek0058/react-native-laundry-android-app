import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getData } from "../FetchService";

class CurrentPackage extends Component {
  state = {
    user: undefined,
    userid: 0
  };

  async componentWillUpdate(nextProps, nextState) {
      if((nextProps.data.userid && !this.state.user) || this.state.userid != nextProps.data.userid ) {
        const { userid } = nextProps.data;
        const result = await getData(`account/cyclesLeft/${userid}`);
        this.setState({ user: result.result[0], userid });
      }
  }

  getCycles = () => {
    return (this.state.user ? this.state.user.cycles_left : 0);
  };

  getPackage = () => {
    return (this.state.user ? this.state.user.package : ``);
  };

  render() {
    const { userid } = this.props.data;
    if (!userid) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            No Current Package Found
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            margin: 5,
            borderRadius: 10,
            borderWidth: 0.5,
            shadowOpacity: 2,
            shadowColor: "grey",
            borderColor: "grey"
          }}
        >
          <View
            style={{
              flex: 1
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
                borderBottomColor: "grey",
                borderBottomWidth: 0.3,
                borderRadius: 5
              }}
            >
              Current Package and Cycles Left
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              padding: 5,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <Text style={{ fontSize: 17, textAlign: "center" }}>
                {this.getPackage()}
              </Text>
              <Text style={{ fontSize: 22, textAlign: "center" }}>
                {this.getCycles(userid)}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}
export default CurrentPackage;
