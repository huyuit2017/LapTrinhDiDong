import React, {Component} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home/Home';
import Contact from './Contact/Contact';
import Search from './Search/Search';
import Cart from './Cart/Cart';
import Header from './Header';
import checkLogin from '../../../api/checkLogin';
import getToken from '../../../api/getToken';
import global from '../../global';
import saveCart from '../../../api/saveCart';
import getCart from '../../../api/getCart';

const {height} = Dimensions.get('window');
const Tab = createBottomTabNavigator();
function IconWithBadge({name, badgeCount, color, size}) {
  return (
    <View style={{width: 24, height: 24, margin: 5}}>
      <Image
        source={name}
        style={{width: 30, height: 30}}
        resizeMode="contain"
      />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}
function HomeIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} />;
}
export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      topProducts: [],
      cartArray: [],
      user: null,
    };
    global.addProductToCart = this.addProductToCart.bind(this);
    global.increaseQuantity = this.increaseQuantity.bind(this);
    global.decreaseQuantity = this.decreaseQuantity.bind(this);
    global.removeProduct = this.removeProduct.bind(this);
    getCart().then(cartArray =>
      this.setState({cartArray}, () => this.updateProductsInCart()),
    );
    global.gotoSearch = this.gotoSearch.bind(this);
  }
  gotoSearch() {
    const {navigation} = this.props;
    navigation.navigate('Search');
  }
  componentDidMount() {
    getToken()
      .then(token => checkLogin(token))
      .then(res => {
        console.log('user:', res.user);
        global.onSignIn = res.user;
        this.setState({user: res.user});
        console.log('state:', global.onSignIn);
      })
      .catch(err => console.log('LOI CHECK LOGIN', err));
    //getCart().then(cartArray => this.setState({cartArray}));
  }
  addProductToCart(product) {
    if (this.state.cartArray !== []) {
      const check = this.state.cartArray.findIndex(
        e => e.product.id === product.id,
      );
      if (check !== -1) {
        // this product is exist in cart
        const newCart = this.state.cartArray;
        newCart.splice(check, 1, {
          product,
          quantity: newCart[check].quantity + 1,
        });
        this.setState({cartArray: newCart}, () => this.updateProductsInCart());
      } else {
        this.setState(
          {
            cartArray: this.state.cartArray.concat({product, quantity: 1}),
          },
          () => this.updateProductsInCart(),
        );
      }
    } else {
      this.setState(
        {
          cartArray: this.state.cartArray.concat({product, quantity: 1}),
        },
        () => this.updateProductsInCart(),
      );
    }
  }

  updateProductsInCart() {
    global.productsInCart = this.state.cartArray;
    saveCart(this.state.cartArray);
  }

  increaseQuantity(productId) {
    const newArrCart = this.state.cartArray.map(e => {
      if (e.product.id !== productId) return e;
      return {product: e.product, quantity: e.quantity + 1};
      // return (e.product.id !== productId) ? e : { product: e.product, quantity: e.quantity + 1 };
    });
    this.setState({cartArray: newArrCart}, () => this.updateProductsInCart());
  }

  decreaseQuantity(productId) {
    const newArrCart = this.state.cartArray.map(e => {
      return e.product.id !== productId
        ? e
        : {product: e.product, quantity: e.quantity > 1 ? e.quantity - 1 : 1};
    });
    this.setState({cartArray: newArrCart}, () => this.updateProductsInCart());
  }

  removeProduct(productId) {
    console.log('App ---> removeProduct');
    const newCart = this.state.cartArray.filter(
      e => e.product.id !== productId,
    );
    this.setState({cartArray: newCart}, () => this.updateProductsInCart());
  }
  /*addProductToCart(product) {
    const isExist = this.state.cartArray.some(e => e.product.id === product.id);
    if (isExist) {
      return false;
    }
    this.setState(
      {cartArray: this.state.cartArray.concat({product, quantity: 1})},
      () => saveCart(this.state.cartArray),
    );
  }
  incrQuantity(productId) {
    const newCart = this.state.cartArray.map(e => {
      if (e.product.id !== productId) {
        return e;
      }
      return {product: e.product, quantity: e.quantity + 1};
    });
    this.setState({cartArray: newCart}, () => saveCart(this.state.cartArray));
  }
  decrQuantity(productId) {
    const newCart = this.state.cartArray.map(e => {
      if (e.product.id !== productId) {
        return e;
      }
      return {product: e.product, quantity: e.quantity - 1};
    });
    this.setState({cartArray: newCart}, () => saveCart(this.state.cartArray));
  }
  removeProduct(productId) {
    const newCart = this.state.cartArray.filter(
      e => e.product.id !== productId,
    );
    this.setState({cartArray: newCart}, () => saveCart(this.state.cartArray));
  }*/
  openMenu() {
    const {navigation} = this.props;
    navigation.navigate('MENU');
  }
  render() {
    const {navigation} = this.props;
    const {types, topProducts, cartArray} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header onOpen={this.openMenu.bind(this)} navigation={navigation} />
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? require('../../../media/appIcon/home.png')
                  : require('../../../media/appIcon/home0.png');
              } else if (route.name === 'Contact') {
                iconName = focused
                  ? require('../../../media/appIcon/contact.png')
                  : require('../../../media/appIcon/contact0.png');
              } else if (route.name === 'Search') {
                iconName = focused
                  ? require('../../../media/appIcon/search.png')
                  : require('../../../media/appIcon/search0.png');
              } else if (route.name === 'Cart') {
                iconName = focused
                  ? require('../../../media/appIcon/cart.png')
                  : require('../../../media/appIcon/cart0.png');
                return (
                  <HomeIconWithBadge
                    name={iconName}
                    size={size}
                    color={color}
                    badgeCount={cartArray.length}
                  />
                );
              }

              // You can return any component that you like here!
              return (
                <Image source={iconName} style={{width: 30, height: 30}} />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            //children={() => <Home topProducts={topProducts} types={types} />}
            //initialParams={{types: {types}, topProducts: {topProducts}}}
          />
          <Tab.Screen
            name="Cart"
            //component={Cart}
            children={() => <Cart cartArray={cartArray} />}
            //initialParams={{cartArray: {cartArray}}}
          />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Contact" component={Contact} />
        </Tab.Navigator>
      </View>
    );
  }
}
