import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Body, Title, Left, Right, Icon } from 'native-base';

export default class Home extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Text style={{ flex: 1, alignSelf: 'center', justifyContent: 'cenetr' }}>
                        Home Screen
                    </Text>
                    <Button onPress={() => this.props.navigation.navigate('signup')}>SignUP</Button>
                </Content>
            </Container>
        )
    }
}