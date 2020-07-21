import  AsyncStorage  from "@react-native-community/async-storage";
const setStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log(value);
        return true;
    } catch (error) {
        // Error saving data
        return false;
    }
}

const getStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        console.log(value);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        // Error retrieving data
        return null;
    }
    return null;
}

const clearStorage = async (key) => {
  try{
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(err) {
    return false;
  }
} 

export default Storage = {setStorage,getStorage,clearStorage}
