import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, hp, wp, FONTS } from "@utils/common";
import { commonStyles } from "@styles/commonStyles";
import { height } from "../../utils/common";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS._F7F7F7,
  },
  itemContainer: {
    width:'90%',
    alignSelf:'center',
    paddingHorizontal : '5%',
    paddingVertical: 8,
    ...commonStyles._rowContainer,
    borderWidth : 1,
    borderColor :COLORS._E0E0E0,
    borderRadius : 7,
    justifyContent :'space-between',
    backgroundColor : COLORS._FFFFFF,
    marginTop: height*0.1
},
  absoluteBtn: {
    position: "absolute",
    bottom: 0,
    height: hp(20),
    width: wp(100),
    ...commonStyles._center,
  },
  

});

export default styles;
