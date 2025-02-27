import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, hp, wp, FONTS } from "@utils/common";
import { commonStyles } from "@styles/commonStyles";
import { height, width } from "../../utils/common";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS._F7F7F7,
  },
  
  absoluteBtn: {
    position: "absolute",
    bottom: 0,
    height: hp(20),
    width: wp(100),
    ...commonStyles._center,
  },
  descriptionInput: {
    backgroundColor: '#fff',
    height: height*0.2,
    width: width*0.9,
    alignSelf: 'center',
    paddingLeft: 10,
    textAlignVertical: 'top',
    color : COLORS._7C7C7C,
    borderWidth : 1,
    borderColor :COLORS._E0E0E0,
    borderRadius : 8,
  },
});

export default styles;
