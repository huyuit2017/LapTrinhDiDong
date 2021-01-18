import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import Collection from './Collection';
import Category from './Catelogy';
import TopProduct from './TopProduct';
import initData from '../../../../api/initData';
class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      topProducts: [],
    };
  }
  componentDidMount() {
    initData().then(resJSON => {
      const {type, product} = resJSON;
      this.setState({types: type, topProducts: product});
    });
  }
  render() {
    const {types, topProducts} = this.state;
    const {navigation} = this.props;
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#DBDBD8'}}>
        <Collection navigation={navigation} />
        <Category types={types} navigation={navigation} />
        <TopProduct topProducts={topProducts} navigation={navigation} />
      </ScrollView>
    );
  }
}

export default HomeView;
