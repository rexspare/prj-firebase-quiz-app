import React from 'react';
import {ScrollView, View} from 'react-native';
import If from './if';
import { useSelector } from 'react-redux';

const Layout=({
  children,
  containerStyle,
  fixed,
  contentContainerStyle,
}) => {
  const theme = useSelector((state) => state.themeReducer.theme)

  return (
    <>
      <If condition={fixed}>
        <View
          style={[{flex:1},  containerStyle]}>
          {children}
        </View>
      </If>
      <If condition={!fixed}>
        <ScrollView
          style={[{flex:1}, containerStyle]}
          contentContainerStyle={contentContainerStyle}>
          {children}
        </ScrollView>
      </If>
    </>
  );
};

export default Layout;
