import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, Alert, Dimensions } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Right, Spinner, Button } from 'native-base';
import BaseURL from '../BaseURL';


export default class ShowPackages extends Component {

  state = {
    index: 0
  }

  handleSwipe = () => {
    const { index } = this.state
    const { length } = this.props
    index + 1 >= length 
      ? this.setState({ index: 0 }) 
      : this.setState({ index: index + 1 })
  }

  getAmount = () => (this.props.data[this.state.index].amount)
  getCycles = () => (this.props.data[this.state.index].cycles)
  getId = () => (this.props.data[this.state.index].id)

  confirming = async () => {
    Alert.alert(
      'Confirm?',
      'Are you sure',
      [
        {text: 'No', onPress: () => alert('Canceled'), style: 'cancel'},
        {text: 'YES', onPress: () => this.buyPackage()},
      ],
      { cancelable: true }
    )
  }

  buyPackage = async () => {
    this.setState({ buying: true });
    try {
      const body = {
        userid: this.props.user.id,
        packageid: this.getId(),
        cycles: this.getCycles(),
        amount: this.getAmount()
      }
      const response = await fetch(`${BaseURL}/account/buy`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if(result.result) {
        this.setState({ transaction: 'completed', buying: false });
      } else {
        this.setState({ transaction: 'failed', buying: false });
      }
    } catch(e) {
      console.log(e)
    }
  }

  makeHeader = () => {
    return (
      <Header style={{ backgroundColor: 'white' }}>
          <Left>
              <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
          <Body>
              <Text>PACKAGES</Text>
          </Body>
          <Right />
      </Header>
    );
  }

  render() {
    const { height } = Dimensions.get('window')
    const { data, length } = this.props;

    if(this.state.transaction == "completed") {
      return (
        <Container>
          {this.makeHeader()}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="ios-cloud-done" size={50} color="green" />
            <Text style={{ fontStyle: 'italic', fontSize: 17 }}>
              Transaction completed
            </Text>
            <Text style={{ fontSize: 15, padding: 10 }}>
              Receipt in "Purchase History".
            </Text>
            <Text style={{ fontSize: 15, padding: 10 }}>
              Report shortly by Email or SMS
            </Text>
          </View>
        </Container>
      );
    }
    else if(this.state.transaction == "failed") {
      return (
        <Container>
          {this.makeHeader()}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="ios-close-circle-outline" size={50} color="red" />
            <Text style={{ fontStyle: 'italic', fontSize: 17, color: 'red' }}>
                Server Error Occurred
            </Text>
            <Text style={{ fontSize: 15 }}>
                We'll report you shortly by Email or SMS
            </Text>
          </View>
        </Container>
      );
    }
    else if(this.state.buying) {
      return (
        <Container>
          {this.makeHeader()}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="ios-cloud-upload-outline" size={50} color="green" />
            <Spinner color="blue" />
            <Text style={{ fontStyle: 'italic', fontSize: 17 }}>
              Buying Package of {'\u20B9'} {this.getAmount()} for {this.getCycles()} cycles
            </Text>
            <Text style={{ fontSize: 15 }}>
              Please Wait
            </Text>
          </View>
        </Container>
        
      );
    }
    else if(data.length) { 
      return (
        <Container>
          {this.makeHeader()}
          <View style={{ flex: 9, justifyContent: 'flex-start' }}>
            <DeckSwiper
              dataSource={data}
              onSwipeLeft={this.handleSwipe}
              onSwipeRight={this.handleSwipe}
              renderItem={item =>
                <View onPress={() => alert(item.id)}>
                  <Card style={{ elevation: 3 }}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={{uri: `${BaseURL}/images/${item.logo}` }} />
                        <Body>
                          <Text style={{ fontStyle: 'italic', fontSize: 18}}>{item.name}</Text>
                          <Text note style={{ fontWeight: 'bold'}}>{item.cycles} cycles  {'\u20B9'} {item.amount} </Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                      <Image style={{ flex: 1, height: 350, borderWidth: 1, borderColor: 'black' }} source={{uri: `${BaseURL}/images/${item.logo}` }} />
                    </CardItem>
                    <CardItem>
                      <Text style={{ alignItems: 'center', fontSize: 18 }}>
                        Validity 30 days
                      </Text>
                    </CardItem>
                  </Card>
                </View>
              }
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button full info iconRight onPress={() => this.confirming()}>
              <Text style={{ fontSize: 15 }}>Buy {'\u20B9'} {this.getAmount()}</Text>
            </Button>
          </View>
        </Container>
      );
    } 
    else {
      return (
        <Container>
          {this.makeHeader()}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner />
            <Text style={{ fontStyle: 'italic', fontSize: 17 }}>fetching packages from server</Text>
          </View>
        </Container>
      );
    }
  }
}