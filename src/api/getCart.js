import {AsyncStorage} from 'react-native';

const getCart = async () => {
  try {
    const arrCart = await AsyncStorage.getItem('@cart');
    return arrCart !== null ? JSON.parse(arrCart) : [];
    // if (arrCart !== null) {
    //     console.log('We have arrCart');
    //     console.log(arrCart);
    // }
  } catch (error) {
    return [];
    // console.log('Error when retrieving data');
    // console.log(error);
  }
};

export default getCart;
