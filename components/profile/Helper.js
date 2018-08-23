import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { AsyncStorage } from "react-native";
import {
  Container,
  Spinner,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
  Header,
  Left,
  Body,
  Right
} from "native-base";
import BaseURL from "../BaseURL";

export default class Helper extends Component {
  state = {
    userid: 0,
    label: "",
    value: "",
    icon: "",
    edit: false,
    contentType: "",
    startingValue: "",
    keyboard: "",
    loading: false,
    changedOnce: false
  };

  async componentWillMount() {
    const { userid, label, value, icon, contentType, keyboard } = this.props;
    this.setState({
      userid,
      label,
      value,
      icon,
      contentType,
      startingValue: value,
      keyboard
    });
  }

  toggalView = () => {
    return (
      <Input
        keyboardType={this.state.keyboard}
        value={this.state.value}
        placeholder={this.state.label}
        onChangeText={value => {
          this.setState({ value });
          if (this.state.startingValue == value) this.setState({ edit: false });
          else this.setState({ edit: true });
        }}
        textContentType={this.state.contentType}
      />
    );
  };

  toggalIcon = () => {
    if (this.state.loading) {
      return <Spinner />;
    } else if (this.state.changedOnce && !this.state.edit) {
      return (
        <Icon
          active
          name="done-all"
          style={{ color: "#008000" }}
          onPress={() => alert("Please Change the value")}
        />
      );
    } else if (this.state.edit) {
      return (
        <Icon
          active
          name="checkmark"
          style={{ color: "#008000" }}
          onPress={() => this.changeProfileField()}
        />
      );
    } else {
      return (
        <Icon
          active
          name="create"
          onPress={() => alert("Please Change the value")}
        />
      );
    }
  };

  toggalInputIcon = () => {
    if (this.state.icon.length) {
      return <Icon active name={this.state.icon} />;
    }
  };

  changeProfileField = async () => {
    try {
      this.setState({
        edit: false,
        loading: true
      });
      const response = await fetch(`${BaseURL}/user/edit`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `{ "${this.state.label.toLowerCase()}": "${
          this.state.value
        }", "id": ${this.state.userid}, "${this.state.label.toLowerCase()}_verified": false}`
      });
      const result = await response.json();
      if (result.result) {
        this.props.refreshAsyncStorage(
          JSON.parse(
            `{ "${this.state.label.toLowerCase()}": "${this.state.value}"}`
          )
        );
        this.setState({
          loading: false,
          startingValue: this.state.value,
          changedOnce: true
        });
      } else {
        this.setState({
          loading: false
        });
        alert("Server Error");
      }
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false
      });
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          marginVertical: 5
        }}
      >
        <View style={{ flex: 8 }}>
          <Item style={{ margin: 10 }}>
            {this.toggalInputIcon()}
            {this.toggalView()}
          </Item>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {this.toggalIcon()}
        </View>
      </View>
    );
  }
}
