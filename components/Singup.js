import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Body, Left, Title, Right } from 'native-base';

export default class Signup extends Component {
    
    static navigationOptions = {
        header: null
    }

  render() {
    return (
      <Container>
        <Header>
            <Left />
            <Body>
                <Title>SignUp</Title>
            </Body>
            <Right />
        </Header>
        <Content>
          <Form style={{ alignSelf: 'center' }}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}