import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ListView,
  Image,
  RefreshControl,
  FlatList,
} from 'react-native';
import {localhost} from '../../../../api/ipAddress';
import getListProduct from '../../../../api/getListProduct';

import backList from '../../../../media/appIcon/backList.png';

const url = `http://${localhost}/api/images/product/`;
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProducts: [],
      refreshing: false,
      page: 1,
      name: props.name,
      id: props.id,
      category: props.route.params.category,
    };
    this.arr = [];
  }

  componentDidMount() {
    const idType = this.state.category.id;
    getListProduct(idType, 1)
      .then(arrProduct => {
        this.arr = arrProduct;
        this.setState({
          listProducts: this.arr,
        });
      })
      .catch(err => console.log(err));
  }

  goBack() {
    const {navigation} = this.props;
    navigation.goBack();
  }

  gotoDetail(product) {
    const {navigation} = this.props;
    navigation.navigate('PRODUCT_DETAIL', {
      product,
    });
  }

  render() {
    const {
      container,
      header,
      wrapper,
      backStyle,
      titleStyle,
      productContainer,
      productImage,
      productInfo,
      lastRowInfo,
      txtName,
      txtPrice,
      txtMaterial,
      txtColor,
      txtShowDetail,
    } = styles;
    //const {category} = this.props;
    return (
      <View style={container}>
        <View style={wrapper}>
          <View style={header}>
            <TouchableOpacity onPress={this.goBack.bind(this)}>
              <Image source={backList} style={backStyle} />
            </TouchableOpacity>
            <Text style={titleStyle}>{this.state.name}</Text>
            <View style={{width: 30}} />
          </View>
          <FlatList
            removeClippedSubviews={false}
            data={this.state.listProducts}
            renderItem={({item}) => (
              <View style={productContainer}>
                <Image
                  style={productImage}
                  source={{uri: `${url}${item.images[0]}`}}
                />
                <View style={productInfo}>
                  <Text style={txtName}>{toTitleCase(item.name)}</Text>
                  <Text style={txtPrice}>{item.price}$</Text>
                  <Text style={txtMaterial}>Material {item.material}</Text>
                  <View style={lastRowInfo}>
                    <Text style={txtColor}>
                      Color {item.color.toLowerCase()}
                    </Text>
                    <View
                      style={{
                        backgroundColor: item.color,
                        height: 16,
                        width: 16,
                        borderRadius: 8,
                      }}
                    />
                    <TouchableOpacity onPress={() => this.gotoDetail(item)}>
                      <Text style={txtShowDetail}>SHOW DETAILS</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({refreshing: true});
                  const newPage = this.state.page + 1;
                  const idType = this.props.category.id;
                  getListProduct(idType, newPage)
                    .then(arrProduct => {
                      this.arr = arrProduct.concat(this.arr);
                      this.setState({
                        listProducts: this.arr,
                        refreshing: false,
                      });
                    })
                    .catch(err => console.log(err));
                }}
              />
            }
          />
        </View>
      </View>
    );
  }
}

/*
    <ScrollView style={wrapper}>
        <View style={header}>
            <TouchableOpacity onPress={this.goBack.bind(this)}>
                <Image source={backList} style={backStyle} />
            </TouchableOpacity>
            <Text style={titleStyle}>{category.name}</Text>
            <View style={{ width: 30 }} />
        </View>
        <View style={productContainer}>
            <Image style={productImage} source={sp1} />
            <View style={productInfo}>
                <Text style={txtName}>Lace Sleeve Si</Text>
                <Text style={txtPrice}>117$</Text>
                <Text style={txtMaterial}>Material silk</Text>
                <View style={lastRowInfo}>
                    <Text style={txtColor}>Colo RoyalBlue</Text>
                    <View style={{ backgroundColor: 'cyan', height: 16, width: 16, borderRadius: 8 }} />
                    <TouchableOpacity>
                        <Text style={txtShowDetail}>SHOW DETAILS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </ScrollView>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDBD8',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  wrapper: {
    backgroundColor: '#fff',
    shadowColor: '#2E272B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    margin: 10,
    paddingHorizontal: 10,
  },
  backStyle: {
    width: 30,
    height: 30,
  },
  productContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderTopColor: '#F0F0F0',
    borderBottomColor: '#FFF',
    borderLeftColor: '#FFF',
    borderRightColor: '#FFF',
    borderWidth: 1,
  },
  titleStyle: {
    fontFamily: 'Avenir',
    color: '#B10D65',
    fontSize: 20,
  },
  productImage: {
    width: 90,
    height: (90 * 452) / 361,
  },
  productInfo: {
    justifyContent: 'space-between',
    marginLeft: 15,
    flex: 1,
  },
  lastRowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtName: {
    fontFamily: 'Avenir',
    color: '#BCBCBC',
    fontSize: 20,
    fontWeight: '400',
  },
  txtPrice: {
    fontFamily: 'Avenir',
    color: '#B10D65',
  },
  txtMaterial: {
    fontFamily: 'Avenir',
  },
  txtColor: {
    fontFamily: 'Avenir',
  },
  txtShowDetail: {
    fontFamily: 'Avenir',
    color: '#B10D65',
    fontSize: 11,
  },
});
