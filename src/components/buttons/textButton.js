import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTS, hp} from '@utils/common';
import {commonStyles} from '@styles/commonStyles';

const TextButton = props => {
  return (
    <View style={[props.style, styles.btnConatiner]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => props.onpress()}
        disabled={props.disable}>
        <Text style={[styles.btnText, props.textStyles]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

TextButton.defaultProps = {
  title: 'title',
  style: {},
  disable: false,
  onpress: () => alert('yeyy'),
};

const styles = StyleSheet.create({
  btnConatiner: {
  },

  btnText: {
    fontFamily: FONTS.Poppins_400,
    color: COLORS._FFFFFF,
    fontSize: hp(1.5),
  },
});

export default TextButton;
