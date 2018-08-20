import React, { Component } from 'react';
import { View } from 'react-native'
import { AsyncStorage } from 'react-native';
import { Spinner, Content, Form, Item, Input, Label, Button, Text, Icon, Header, Left, Body, Right } from 'native-base';

import Helper from './Helper'
import DropDown from './DropDown'
import BaseURL from '../BaseURL';

export default class Profile extends Component {

    static navigationOptions = {
        drawerIcon: ({ tintcolor }) => (
            <Icon name="person" style={{ color: 'blue' }} />
        )
    }

    state = {
        loading: true,
        ready: false,
        user: {},
        hostels: [],
        cities: [],
        city: "null",
        hostel: "null",
        filteredHostels: []
    };

    fetchCities = async () => {
        try {
            const response = await fetch(`${BaseURL}/city/all`);
            const cities = await response.json();
            this.setState({ cities: cities.result })
        } catch (e) {
            console.log(e)
        }
        
    }

    fetchHostels = async () => {
        try {
            const response = await fetch(`${BaseURL}/hostel/all`);
            const hostels = await response.json();
            this.setState({ hostels: hostels.result })
        } catch (e) {
            console.log(e)
        }
        
    }

    checkPreviousLogin = async () =>  {
        try {
            let user = await AsyncStorage.getItem('user');
            if(user) {
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
        this.fetchCities()
        this.fetchHostels()
    }

    refreshAsyncStorage = async (obj) => {
        try {
            let user = { ...this.state.user, ...obj }
            await AsyncStorage.setItem('user', JSON.stringify(user))
            user = await AsyncStorage.getItem('user')
            this.setState({ user: JSON.parse(user)})
        } catch (e) {
            console.log('refreshAsncStorage 3', e)
        }
    }

    cityChange = (city) => {
        console.log(city)
        const filteredHostels = this.state.hostels.filter(item => item.cityid == city)
        this.setState({ filteredHostels, city })
        console.log(filteredHostels)
    }

    makeHelper = (label, value, icon, contentType, keyboardType = "") => (
        <Helper 
            userid={this.state.user.id} 
            label={label} value={value} 
            icon={icon} 
            contentType={contentType}
            keyboardType={keyboardType}
            refreshAsyncStorage={obj => this.refreshAsyncStorage(obj)}
        />
    ) 

    updateHostel = hostel => {
        this.setState({ hostel })
    }

    makeDropDown = key => {
        if(key == "Choose Hostel") {
            if(this.state.city == "null")
                return (<DropDown key={key} label={`Choose City First`} data={[]} updateHostel={hostel => this.updateHostel(hostel)} />)
            else
                return (<DropDown key={key} label={key} data={this.state.filteredHostels} updateHostel={hostel => this.updateHostel(hostel)} />)
        } else if(key == "Choose City") {
            return (<DropDown key={key} label={key} data={this.state.cities} cityChange={city => this.cityChange(city)} />)
        }
    }

    updateLocation = async () => {
        try {
            if(this.state.city == "null" || this.state.hostel == "null") 
                alert('Please Select Both City & Hostel')
            else {
                const response = await fetch(`${BaseURL}/user/edit`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        // "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: JSON.stringify({ id: this.state.user.id, cityid: this.state.city, hostelid: this.state.hostel })
                });
                const result = await response.json();
                if(result.result) {
                    alert('Successfully Set')
                    this.refreshAsyncStorage({ cityid: this.state.city, hostelid: this.state.hostel })
                } else {
                    alert('Server Error')
                }
            }
        } catch(e) {
            console.log('Profile - UpdateLocation', e)
        }
        
    }

    show = (data, id) => {
        if(id) {
            const obj = data.find(item => item.id == id)
            if(obj) {
                return (
                    <Text style={{ fontSize: 18 }}>
                        {obj.name}
                    </Text>
                );
            }
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Spinner />
            </View>
        );
    }

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
                    <Header style={{ backgroundColor: 'white', }}>
                        <Left>
                            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
                        </Left>
                        <Body>
                            <Text>PROFILE</Text>
                        </Body>
                        <Right />
                    </Header>
                    <Content style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>

                        <View style={{ flex: 1 , marginHorizontal: 20, borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Personal Information</Text>
                        </View>

                        <View style={{ flex: 5, marginBottom: 10, padding: 20 }}>
                            <View style={{ flex: 2 }}>
                                {this.makeHelper("Name", user.name, "person", "name")}
                            </View>
                            <View style={{ flex: 2 }}>
                                {this.makeHelper("Email", user.email, "at", "emailAddress", "email-address")}
                            </View>
                            <View style={{ flex: 2 }}>
                                {this.makeHelper("Mobile", user.mobile, "phone-portrait", "telephoneNumber", "numeric")}
                            </View>
                        </View>

                        <View style={{ flex: 1 , marginHorizontal: 20, borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Location Information</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, padding: 10 }}>
                            {this.show(this.state.hostels, this.state.user.hostelid)}
                            <Text style={{ fontSize: 20 }}> , </Text>
                            {this.show(this.state.cities, this.state.user.cityid)}
                        </View>

                        <View style={{ flex: 5, marginBottom: 10, padding: 10 }}>
                            <View style={{ flex: 2 }}>
                                {this.makeDropDown("Choose City")}
                            </View>
                            <View style={{ flex: 2 }}>
                                {this.makeDropDown("Choose Hostel")}
                            </View>
                            <View style={{ flex: 2, margin: 10 }}>
                                <Button info full iconRight onPress={() => this.updateLocation()}>
                                    <Text style={{ fontSize: 15 }}>Set Location</Text>
                                    <Icon name="send" style={{ color: 'white'}} />
                                </Button>
                            </View>
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