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
      <ListItem avatar key={item.id}>
        <Left>
          <Thumbnail source={{ uri: `${BaseURL}/images/${item.logo}` }} />
        </Left>
        <Body>
          <Text style={{ fontSize: 19}}>{item.name}</Text>
          <Text>{"\u20B9" + " " + item.amount}</Text>
        </Body>
        <Right>
          <Text>
            {item.date.substring(0, item.date.indexOf("T"))}
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
