import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Body, Title, Left, Right, Icon } from 'native-base';
import BaseURL from './BaseURL';

export default class Login extends Component {
    
    static navigationOptions = {
        header: null
    }

    state = {
        username: '',
        password: '',
    }

    checkPreviousLogin = async () =>  {
        try {
            const user = await AsyncStorage.getItem('user');
            if(user) {
                console.log('ALready Login', user)
                this.props.navigation.navigate('home')
            }
        } catch (e) {
            console.log(e)
        }
    }

    componentWillMount() {
        this.checkPreviousLogin()
    }

    async login() {
        const { username, password } = this.state;
        try {
            const response = await fetch(`${BaseURL}/admin/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify({ username, password })
            });
            const result = await response.json()
            console.log('Login result', result)
            if(result.length) {
                await AsyncStorage.setItem('user', JSON.stringify(result[0]));
            } else {
                alert('Invalid Username/Password');
            }
        } catch (e) {
            console.log('Check LOGIN ERROR', e)
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>LogIn</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content padder>
                    <Form style={{
                        marginVertical: 20
                    }}>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={ username => this.setState({ username }) } />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input onChangeText={ password => this.setState({ password }) } />
                        </Item>
                    </Form>

                    <Button iconLeft success
                        onPress={() => this.login()}  
                        style={{ marginVertical: 50, alignSelf: 'center' }}
                    >
                        <Icon name='key' />
                        <Text>Login</Text>
                    </Button>

                    <Text style={{ alignSelf: 'center', fontSize: 20 }}>OR</Text>

                    <Button iconLeft Info
                        onPress={() => this.props.navigation.navigate('signup')}  
                        style={{ marginVertical: 50, alignSelf: 'center' }}
                    >
                        <Icon name='person-add' />
                        <Text>Signup</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}