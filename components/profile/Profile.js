import React, { Component } from 'react';
import { View, StatusBar } from 'react-native'
import { AsyncStorage } from 'react-native';
import { Container, Spinner, Content, Form, Item, Input, Label, Button, Text, Icon, Header, Left, Body, Right } from 'native-base';
import Helper from './Helper'

export default class Profile extends Component {

    state = {
        loading: true,
        ready: false,
        user: {}
    };

    checkPreviousLogin = async () =>  {
        try {
            let user = await AsyncStorage.getItem('user');
            if(user) {
                console.log('profile', user)
                this.setState({ ready: true, loading: false, user: JSON.parse(user) })
            } else {
                this.setState({ ready: false, loading: false })
            }
        } catch (e) {
            console.log(e)
        }
    }

    componentWillMount() {
        this.checkPreviousLogin()
    }

    refreshAsncStorage = async (obj) => {
        try {
            let user = { ...this.state.user, ...obj }

            console.log('refreshAsncStorage 1', user)
            await AsyncStorage.setItem('user', JSON.stringify(user))
            user = await AsyncStorage.getItem('user')
            console.log('refreshAsncStorage 2', user)
            this.setState({ user: JSON.parse(user)})
        } catch (e) {
            console.log('refreshAsncStorage 3', e)
        }
    }

    makeHelper = (label, value, icon, contentType, keyboardType = "") => (
        <Helper 
            userid={this.state.user.id} 
            label={label} value={value} 
            icon={icon} 
            contentType={contentType}
            keyboardType={keyboardType}
            refreshAsncStorage={obj => this.refreshAsncStorage(obj)}
        />
    ) 

    render() {

        const { user, ready, loading } = this.state;

        if(loading) {
            return (
                <View style={{ flex: 1, }}>
                    <Header style={{ backgroundColor: 'white' }}>
                        <Left>
                            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
                        </Left>
                        <Body>
                            <Text>PROFILE</Text>
                        </Body>
                        <Right />
                    </Header>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Spinner />
                    </View>
                </View>
            )
        }
        else if(!loading && ready) {
            return (
                <View style={{ flex: 1, }}>
                    <Header style={{ backgroundColor: 'white' }}>
                        <Left>
                            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
                        </Left>
                        <Body>
                            <Text>PROFILE</Text>
                        </Body>
                        <Right />
                    </Header>
                    <Content style={{ flex: 1, padding: 10, backgroundColor: 'white' }}> 
                        <View style={{ flex: 2 }}>
                            {this.makeHelper("Name", user.name, "person", "name")}
                        </View>
                        <View style={{ flex: 2 }}>
                            {this.makeHelper("Email", user.email, "at", "emailAddress", "email-address")}
                        </View>
                        <View style={{ flex: 2 }}>
                        {this.makeHelper("Mobile", user.mobile, "phone-portrait", "telephoneNumber", "numeric")}
                        </View>
                        <View style={{ flex: 2 }}>
    
                        </View>
                    </Content>
                </View>
            );
        }
        else {
            return (
                <View style={{ flex: 1, }}>
                    <Header style={{ backgroundColor: 'white' }}>
                        <Left>
                            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
                        </Left>
                        <Body>
                            <Text>PROFILE</Text>
                        </Body>
                        <Right />
                    </Header>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Error Loading Data</Text>
                    </View>
                </View>
            );
        }
        
    }

}