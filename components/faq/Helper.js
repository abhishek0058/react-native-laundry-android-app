import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Helper extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          margin: 10,
          marginBottom: 10,
          borderColor: 'black',
          borderWidth: 1,
          padding: 5
        }}
      >
        <Text
          style={{
            textAlign: "center",
            padding: 5,
            alignSelf: "flex-start",
            borderWidth: 1,
            borderColor: "grey",
            marginBottom: 5,
            fontSize: 18,
            borderRadius: 5
          }}
        >
          Question: {this.props.index}
        </Text>
        <Text
          style={{
            fontSize: 18,
            borderRadius: 5,
            borderWidth: 0,
            borderColor: "grey",
            marginBottom: 5,
            padding: 5
          }}
        >
          {this.props.question}
        </Text>
        <Text
          style={{
            fontSize: 15,
            borderRadius: 5,
            borderWidth: 0,
            borderColor: "grey",
            marginTop: 5,
            padding: 5,
            fontStyle: 'italic'
          }}
        >
          {this.props.answer}
        </Text>
      </View>
    );
  }
}
export default Helper;
