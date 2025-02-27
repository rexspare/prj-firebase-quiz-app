import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, hp, wp, FONTS } from "@utils/common";
import { commonStyles } from "@styles/commonStyles";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS._F7F7F7,
  },
  itemContainer: {
    width: "48%",
    alignSelf: "center",
    paddingHorizontal: "5%",
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS._E0E0E0,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: COLORS._FFFFFF,
  },
  image: {
    width: hp(11.5),
    height: hp(11.5),
    borderRadius: hp(6),
    marginRight: 10,
  },
  topContainer: {
    width: "100%",
    paddingTop: hp(3),
    paddingBottom: hp(0.7),
    ...commonStyles._center,
  },
  rowContainer: {
    ...commonStyles._rowContainer,
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  title: {
    fontSize: 10,
    color: COLORS._DDDDDD,
    textAlign: "left",
  },
  value: {
    fontFamily: FONTS.Poppins_400,
    color: COLORS._7C7C7C,
    fontSize: 12,
  },
  values: {
    color: "red",
    // borderWidth: 1,
    fontFamily: FONTS.Poppins_400,
  },
  absoluteBtn: {
    position: "absolute",
    bottom: 0,
    height: hp(20),
    width: wp(100),
    ...commonStyles._center,
  },
  keyDropDown: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: 10,
  },
  _picker: {
    maxWidth: 110,
    borderWidth: 1,
    borderRadius: 0,
    paddingRight: 0,
    zIndex: 1000,
    backgroundColor: COLORS._FFFFFF,
    minHeight: hp(2.2),
    borderRadius: 20,
    borderColor: COLORS._E5E5E5,
  },
  _dropDownContainer: {
    maxWidth: 110,
    borderWidth: 0,
    borderRadius: 0,
    zIndex: 1000,
  },
  dropListContainer: {
    backgroundColor: COLORS._FFFFFF,
    borderRadius: 0,
    borderWidth: 0,
    elevation: 5,
  },
  //   DATE PICKER
  main_: {
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: "4%",
    // paddingTop: 3,
    borderWidth: 1,
    borderColor: COLORS._E0E0E0,
    borderRadius: 8,
    backgroundColor: COLORS._FFFFFF,
    alignItems: "flex-start",
    marginBottom: hp(1.7),
  },
  title_: {
    fontSize: 10,
    color: COLORS._DDDDDD,
    bottom: -7,
  },
  input_: {
    // borderWidth:2,
    width: "100%",
    height: hp(4.5),
    paddingLeft: 0,
    fontFamily: FONTS.Poppins_400,
    color: COLORS._7C7C7C,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 12,
  },
});

export default styles;
