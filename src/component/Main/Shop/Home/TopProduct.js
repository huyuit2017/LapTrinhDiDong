import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ListView,
  FlatList,
  ImageBackground,
} from 'react-native';
import {localhost} from '../../../../api/ipAddress';
//import {ListView} from 'deprecated-react-native-listview';
const url = `http://${localhost}/api/images/product/`;

export default class TopProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topProducts: props.topProducts,
    };
    this.arr = [];
  }
  gotoDetail(product) {
    const {navigation} = this.props;
    navigation.navigate('PRODUCT_DETAIL', {product});
  }
  render() {
    const {
      container,
      titleContainer,
      title,
      body,
      productContainer,
      productImage,
      produceName,
      producePrice,
    } = styles;
    const {topProducts} = this.props;
    return (
      <View style={container}>
        <View style={titleContainer}>
          <Text style={title}>TOP PRODUCT</Text>
        </View>
        <FlatList
          contentContainerStyle={body}
          enableEmptySections
          data={topProducts}
          renderItem={({item}) => (
            <TouchableOpacity
              style={productContainer}
              onPress={() => this.gotoDetail(item)}>
              <Image
                source={{uri: `${url}${item.images[0]}`}}
                style={productImage}
              />
              <Text style={produceName}>{item.name.toUpperCase()}</Text>
              <Text style={producePrice}>{item.price}$</Text>
            </TouchableOpacity>
          )}
          renderSeparator={(sectionId, rowId) => {
            if (rowId % 2 === 1) return <View style={{width, height: 10}} />;
            return null;
          }}
        />
      </View>
    );
  }
}

const {width} = Dimensions.get('window');
const produtWidth = (width - 60) / 2;
const productImageHeight = (produtWidth / 361) * 452;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#2E272B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
  },
  titleContainer: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  title: {
    color: '#D3D3CF',
    fontSize: 20,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingBottom: 10,
  },
  productContainer: {
    width: produtWidth,
    shadowColor: '#2E272B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
  },
  productImage: {
    width: produtWidth,
    height: productImageHeight,
  },
  produceName: {
    marginVertical: 5,
    paddingLeft: 10,
    fontFamily: 'Avenir',
    color: '#D3D3CF',
    fontWeight: '500',
  },
  producePrice: {
    marginBottom: 5,
    paddingLeft: 10,
    fontFamily: 'Avenir',
    color: '#662F90',
  },
});
