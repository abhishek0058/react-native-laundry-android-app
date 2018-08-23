import React, { Component } from "react";
import { View, ScrollView } from 'react-native';
import { Separator, Spinner, Text } from 'native-base'
import { getFromAsync, putInAsync } from "../AsyncService";
import  { getData } from '../FetchService';
import Helper from "./Helper";

class Panel extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    user: false,
    loading: true,
    email_button_lable: false,
  };

  synchUser = async () => {
    try {
      const user = await getFromAsync("user");
      //console.log("Verify -> Panel -> user", user);
      if (user) {
        const result = await getData(`user/single/${user.id}`)
        await putInAsync("user", result.result[0])
        this.setState({ user: result.result[0], loading: false });
        this.getButtonLabel()
      } else {
        alert('No Storage')
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    this.synchUser()  
  }

  async componentDidUpdate(oldProps) {
    if(oldProps.refresh != this.props.refresh) {
      this.synchUser()
    }
  }

  getButtonLabel = async () => {
    try {
      const result = await getFromAsync('email_link_already_sent');
      if(result) 
        this.setState({ 'email_button_lable': 'Resend New Link' })
      else 
        this.setState({ 'email_button_lable': 'Send Link' })
    } catch (e) {
      console.log(e)
    }
  }

  getStatus = value => (value == "true" ? "Verified" : false);

  render() {
    const { loading, user } = this.state;

    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            margin: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Spinner color="green" />
          <Text>Loading user Data</Text>
        </View>
      );
    }
    else if (user && !loading) {
      return (
        <ScrollView style={{ flex: 1, margin: 10, backgroundColor: 'white' }}>
          <View style={{ height: 200, margin: 5, borderRadius: 5, borderWidth: 1, borderColor: '#A3AFA9' }}>
            <Helper
              icon="at"
              ButtonLabel={this.state.email_button_lable}
              URL={`user/sendVerificationLink/${user.id}`}
              status={this.getStatus(user.email_verified)}
              inputValue={user.email}
              title="Email Address"
            />
          </View>
          <View style={{ height: 200, margin: 5, borderRadius: 5, borderWidth: 1, borderColor: '#A3AFA9' }}>
            <Helper
              icon="call"
              ButtonLabel="Resend OTP"
              URL={``}
              status={this.getStatus(user.mobile_verified)}
              inputValue={user.mobile}
              title="Mobile Number"
            />
          </View>
          <View style={{ height: 100, margin: 5, borderRadius: 5, justifyContent: 'center' }}>
            <Text style={{ fontSize: 17, fontStyle: 'italic'}}>
                *You can anytime change you email-address and mobile by going to the Profile
                and again you can verify them here.
            </Text>
          </View>
        </ScrollView>
      );
    }
    else {
      return (
        <View style={{ flex: 1, margin: 10 }}>
          <Text>Error</Text>
        </View>
      );
    }
  }


}
export default Panel;
