import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeView from './HomeView';
import ProductDetail from '../ProductDetail/ProductDetail';
import ListProduct from '../ListProduct/ListProduct';
const Stack = createStackNavigator();
export default class Home extends Component {
  render() {
    const {types, topProducts, navigation} = this.props;
    return (
      <Stack.Navigator initialRouteName="HOME_VIEW">
        <Stack.Screen
          name="HOME_VIEW"
          component={HomeView}
          options={{headerShown: false}}
          /*children={() => (
            <HomeView
              topProducts={topProducts}
              types={types}
              navigation={navigation}
            />
          )}*/
          //initialParams={{types: {types}, topProducts: {topProducts}}}
        />
        <Stack.Screen
          name="PRODUCT_DETAIL"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LIST_PRODUCT"
          component={ListProduct}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
}
