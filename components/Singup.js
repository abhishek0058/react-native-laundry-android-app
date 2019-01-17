import React, { Component } from "react";
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Spinner,
  KeyboardAvoidingView
} from "native-base";
import { View, Image, Alert } from "react-native";
// const logo = require("../assets/logo.png");

export default class Signup extends Component {

  static navigationOptions = {
    title: "Sign-Up"
  };

  state = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    loading: false,
    realPassword: ""
  };

  validateEmail = (email) =>  {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result =  re.test(email);
    console.log(result)
    return result;
  }
  
  register = () => {
    const { name, email, mobile, password } = this.state;
    console.log(this.state)
    if(this.validateEmail(email) && name.length && email.length && mobile.length == 10 && password.length >= 8) {
        this.register2()
    } else {
        if(password.length < 8)
            Alert.alert(
                'Fill All Fields',
                'Password must be 8 digit long',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
            )
        else if(mobile.length != 10) {
          Alert.alert(
              'Fill All Fields correctly',
              'Mobile number should be 10-digit long',
              [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: true }
          )
        }
        else 
            Alert.alert(
                'Fill All Fields',
                'Do not Leave any field empty',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: true }
            )
    }
  };

  register2 = async () => {
    this.setState({ loading: true });
    const { name, email, mobile, password } = this.state;
    try {
      const response = await fetch(`${BaseURL}/user/new`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ name, email, mobile, password })
      });
      const result = await response.json();
      this.setState({ loading: false });
      console.log("Signup result", result);
      if (result.result) {
        this.props.navigation.push("verify", { mobile });
      }
      else {
        alert(result.message)
      }
    } catch (e) {
      console.log("Add User ERROR", e);
      alert("server is unreachable")
    }
  };

  signupButton = () => {
    if (this.state.loading) {
      return <Spinner style={{ marginVertical: 50, alignSelf: "center" }} />;
    } else {
      return (
        <Button
          icon
          success
          style={{
            alignSelf: "center",
            marginTop: 20
          }}
          onPress={() => this.register()}
        >
          <Icon name="person-add" />
          <Text>Signup</Text>
        </Button>
      );
    }
  };


  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{
            flex: 1,
            marginHorizontal: 30,
            marginTop: 20
          }}
        >
          <Item style={{ margin: 10 }}>
            <Icon active name="person" />
            <Input
              placeholder="Full Name"
              onChangeText={name => this.setState({ name })}
            />
          </Item>
          <Item style={{ margin: 10 }}>
            <Icon active name="phone-portrait" />
            <Input
              placeholder="Mobile Number"
              keyboardType="numeric"
              onChangeText={mobile => this.setState({ mobile })}
            />
          </Item>
          <Item style={{ margin: 10 }}>
            <Icon active name="at" />
            <Input
              placeholder="Email Address"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item style={{ margin: 10 }}>
            <Icon active name="key" />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          {this.signupButton()}
        </Content>
        <Image
          style={{ height: 100, width: 200, alignSelf: "center" }}
          source={require("../assets/logo-old.png")}
        />
      </Container>
    );
  }
}
