import React, { Component } from "react";
import { AsyncStorage, View } from "react-native";
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
  Icon
} from "native-base";
import BaseURL from "./BaseURL";

export default class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    username: "",
    password: "",
    loading: false,
    ready: false
  };

  checkPreviousLogin = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        this.props.navigation.replace("home", { userid: (JSON.parse(user)).id });
      } else {
        this.setState({ ready: true });
      }
    } catch (e) {
      console.log("Login", e);
    }
  };

  async componentWillMount() {
    //await AsyncStorage.removeItem('user')
    this.checkPreviousLogin();
  }

  async login() {
    this.setState({ loading: true });
    const { username, password } = this.state;
    try {
      const response = await fetch(`${BaseURL}/user/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json();
      this.setState({ loading: false });
      //console.log('Login result', JSON.stringify(result[0]))

      if (result.length) {
        await AsyncStorage.setItem("user", JSON.stringify(result[0]));
        this.props.navigation.replace("home");
      } else {
        alert("Invalid Username/Password");
      }
    } catch (e) {
      console.log("Check LOGIN ERROR", e);
    }
  }

  loginButton = () => {
    if (this.state.loading) {
      return <Spinner style={{ marginVertical: 50, alignSelf: "center" }} />;
    } else {
      return (
        <Button
          iconLeft
          success
          onPress={() => this.login()}
          style={{ marginVertical: 50, alignSelf: "center" }}
        >
          <Icon name="key" />
          <Text>Login</Text>
        </Button>
      );
    }
  };

  render() {
    if (this.state.ready) {
      return (
        <Container>
          <Content padder>
            <Form
              style={{
                marginVertical: 20
              }}
            >
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={username => this.setState({ username })} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input onChangeText={password => this.setState({ password })} />
              </Item>
            </Form>

            {this.loginButton()}

            <Text style={{ alignSelf: "center", fontSize: 20 }}>OR</Text>

            <Button
              iconLeft
              Info
              onPress={() => this.props.navigation.navigate("signup")}
              style={{ marginVertical: 50, alignSelf: "center" }}
            >
              <Icon name="person-add" />
              <Text>Signup</Text>
            </Button>
          </Content>
        </Container>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner color="green" />
          <Text
            style={{ fontSize: 17, fontWeight: "bold", fontStyle: "italic" }}
          >
            Loading ...
          </Text>
        </View>
      );
    }
  }
}
