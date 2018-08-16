import React from 'react';
import { Root } from "native-base";
import { Font, AppLoading } from "expo";

import { createStackNavigator } from 'react-navigation';

import Login from './components/Login'
import Signup from './components/Singup'
import Home from './components/Home'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Root>
        <RootStack />
      </Root>
    );
  }
}

const RootStack = createStackNavigator({
  login: Login,
  signup: Signup,
  home: Home
}, {
  initialRouteName: 'login'
});

