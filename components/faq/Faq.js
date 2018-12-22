import React, { Component } from "react";
import { View, ScrollView, ImageBackground } from "react-native";
import { Text, Icon, Header, Left, Right, Body } from "native-base";
import Helper from "./Helper";
import { data } from './data'


class Faq extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="information" style={{ color: "blue" }} />
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>FAQ</Text>
        </Body>
        <Right />
      </Header>
    );
  };

  makeHelpers = () => {
    return data.map((item, index) => {
        return (
            <Helper
                question={item.question}
                answer={item.answer}
                key={index}
                index={index+1}
            />
        )
    }) 
  }

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
          <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            {this.makeHelpers()}
          </ScrollView>
        </View>
      </ImageBackground>
        );
  }
}
export default Faq;
