import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Body, Title, Left, Right, Icon } from 'native-base';

export default class Home extends Component {
    
    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <Container padded>
                <Content contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>
                        Home Screen
                    </Text>
                    <Button 
                        style={{ alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('signup')}
                    >
                        <Text>SignUP</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}