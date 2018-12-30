import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import BaseURL from "../BaseURL";
class Helper extends Component {
  imageMaker = () => {
    if (this.props.image) {
      // console.log(
      //   "Instructions -> Helper",
      //   `${BaseURL}/app/${this.props.image}`
      // );
      return (
        <Image
          style={{
            height: 200,
            width: 300,
            resizeMode: "contain",
            alignSelf: "center",
            marginTop: 10,
            borderRadius: 5
          }}
          source={{ uri: `${BaseURL}/app/${this.props.image}` }}
        />
      );
    }
  };

  render() {
    //console.log('Instructions -> Helper', this.props)
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 20,
          // backgroundColor: "white",
          borderTopWidth: 0.25,
          borderBottomColor: "black",
          borderTopColor: "black"
        }}
      >
        <Text
          style={{
            fontSize: 22,
            alignSelf: 'flex-start',
            fontWeight: "bold",
            padding: 10,
            borderRadius: 2,
            borderWidth: 0.5,
            borderColor: "grey"
          }}
        >
          {this.props.index}
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {this.props.text}
        </Text>
        {this.imageMaker()}
      </View>
    );
  }
}
export default Helper;
