import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToastMessage } from './Toast';

export const setData = async (key, val) => {
    try {
        let tempValue = JSON.stringify(val);
        await AsyncStorage.setItem(key, tempValue);
    } catch (error) {
        console.error(error, "AsyncStorage")
    }
}

export const getData = async (key) => {
    try {
        let value = await AsyncStorage.getItem(key);
        if (value) {
            let newValue = JSON.parse(value);
         return newValue;
        } else {
            return value;
        }
    } catch (error) {
        console.error(error, "AsyncStorage")
    }
}

export const removeItemValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch (exception) {
        return false;
    }
}




const CART_KEY = 'CART_ITEMS';

export const addToCart = async (product) => {
  try {
    const data = await AsyncStorage.getItem(CART_KEY);
    let cart = data ? JSON.parse(data) : [];

    // 🔥 FIX HERE (_id)
    const index = cart.findIndex(item => item._id === product._id);

    if (index !== -1) {
      cart[index].qty += 1;
    } else {
      cart.push({
        ...product,
        qty: 1
      });
    }

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    showToastMessage('Product added to cart');
    console.log('Added to cart:', cart);

  } catch (e) {
    console.log('Add to cart error', e);
  }
};
