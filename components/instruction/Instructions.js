import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Text, Icon, Header, Left, Right, Body } from "native-base";
import Helper from "./Helper";
import { data } from './data'

class Instructions extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="list-box" style={{ color: "blue" }} />
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Instructions</Text>
        </Body>
        <Right />
      </Header>
    );
  };

  makeHelpers = () => {
    return data.map((item, index) => {
        return (
            <Helper
                text={item.text}
                image={item.image}
                key={index}
                index={index+1}
            />
        )
    }) 
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.makeHeader()}
        <ScrollView style={{ flex: 1 }}>
            {this.makeHelpers()}
        </ScrollView>
      </View>
    );
  }
}
export default Instructions;
