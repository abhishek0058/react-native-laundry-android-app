import React, { Component } from "react";
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import BaseURL from "../BaseURL";

export default class PurchaseList extends Component {

  makeListItem = data => {
    return data.map(item => (
      <ListItem avatar key={item.id} style={{ margin: 5 }}>
        <Left>
          <Thumbnail source={{ uri: `${BaseURL}/images/${item.logo}` }} />
        </Left>
        <Body>
          <Text>{item.name}</Text>
          <Text note>{item.date.substring(0, item.date.indexOf("T"))}</Text>
        </Body>
        <Right>
          <Text style={{ fontWeight: "bold" }}>
            {"\u20B9" + " " + item.amount}
          </Text>
        </Right>
      </ListItem>
    ));
  };

  render() {
    return (
      <List>
        {this.makeListItem(this.props.data)}
      </List>
    );
  }
}
