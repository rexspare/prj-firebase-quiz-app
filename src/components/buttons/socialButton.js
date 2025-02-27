import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {COLORS, FONTS, hp} from '@utils/common';
import {commonStyles} from '@styles/commonStyles';
import {useSelector} from 'react-redux';
import { wp } from '../../utils/common';

const SocialButton = props => {
  const theme = useSelector(state => state.themeReducer.theme);

  const iconSelector = () => {
    switch (props.type) {
      case 'google':
        return require('@images/google.png');
      case 'facebook':
        return require('@images/facebook.png');
        case 'apple':
            return require('@images/apple.png');
      default:
        return require('@images/google.png');
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.btnConatiner,
        props.style,
      ]}
      disabled={props.disable}
      activeOpacity={0.7}
      onPress={() => props.onpress()}>
      <Image source={iconSelector()} style={styles.icon} resizeMode="contain" />
    </TouchableOpacity>
  );
};

SocialButton.defaultProps = {
  style: {},
  disable: false,
  onpress: () => {
    alert('onpress');
  },
  title: 'title',
};

const styles = StyleSheet.create({
  btnConatiner: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(3),
    ...commonStyles._center,
    backgroundColor : COLORS._FFFFFF,
    marginHorizontal : wp(1.5)
  },
  icon: {
    width: hp(3.2),
    height: hp(3.2),
    marginRight : hp(0.2),
    marginBottom: hp(0.2)
  },
});

export default SocialButton;
