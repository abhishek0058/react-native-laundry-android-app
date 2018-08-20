import { AsyncStorage } from 'react-native';

const getFromAsync = async key => {
  try {
    if (!key) return false;
    const result = await AsyncStorage.getItem(key);
    return result ? JSON.parse(result) : false;
  } catch (e) {
    console.log("Async Service get", e);
    return false
  }
};

const putInAsync = async (key, value) => {
  if (key && value) return false;
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.log("Async Service put", e);
    return false
  }
};

const changeInAsync = async (key, obj, newValue) => {
  if (key && obj && newValue) return false;
  try {
    let change = { ...obj, ...newValue };
    await AsyncStorage.setItem(key, JSON.stringify(change));
    return true;
  } catch (e) {
    console.log("Async Service change", e);
    return false
  }
};

export { getFromAsync, putInAsync, changeInAsync };
