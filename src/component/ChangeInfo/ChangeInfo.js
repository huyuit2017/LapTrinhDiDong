import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import backSpecial from '../../media/appIcon/backs.png';
import getToken from '../../api/getToken';
import changeInfo from '../../api/changeInfo';
import checkLogin from '../../api/checkLogin';

export default class ChangeInfo extends Component {
  constructor(props) {
    super(props);
    const {name, address, phone} = props.route.params.user;
    this.state = {
      txtName: name,
      txtAddress: address,
      txtPhone: phone,
    };
  }
  goBackToMain() {
    const {navigation} = this.props;
    navigation.navigate('SHOP');
  }
  componentDidMount() {
    getToken()
      .then(token => checkLogin(token))
      .then(res => {
        this.setState({
          txtName: res.user.name,
          txtAddress: res.user.address,
          txtPhone: res.user.phone,
        });
      });
  }
  onChangeInfo() {
    const {txtName, txtAddress, txtPhone} = this.state;

    getToken()
      .then(token => changeInfo(token, txtName, txtAddress, txtPhone))
      .then(() => {
        Alert.alert('Update Successfully!');
        this.props.navigation.goBack();
      })
      .catch(err => console.log(err));
  }
  render() {
    const {
      wrapper,
      header,
      headerTitle,
      backIconStyle,
      body,
      signInContainer,
      signInTextStyle,
      textInput,
    } = styles;
    const {txtName, txtAddress, txtPhone} = this.state;
    return (
      <View style={wrapper}>
        <View style={header}>
          <View />
          <Text style={headerTitle}>User Infomation</Text>
          <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
            <Image source={backSpecial} style={backIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={body}>
          <TextInput
            style={textInput}
            placeholder="Enter your name"
            autoCapitalize="none"
            value={txtName}
            onChangeText={text => this.setState({...this.state, txtName: text})}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={textInput}
            placeholder="Enter your address"
            autoCapitalize="none"
            value={txtAddress}
            onChangeText={text =>
              this.setState({...this.state, txtAddress: text})
            }
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={textInput}
            placeholder="Enter your phone number"
            autoCapitalize="none"
            value={txtPhone}
            onChangeText={text =>
              this.setState({...this.state, txtPhone: text})
            }
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            style={signInContainer}
            onPress={() => this.onChangeInfo()}>
            <Text style={signInTextStyle}>CHANGE YOUR INFOMATION</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#fff'},
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
  headerTitle: {fontFamily: 'Avenir', color: '#fff', fontSize: 20},
  backIconStyle: {width: 30, height: 30},
  body: {flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center'},
  textInput: {
    height: 45,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Avenir',
    paddingLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: '#2ABB9C',
    borderWidth: 1,
  },
  signInTextStyle: {
    color: '#FFF',
    fontFamily: 'Avenir',
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  signInContainer: {
    marginHorizontal: 20,
    backgroundColor: '#2ABB9C',
    borderRadius: 20,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  signInStyle: {
    flex: 3,
    marginTop: 50,
  },
});
