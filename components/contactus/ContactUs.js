import React, { Component } from "react";
import { View, ScrollView, ImageBackground } from "react-native";
import { Text, Icon, Header, Left, Right, Body } from "native-base";
import {  Container,  Content,  Item,  Input,  Button,  Spinner,  KeyboardAvoidingView } from "native-base";
import { postData } from "../FetchService";
import PopError from "../PopUp/PopError";

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: '',
            city: '',
            message: '',
            address: '',
            loading: false,
            error: '',
            showError: false
        }
    }

  static navigationOptions = {
    drawerIcon: () => <Icon name="chatboxes" style={{ color: "blue" }} />
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Contact us</Text>
        </Body>
        <Right />
      </Header>
    );
  };

  _handleSubmit = async () => {
    const { name, email, mobile, city, message, address } = this.state;
    this.setState({ loading: true });
    try {
      if(name.length == 0) {
        this.setState({ showError: true, error: 'Name cannot be empty', successMessage: '' });
      }
      else if(mobile.length != 10) {
        this.setState({ showError: true, error: "Mobile number must be 10-digit long", successMessage: '' });
      }
      else if(message.length == 0) {
        this.setState({ showError: true, error: "Message cannot be empty", successMessage: '' });
      }
      else if(address.length == 0) {
        this.setState({ showError: true, error: "Address cannot be empty", successMessage: '' })
      }
      else if(email.length == 0) {
        this.setState({ showError: true, error: "Email cannot be empty", successMessage: '' })
      }
      else if(city.length == 0) {
        this.setState({ showError: true, error: "City cannot be empty", successMessage: '' })
      }
      else {
        const body = {
          name, email, address, city, mobile, message
        }
        const result = await postData("queries", body);
        if(result.result == "Sorry, please try again later") {
          this.setState({ error: result.result, showError: true });
        }
        else {
          this.setState({ 
            showError: false, successMessage: 'You response submitted successfully', 
            error: '', name: '', email: '', address: '', city: '', message: '',mobile: ''
          });
        }
      }
      this.setState({ loading: false });
    } 
    catch(e) {
      console.log('error', e);
      alert('Cannot reach to server right now');
    }   
  }

  render() {
    const { name, email, mobile, city, message, address, error, loading, showError, successMessage } = this.state;
    return (
        <View style={{ flex: 1 }}>
            {this.makeHeader()}
          <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
              <Content
                contentContainerStyle={{
                  flex: 1,
                  marginHorizontal: 30,
                }}
              >
                <Item style={{ marginHorizontal: 10 }}>
                  <Icon active name="person" />
                  <Input
                    value={name}
                    placeholder="Name"
                    onChangeText={name => this.setState({ name })}
                  />
                </Item>
                <Item style={{ marginHorizontal: 10 }}>
                  <Icon active name="phone-portrait" />
                  <Input
                  value={mobile}
                    placeholder="Mobile Number"
                    keyboardType="numeric"
                    onChangeText={mobile => this.setState({ mobile })}
                  />
                </Item>
                <Item style={{ marginHorizontal: 10 }}>
                  <Icon active name="at" />
                  <Input
                    value={email}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    onChangeText={email => this.setState({ email })}
                  />
                </Item>
                <Item style={{ marginHorizontal: 10 }}>
                  <Icon active name="home" />
                  <Input
                    value={address}
                    placeholder="Address"
                    onChangeText={address => this.setState({ address })}
                  />
                </Item>
                <Item style={{ marginHorizontal: 10 }}>
                  <Icon active name="home" />
                  <Input
                    value={city}
                    placeholder="City"
                    onChangeText={city => this.setState({ city })}
                  />
                </Item>
                <Item style={{ marginHorizontal: 10 }}>
                  <Icon active name="chatboxes" />
                  <Input
                    value={message}
                    placeholder="Message"
                    onChangeText={message => this.setState({ message })}
                  />
                </Item>
                {
                  !loading ?
                  (<Button primary style={{ alignSelf: 'center', margin: 10 }} onPress={() => this._handleSubmit()}>
                        <Text style={{ fontSize: 20 }}>Submit</Text>
                  </Button>)
                  : <Spinner color="green" />
                }
                <Text style={{ color: 'red', textAlign: 'center', fontSize: 20 }}>{error}</Text>
                
                <Text style={{ color: 'green', textAlign: 'center', fontSize: 20 }}>{successMessage}</Text>
                
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>Our Address</Text>
                
                <Text>DH-15, Opposite Maharaja Complex, Deendayal Nagar, Gwalior (M.P.) 474020</Text>
                
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>Contact</Text>
                <Text>+91 9109271234</Text>
                <Text>+91 9644035102</Text>
              </Content>
            <PopError 
              show={showError}
              hide={() => this.setState({ showError: false })}
              onPressOk={() => this.setState({ showError: false })}
              title={"Oops"}
              message={error}
            />
          </ScrollView>
        </View>
    );
  }
}
export default ContactUs;