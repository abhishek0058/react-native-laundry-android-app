import React, { Component } from 'react';
import { Container, Content, Button, Text, Icon, Thumbnail } from 'native-base';
import { View, SafeAreaView, Dimension, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';

import Profile from './profile/Profile';

const CustomDrawerComponents = (props) => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 200, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
            <Thumbnail square source={{ uri: 'https://via.placeholder.com/200x200'}} />
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
)

const HomeNavigator = createDrawerNavigator({
    Profile: Profile,
},{
    contentComponent: CustomDrawerComponents,
})


export default class Home extends Component {
    
    static navigationOptions = {
        header: null
    }

    render() {
        // console.log('home', this.props.navigation.state.params)
        return (
            <HomeNavigator />  
        )
    }
}