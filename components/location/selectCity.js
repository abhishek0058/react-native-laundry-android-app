import React, { Component } from "react";
import { View, Text } from "react-native";
import { getData } from "../FetchService";
import { List, ListItem, Left, Right, Icon, Spinner, Container, Content } from "native-base";

class SelectCity extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            data: []
        };
    }

    async componentDidMount() {
        try {
            let data = [];
            const response = await getData(`city/all`);
            if (response && response.result) {
                data = response.result;
            }
            this.setState({ ready: true, data });
        } catch (e) {
            console.log("Brand: " + e);
        }
    }

    makeList = () => {
        return this.state.data.map((item, index) => {
            return (
                <ListItem
                    key={index}
                    onPress={() => {
                            const email = this.props.navigation.state.params.email;
                            const password = this.props.navigation.state.params.password;
                            this.props.navigation.navigate("selectHostel",{ 
                                cityid: item.id, email, password 
                            })
                        }
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

    render() {
        if (this.state.ready) {
            return (
                <Container>
                    <Content>
                        <List>
                            <ListItem itemDivider>
                                <Text style={{ fontSize: 20 }}>
                                    Select City
                                </Text>
                            </ListItem>
                            {this.makeList()}
                        </List>
                    </Content>
                </Container>
            );
        }
        else {
            return (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Spinner />
                    <Text>Loading ...</Text>
                </View>
            );
        }
    }
}
export default SelectCity;
