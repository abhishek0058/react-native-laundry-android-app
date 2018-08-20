import React, { Component } from "react";
import {
  Separator,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Spinner,
  Button,
  Icon
} from "native-base";
import { View } from "react-native";
import { getData } from '../FetchService';

export default class MachineHelper extends Component {

  state = {
    mode: "on"
  };

  start = async (channel) => {
    try{ 
        const result = await getData(`test/on/${channel}`);
        alert(JSON.stringify(result))
    } catch(e) {
        alert('Error')
        console.log(e)
    }
  }

  stop = async (channel) => {
    try{ 
        const result = await getData(`test/off/${channel}`);
        alert(JSON.stringify(result))
    } catch(e) {
        alert('Error')
        console.log(e)
    }
  }

  makeButton = () => {

    const { machine } = this.props;
    
    let buttonText = "Turn Off";
    if (machine.status == "active") {
      buttonText = "Turn On";
    }

    if(this.state.mode == "on") {
      return (
        <Button success onPress={() => this.start(machine.channel)}>
          <Text>{buttonText}</Text>
        </Button>
      );
    } 
    else {
      return (
        <Button success onPress={() => this.stop(machine.channel)}>
          <Text>{buttonText}</Text>
        </Button>
      );
    }
  }

  

  render() {
    const { machine } = this.props;

    return (
      <Content padder>
        <Card>
          <CardItem header>
            <Text>
              {machine.name}, {machine.hostelname}
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              {this.makeButton()}
            </Body>
          </CardItem>
          <CardItem footer onPress={() => alert(machine.channel)}>
            <Text style={{ color: 'green' }}>{(machine.status).toUpperCase()}</Text>
          </CardItem>
        </Card>
      </Content>
    );
  }
}
