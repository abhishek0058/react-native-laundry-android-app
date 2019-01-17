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
  Text,
} from "native-base";


export default class VerifyOtp extends Component {
  static navigationOptions = {
    title: "Verification"
  };

  state = {
    otp: "",
    msg: "",
    loading: false
  };

  render() {
    const { msg, loading } = this.state;
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
          <Form>
            <Item floatingLabel>
              <Label>Enter OTP</Label>
              <Input onChangeText={otp => this.setState({ otp })} keyboardType="numeric" />
            </Item>
          </Form>
          {
            !loading ? 
            (
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
            ) : 
            (<Spinner />)
          }
          

          <Text style={{ color: 'red', marginVertical: 10, marginHorizontal: 10, fontSize: 17, fontWeight: '400' }}> {msg} </Text>
        </Content>
      </Container>
    );
  }

  checkAndSend = async () => {
    try {
      this.setState({ loading: true });
      const { otp } = this.state;
      const mobile = this.props.navigation.getParam('mobile');

      if(mobile && otp.length == 6) {
        const result = await postData('user/verify_otp', { mobile, otp });
        if(result.result) {
          // alert("Mobile confirmed, Please Login again");
          this.props.navigation.replace("login", { email: mobile, password: result.data.password });
        } else {
          this.setState({ loading: false, msg: result.message });
        }
      } else {
        this.setState({ msg: "The OTP should be 6 digit long" });
      }
    }
    catch(e) {
      console.log("error in checkAndSend -> ", e);
      this.setState({ msg: "Server is unreachable" })
    }
  }
}
