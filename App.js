import { View, Text, ImageBackground, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import configureStore from './src/data/local/store/redux';
import { AuthProvider } from './src/contexts/authContext';
import { AppProvider } from './src/contexts/appContext';
import FlashMessage from "react-native-flash-message";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Splash from './src/screens/splash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const store = configureStore();

const App = () => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'xxxxxxxx-xxxx-x-xxxxxx',
    });
  }, [])

  return (
    <Provider store={store}>
      <AuthProvider>
        <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Splash />
        </GestureHandlerRootView>
        </AppProvider>
      </AuthProvider>
      {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
      <FlashMessage position="top" />
    </Provider>
  )
}

export default App