import React, { Component } from 'react';
import { Container, Content, Item, Input, Icon, Button, Text } from 'native-base';

export default class Signup extends Component {
    
    static navigationOptions = {
        title: 'Sign-Up'
    }

    state = {
        name: '',
        email: '',
        mobile: '',
        password: ''
    }

    register = async () => {
        const { name, email, mobile, password } = this.state;
        try {
            const response = await fetch(`${BaseURL}/user/new`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify({ name, email, mobile, password })
            });
            const result = await response.json()
            console.log('Signup result', result)
            if(result.result) alert('DOne')
        } catch (e) {
            console.log('Add User ERROR', e)
        }
    }

  render() {
    return (
      <Container>
        <Content contentContainerStyle= {{
            flex: 1,
            marginHorizontal: 30,
            marginTop: 40,
        }}>
            <Item style={{ margin: 10 }}>
                <Icon active name='person' />
                <Input placeholder="Full Name" onChangeText={name => this.setState({ name })}/>
            </Item>
            <Item style={{ margin: 10 }}>
                <Icon active name='phone-portrait' />
                <Input placeholder="Mobile Number" keyboardType="numeric" onChangeText={mobile => this.setState({ mobile })}/>
            </Item>
            <Item style={{ margin: 10 }}>
                <Icon active name='at' />
                <Input placeholder="Email Address" keyboardType="email-address" onChangeText={email => this.setState({ email })}/>
            </Item>
            <Item style={{ margin: 10 }}>
                <Icon active name='key' />
                <Input placeholder="Password" onChangeText={password => this.setState({ password })}/>
            </Item>
            <Button 
                icon 
                success
                style={{
                    alignSelf: 'center',
                    marginTop: 20
                }}
                onPress={() => this.register()}
            >
                <Text>Submit</Text>
                <Icon name="person-add" />
            </Button>
        </Content>
      </Container>
    );
  }
}