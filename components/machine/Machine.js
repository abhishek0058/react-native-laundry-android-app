import React, { Component } from "react";
import { Container, Header, Left, Right, Body, Text, Icon, Content, View, Button } from "native-base";
import { createStackNavigator } from "react-navigation";
import ShowMachines from "./ShowMachines";
import { getData } from '../FetchService'; 

const StackNav = createStackNavigator({
  ShowMachines: ShowMachines
});

export default class Machine extends Component {
  static navigationOptions = {
    drawerIcon: () => <Icon name="build" style={{ color: "blue" }} />
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
          <Text>MACHINE</Text>
        </Body>
        <Right />
      </Header>
    );
  };

  start = async () => {
    try{ 
        const result = await getData('test/on');
        alert(JSON.stringify(result))
    } catch(e) {
        alert('Error')
        console.log(e)
    }
  }

  stop = async () => {
    try{ 
        const result = await getData('test/off');
        alert(JSON.stringify(result))
    } catch(e) {
        alert('Error')
        console.log(e)
    }
  }

  render() {
      if(false) {
          return (
            <Container>
              {this.makeHeader()}
              <View style={{ flex: 1}}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                      <Button success style={{ alignSelf: 'center'}} onPress={() => this.start()}>
                          <Text>ON</Text>
                      </Button>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Button danger style={{ alignSelf: 'center'}}  onPress={() => this.stop()}>
                      <Text>OFF</Text>
                  </Button>
                  </View>
              </View>
            </Container>
          );
      }
      else {
        return (
            <Container>
              {this.makeHeader()}
                  <StackNav />
            </Container>
          );
      }
  }
}

/*

return (
      <Container>
        {this.makeHeader()}
        <View>
          <StackNav />
        </View>
      </Container>
    );
    
*/