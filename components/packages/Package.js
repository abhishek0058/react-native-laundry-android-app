import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { View, AsyncStorage } from 'react-native'
import { Icon } from 'native-base'
import ShowPackages from './ShowPackages'
import BaseURL from '../BaseURL'


export default class Package extends Component {

    static navigationOptions = {
        drawerIcon: () => (
            <Icon name="cube" style={{ color: 'blue' }} />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    checkPreviousLogin = async () =>  {
        try {
            const user = await AsyncStorage.getItem('user');
            if(!user) {
                this.props.navigation.replace('login')
            } else {
              this.setState({ user: JSON.parse(user) })
            }
        } catch (e) {
            console.log('Login', e)
        }
    }

    fetchPackages = async () => {
        try {
            const response = await fetch(`${BaseURL}/package/all`);
            const data = await response.json();
            this.setState({ data: data.result }) 
        } catch (e) {
            console.log(e)
        }
    }

    componentWillMount() {
        this.fetchPackages()
    }

    async componentDidMount() {
        this.checkPreviousLogin()
    }

    render() {
        if(this.state.user) {
            return (
                <ShowPackages 
                    data={this.state.data} 
                    length={this.state.data.length} 
                    navigation={this.props.navigation} 
                    user={this.state.user}
                />   
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color="yellow" />
                </View>
            ); 
        }
    }
}
