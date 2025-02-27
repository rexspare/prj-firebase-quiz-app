
import React from 'react';
import {View, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyboardAvoidWrapper = ({children}) => {
  return (
        <KeyboardAwareScrollView
          extraScrollHeight={20}
          keyboardShouldPersistTaps={'always'}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          contentContainerStyle={{flex: 1, bottom: 10}}>
          <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {children}
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAwareScrollView>
  )
}

export default KeyboardAvoidWrapper