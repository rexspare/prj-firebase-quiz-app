import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, hp, wp } from "@utils/common";
import { commonStyles } from "@styles/commonStyles";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS._F7F7F7,
  },
  itemContainer: {
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: "5%",
    paddingVertical: 8,
    borderColor: COLORS._E0E0E0,
    borderRadius: 7,
    justifyContent: "space-between",
    backgroundColor: COLORS._FFFFFF,
  },
  rowContainer: {
    width: "100%",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // marginVertical: 30,
    height: hp(30)
  },

  circleIndicator: {
    width: "75%",
    paddingVertical: hp(1.8),
    // justifyContent: "space-between",
    alignItems: "center",
    height: hp(25)
  },
  indicatorTxt: {
    color: COLORS._7C7C7C,
    fontSize: hp(1.4),
    maxWidth: "100%",
    marginTop: 5,
    // height: hp(3)
  },
  image: {
    width: hp(7),
    height: hp(7),
    borderRadius: hp(4),
    marginRight: 10,
  },
  line: {
    width: "100%",
    height: 1.5,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    marginTop: hp(2),
    marginBottom: hp(2),
  },

  keyDropDown: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: 10,
    zIndex: 1000
  },
  _picker: {
    maxWidth: 180,
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
    maxWidth: 150,
    height: 30,
    borderRadius: 0,
    zIndex: 1000,
  },
  dropListContainer: {
    backgroundColor: COLORS._FFFFFF,
    borderRadius: 0,
    borderWidth: 0,
    elevation: 5,
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
