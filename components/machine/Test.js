import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Button } from 'native-base'
import BaseURL from '../BaseURL';
import SocketIOClient from 'socket.io-client';

class Test extends Component {
    
    constructor(props) {
        super(props);
        this.socket = SocketIOClient(BaseURL);
    }

    send = () => {
        this.socket.emit('connect');
    }

    render() {
        this.socket.on('test', msg => {
            console.log(msg)
        })

        return (
            <View>
                <Text>Socket Test</Text>
                <Button
                info
                    onPress={() => this.send()}
                >
                    <Text>Connect</Text>
                </Button>
            </View>
        );
    }
}
export default Test;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});