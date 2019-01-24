import React, { Component } from "react";
import { Image, Alert } from "react-native";
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
import { AndroidBackHandler } from "react-navigation-backhandler";

export default class VerifyOtp extends Component {
  static navigationOptions = {
    title: "Verification",
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      msg: "",
      loading: false,
      secondsLeft: 60,
      allowSendingOTP: false,
      helplineText: null
    };
  }

  componentWillMount() {
    const intervalRef = setInterval(() => {
      const { secondsLeft } = this.state;
      if (secondsLeft == 0) {
        clearInterval(intervalRef);
        this.setState({ allowSendingOTP: true });
      } else {
        this.setState({ secondsLeft: secondsLeft - 1 });
      }
    }, 1000);
    this.setState({ intervalRef })
  }

  componentDidUpdate() {
    if (this.state.goBackTrue) {
      this.props.navigation.pop()
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalRef);
  }

  _showResendOTPButton = () => {
    const { allowSendingOTP, secondsLeft, helplineText } = this.state;
    if (helplineText) {
      return (
        <Text
          style={{
            alignSelf: "center",
            color: "blue",
            fontWeight: "500",
            fontSize: 16
          }}
        >
          {helplineText}
        </Text>
      );
    } else if (allowSendingOTP) {
      return (
        <Button
          info
          style={{ alignSelf: "center" }}
          onPress={() => this._handleResendOTP()}
        >
          <Text style={{ color: "blue" }}>Resend OTP</Text>
        </Button>
      );
    } else {
      return (
        <Text
          style={{
            alignSelf: "center",
            color: "blue",
            fontWeight: "500",
            fontSize: 16
          }}
        >
          Resend OTP in {secondsLeft} seconds
        </Text>
      );
    }
  };

  _handleResendOTP = async () => {
    try {
      const mobile = this.props.navigation.getParam("mobile");
      alert(`Sending OTP on ${mobile}`);
      const result = await postData("user/resendOTP", { mobile });
      if (result.result) {
        this.setState({
          helplineText:
            "If you facing problem getting OTP then please call our helpline number and get verified without any OTP. It's fast and free."
        });
      } else {
      }
    } catch (e) {
      console.log("error in resend OTP");
      alert("Error Occurred");
    }
  };

  render() {
    const { msg, loading } = this.state;
    return (
      <AndroidBackHandler
        onBackPress={() => {
          Alert.alert(
            "Verify Mobile Number",
            "If you go back then you may have to fill the registration form again",
            [
              { text: "Stay", onPress: () => console.log("nothing") },
              {
                text: "Go Back",
                onPress: () => this.setState({ goBackTrue: true })
              }
            ],
            { cancelable: false }
          );
          return true;
        }}
      >
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
            <Form>
              <Item floatingLabel>
                <Label>Enter OTP</Label>
                <Input
                  onChangeText={otp => this.setState({ otp })}
                  keyboardType="numeric"
                />
              </Item>
            </Form>
            {!loading ? (
              <Button
                icon
                primary
                style={{
                  marginVertical: 20,
                  marginHorizontal: 10
                }}
                onPress={() => this.checkAndSend()}
              >
                <Text>Verify OTP</Text>
              </Button>
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
            {this._showResendOTPButton()}
          </Content>
        </Container>
      </AndroidBackHandler>
    );
  }

  checkAndSend = async () => {
    try {
      this.setState({ loading: true });
      const { otp } = this.state;
      const mobile = this.props.navigation.getParam("mobile");

      if (mobile && otp.length == 6) {
        const result = await postData("user/verify_otp", { mobile, otp });
        if (result.result) {
          // alert("Mobile confirmed, Please Login again");
          this.props.navigation.replace("login", {
            email: mobile,
            password: result.data.password
          });
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
}
