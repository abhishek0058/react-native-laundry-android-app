import React, { Component } from "react";
import { View, Text, Spinner, Content, Card, CardItem, Icon } from "native-base";
import { getFromAsync } from "../AsyncService";
import { getData } from '../FetchService';
import MachineHelper from './MachineHelper';

class ShowMachines extends Component {
  
  state = {
    data: [],
    user: {}
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    const user = await getFromAsync("user");
    await this.setState({ user });
    const machines = await getData(`machine/ByCityAndHostel/${user.cityid}/${user.hostelid}`)
    this.setState({ data: machines.result })
  }

  showMachinesCards = () => {
      return this.state.data.map(machine => (<MachineHelper key={machine.id} machine={machine} />))
  }

  render() {
    const { data } = this.state;

    if (data.length) {
      return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 20 }}>
                <Card>
                    <CardItem>
                      <Icon name="home" style={{ color: "orange" }} />
                        <Text style={{ marginLeft: 15, fontSize: 16, fontStyle: 'italic' }}> 
                          {`${data[0].hostelname}, ${data[0].cityname}`}
                        </Text>
                    </CardItem>
                </Card>
            </View> 
            <View style={{ flex: 10 }}>
                <Content>
                    {this.showMachinesCards()}
                </Content>
            </View>
        </View>
      );
    }
    else if(data.length == 0) {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontStyle: "italic", fontWeight: "bold" }}>
                    No machines found.
                </Text>
            </View>
        );
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <Spinner color="green" />
          <Text style={{ fontSize: 16, fontStyle: "italic", fontWeight: "bold" }}>
            fetching machines for you{" "}
          </Text>
        </View>
      );
    }
  }
}
export default ShowMachines;
