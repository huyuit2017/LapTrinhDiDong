import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {localhost} from '../../../../api/ipAddress';
const url = `http://${localhost}/api/images/type/`;
import Swiper from 'react-native-swiper';
const {height, width} = Dimensions.get('window');
export default class Catelogy extends Component {
  gotoListProduct(category) {
    const {navigation} = this.props;
    navigation.navigate('LIST_PRODUCT', {
      category,
    });
  }
  render() {
    const {types} = this.props;
    const {wrapper, textStyle, imageStyle, cateTitle} = styles;
    const swiper = (
      <Swiper showsPagination width={imageWidth} height={imageHeight}>
        {types.map(e => (
          <TouchableOpacity onPress={() => this.gotoListProduct(e)} key={e.id}>
            <Image source={{uri: `${url}${e.image}`}} style={imageStyle} />
          </TouchableOpacity>
        ))}
      </Swiper>
    );
    return (
      <View style={wrapper}>
        <View style={{justifyContent: 'center', height: 50}}>
          <Text style={textStyle}>LIST OF CATEGORY</Text>
        </View>
        <View style={{justifyContent: 'flex-end', flex: 4}}>
          {types.length ? swiper : null}
        </View>
      </View>
    );
  }
}
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;
const styles = StyleSheet.create({
  wrapper: {
    height: height * 0.35,
    backgroundColor: '#FFF',
    margin: 10,
    shadowColor: '#2E272B',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    padding: 10,
    paddingTop: 0,
  },
  textStyle: {
    fontSize: 20,
    color: '#AFAEAF',
  },
  imageStyle: {
    height: imageHeight,
    width: imageWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCate: {
    fontSize: 20,
    fontFamily: 'Avenir',
    color: '#FFF',
  },
});
