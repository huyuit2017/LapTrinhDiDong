import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import global from '../../../global';
import sendOrder from '../../../../api/sendOrder';
import getToken from '../../../../api/getToken';
import {localhost} from '../../../../api/ipAddress';
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}
const url = `http://${localhost}/api/images/product/`;
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }

  reRender() {
    this.setState({
      refresh: !this.state.refresh,
    });
  }

  increaseQuantity(id) {
    global.increaseQuantity(id);
    this.setState(
      {refresh: !this.state.refresh},
      () => this.forceUpdate(), // render lai 2 lan, lenh forceUpdate() se thuc hien sau lenh Global.increaseQuantity(id);
    );
  }

  decreaseQuantity(id) {
    global.decreaseQuantity(id);
    this.setState(
      {refresh: !this.state.refresh},
      () => this.forceUpdate(), // render lai 2 lan
    );
  }

  removeProduct(id) {
    global.removeProduct(id);
    this.setState(
      {refresh: !this.state.refresh},
      () => this.forceUpdate(), // render lai 2 lan
    );
  }
  gotoDetail(product) {
    const {navigation} = this.props;
    navigation.navigate('PRODUCT_DETAIL', {product});
  }

  async onSendOrder() {
    try {
      const token = await getToken();
      const arrayDetail = this.props.cartArray.map(e => ({
        id: e.product.id,
        quantity: e.quantity,
      }));
      const kq = await sendOrder(token, arrayDetail);
      if (kq === 'THEM_THANH_CONG') {
        console.log('THEM THANH CONG');
        while (this.props.cartArray !== []) {
          this.removeProduct(this.props.cartArray[0].product.id);
        }
      } else {
        console.log('THEM THAT BAI', kq);
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const {
      main,
      checkoutButton,
      checkoutTitle,
      wrapper,
      productStyle,
      mainRight,
      productController,
      txtName,
      txtPrice,
      productImage,
      numberOfProduct,
      txtShowDetail,
      showDetailContainer,
    } = styles;
    const {cartArray} = this.props;
    console.log('b:', cartArray);
    const arrTotal = cartArray.map(e => e.product.price * e.quantity);
    const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
    return (
      <View style={wrapper}>
        <FlatList
          contentContainerStyle={main}
          enableEmptySections
          data={cartArray}
          renderItem={({item}) => (
            <View style={productStyle}>
              <Image
                source={{uri: `${url}${item.product.images[0]}`}}
                style={productImage}
              />
              <View style={[mainRight]}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={txtName}>{toTitleCase(item.product.name)}</Text>
                  <TouchableOpacity
                    onPress={() => this.removeProduct(item.product.id)}>
                    <Text style={{fontFamily: 'Avenir', color: '#969696'}}>
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={txtPrice}>{item.product.price}$</Text>
                </View>
                <View style={productController}>
                  <View style={numberOfProduct}>
                    <TouchableOpacity
                      onPress={() => this.increaseQuantity(item.product.id)}>
                      <Text>+</Text>
                    </TouchableOpacity>
                    <Text>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => this.decreaseQuantity(item.product.id)}>
                      <Text>-</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={showDetailContainer}
                    onPress={() => this.gotoDetail(item.product)}>
                    <Text style={txtShowDetail}>SHOW DETAILS</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          style={checkoutButton}
          onPress={this.onSendOrder.bind(this)}>
          <Text style={checkoutTitle}>TOTAL {total}$ CHECKOUT NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const {width} = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DFDFDF',
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#2ABB9C',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width,
    backgroundColor: '#DFDFDF',
  },
  checkoutTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
  },
  productStyle: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center',
  },
  mainRight: {
    flex: 3,
    justifyContent: 'space-between',
  },
  productController: {
    flexDirection: 'row',
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txtName: {
    paddingLeft: 20,
    color: '#A7A7A7',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtPrice: {
    paddingLeft: 20,
    color: '#C21C70',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
  txtShowDetail: {
    color: '#C21C70',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Avenir',
    textAlign: 'right',
  },
  showDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
export default Cart;
