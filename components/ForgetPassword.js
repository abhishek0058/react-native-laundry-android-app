import React, { Component } from "react";
import { Image } from "react-native";
import { postData } from "./FetchService";
import {
  Container,
  Spinner,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from "native-base";

export default class ForgetPassword extends Component {
  static navigationOptions = {
    title: "Forget Password"
  };

  state = {
    otp: "",
    msg: "",
    loading: false,
    mobile: "",
    mobileConfirmed: false
  };

  render() {
    const { msg, loading, mobileConfirmed, mobile, otp } = this.state;
    return (
      <Container>
        <Content
          padder
          style={{
            marginHorizontal: 30,
            marginTop: 20
          }}
        >
          <Image
            style={{ height: 100, width: 200, alignSelf: "center" }}
            source={require("../assets/logo-old.png")}
          />

          {mobileConfirmed ? (
            <Form>
              <Item floatingLabel>
                <Label>Enter OTP</Label>
                <Input
                  value={otp}
                  onChangeText={otp => this.setState({ otp })}
                  keyboardType="numeric"
                />
              </Item>
              <Item floatingLabel>
                <Label>New Password</Label>
                <Input
                  onChangeText={password => this.setState({ password })}
                  secureTextEntry={true}
                />
              </Item>
            </Form>
          ) : (
            <Form>
              <Item floatingLabel>
                <Label>Enter Mobile Number</Label>
                <Input
                  onChangeText={mobile => this.setState({ mobile })}
                  keyboardType="numeric"
                />
              </Item>
            </Form>
          )}
          {!loading ? (
            mobileConfirmed ? (
              <Button
                icon
                primary
                style={{
                  marginVertical: 20,
                  marginHorizontal: 10
                }}
                onPress={() => this.submit_password()}
              >
                <Text>Change Password</Text>
              </Button>
            ) : (
              <Button
                icon
                primary
                style={{
                  marginVertical: 20,
                  marginHorizontal: 10
                }}
                onPress={() => this.checkAndSend()}
              >
                <Text>Send Otp</Text>
              </Button>
            )
          ) : (
            <Spinner />
          )}

          <Text
            style={{
              color: "red",
              marginVertical: 10,
              marginHorizontal: 10,
              fontSize: 17,
              fontWeight: "400"
            }}
          >
            {msg}
          </Text>
        </Content>
      </Container>
    );
  }

  submit_password = async () => {
    try {
      this.setState({ loading: true });
      const { otp, password, mobile } = this.state;
      if (password.length < 8) {
        return alert("Password should be 8 character long");
      }
      if (otp.length == 6) {
        const result = await postData("user/change_password", {
          otp,
          password,
          mobile
        });
        if (result.result) {
        //   alert("Password changed, Please Login again");
          this.setState({ loading: false })
          this.props.navigation.replace("login", { email: mobile, password: password });
        } else {
          this.setState({ loading: false, msg: result.message });
        }
      } else {
        this.setState({ msg: "The OTP should be 6 digit long" });
      }
    } catch (e) {
      console.log("error in checkAndSend -> ", e);
      this.setState({ msg: "Server is unreachable" });
    }
  };

  checkAndSend = async () => {
    try {
      this.setState({ loading: true });
      const { mobile } = this.state;
      if (mobile.length != 10) {
        return alert("Mobile Number should be 10-digit long");
      } else {
        const result = await postData("user/forget_password", { mobile });
        if (result.result) {
          this.setState({
            msg: "",
            mobileConfirmed: true,
            loading: false
          });
        } else {
          this.setState({ loading: false, msg: result.message });
        }
      }
    } catch (e) {
      console.log("error in checkAndSend -> ", e);
      this.setState({ msg: "Server is unreachable" });
    }
  };
}
