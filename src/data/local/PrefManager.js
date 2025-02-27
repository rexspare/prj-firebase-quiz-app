import AsyncStorage from '@react-native-async-storage/async-storage';
import LightTheme from '@assets/theme/light.json';
import {storageKeys} from '@constants/storageKeys';

export default class PrefManager {
  async setTheme(theme) {
    try {
      await AsyncStorage.setItem(storageKeys.THEME_KEY, JSON.stringify(theme));
    } catch (error) {
      console.log(error);
    }
  }

  async getTheme(onLoaded) {
    try {
      const theme = await AsyncStorage.getItem(storageKeys.THEME_KEY);
      const mTheme = theme ? JSON.parse(theme) : LightTheme;
      onLoaded(mTheme);
    } catch (error) {
      console.log(error, 'PrefManger');
      onLoaded(LightTheme);
    }
  }
  //Languages
  async setLang(lang) {
    try {
      await AsyncStorage.setItem(storageKeys.LANG_KEY, JSON.stringify(lang));
    } catch (error) {
      console.log(error);
    }
  }
  async getLang(onLoaded) {
    try {
      const lang = await AsyncStorage.getItem(storageKeys.LANG_KEY);
      const mlang = lang ? JSON.parse(lang) : English;
      onLoaded(mlang);
    } catch (error) {
      console.log(error, 'PrefManger');
      onLoaded(English);
    }
  }
}
