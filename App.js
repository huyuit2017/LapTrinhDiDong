import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Authentication from './src/component/Authentication/Authentication';
import OrderHistory from './src/component/OrderHistory/OrderHistory';
import ChangeInfo from './src/component/ChangeInfo/ChangeInfo';
import Menu from './src/component/Main/Menu';
import Shop from './src/component/Main/Shop/Shop';
import refreshToken from './src/api/refreshToken';
StatusBar.setHidden(true);
const Stack = createStackNavigator();
export default class App extends Component {
  componentDidMount() {
    setInterval(refreshToken, 30000);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SHOP">
          <Stack.Screen
            name="MENU"
            component={Menu}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SHOP"
            component={Shop}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AUTHENTICATION"
            component={Authentication}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CHANGE_INFO"
            component={ChangeInfo}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ORDER_HISTORY"
            component={OrderHistory}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
