import React, { Component } from "react";
import { View, Text } from "react-native";
import { getData, postData } from "../FetchService";
import ConfirmLocation from "../PopUp/ConfirmLocation";
import Loading from "../PopUp/Loading";
import { List, ListItem, Left, Right, Icon, Spinner, Container, Content } from "native-base";

class SelectHostel extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      data: [],
      showPopUp: false,
      hostelId: null,
      loading: false
    };
  }

  async componentDidMount() {
    try {
      let data = [];
      const cityid = this.props.navigation.state.params.cityid;
      const response = await getData(`hostel/by-city/${cityid}`);
      console.log('response', response);
      if (response && response.result) {
        data = response.result;
      }
      this.setState({ ready: true, data });
    } catch (e) {
      console.log("Select Hostel: " + e);
    }
  }

  makeList = () => {
    return this.state.data.map((item, index) => {
      return (
        <ListItem
          key={index}
          onPress={() => {
            this.setState({ showPopUp: true, hostelId: item.id })
          }
            // this.props.navigation.navigate("model", { brandid: item.id })
          }
        >
          <Left>
            <Text style={{ fontSize: 20 }}>
                {item.name}
            </Text>
          </Left>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    });
  };

  _handleSetLocation = async () => {
    const { hostelId } = this.state;
    const cityid = this.props.navigation.state.params.cityid;
    const email = this.props.navigation.state.params.email;
    const password = this.props.navigation.state.params.password;
    // show loading 
    this.setState({ showPopUp: false, loading: true });
    // set Location here
    const response = await postData('user/update-location-add-free-cycle', {
      email,
      password,
      hostelid: hostelId,
      cityid: cityid
    });
    this.setState({ loading: false });
    // Check if correctly set, if yes then redirect to machine page
    if(response.result) {
      this.props.navigation.replace("login", { email, password });
    }
    else {
      const { message } = response.result;
      alert(message);
    }
  }

  render() {
    const { showPopUp, loading } = this.state;
    if (this.state.ready) {
      return (
        <Container>
          <Content>
            <ConfirmLocation
             show={showPopUp} 
             hide={() => this.setState({ showPopUp: false })} 
             onPressOk={() => this._handleSetLocation()} 
             title="Confirm Location"
            />
            <Loading 
              show={loading} 
              hide={() => this.setState({ loading: false })}
              text="Saving location"
            />
            <List>
              <ListItem itemDivider>
                <Text>Choose Hostel</Text>
              </ListItem>
              {this.makeList()}
            </List>
          </Content>
        </Container>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner />
          <Text style={{ fontSize: 20 }}>Loading ...</Text>
        </View>
      );
    }
  }
}
export default SelectHostel;
