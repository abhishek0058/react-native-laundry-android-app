import React from 'react';
import { Root } from "native-base";
import Expo, { Font, AppLoading, Constants } from "expo";
import { SafeAreaView, Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation';

import Login from './components/Login'
import Signup from './components/Singup'
import Home from './components/Home'
import VerifyOtp from "./components/VerifyOtp"
import ForgetPassword from "./components/ForgetPassword";
import SelectCity from "./components/location/selectCity";
import SelectHostel from "./components/location/selectHostel";
import NavigationService from './components/NavigationService';

console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

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
        <SafeAreaView style={{ flex: 1 }}>
          <Root>
            <AppLoading />
          </Root>
        </SafeAreaView>
        
      );
    }
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
        <Root>
          <RootStack
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }} 
          />
        </Root>
      </SafeAreaView>
    );
  }
}

const RootStack = createStackNavigator({
  selectCity: SelectCity,
  selectHostel: SelectHostel,
  login: Login,
  signup: Signup,
  home: Home,
  verify: VerifyOtp,
  forget: ForgetPassword
}, {
  initialRouteName: 'login'
});

