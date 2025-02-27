import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    CustomInput,
    Branding,
    Label,
    AuthButton,
    TextButton,
    ProfileInput,
    GradientButton
  } from "@components";
import { COLORS, FONTS, wp } from '../../utils/common';
import firestore from "@react-native-firebase/firestore";
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const QuizEnteries = () => {
    const [quizName, setQuizName] = useState("")
    const [time, setTime] = useState("")
    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [open_, setOpen_] = useState(false);
    const [value_, setValue_] = useState("weekly");
    const [items_, setItems_] = useState([
      { label: "weekly", value: "weekly" },
      { label: "monthly", value: "monthly" },
    ])

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
     {/* <DropDownPicker
              open={open_}
              onOpen={setOpen_(false)}
              value={value_}
              items={items_}
              setOpen={setOpen_}
              setValue={setValue_}
              setItems={setItems_}
              // maxHeight={30}
              placeholder="weekly"
              ArrowUpIconComponent={({ style }) => (
                <View style={style}>
                  <Feather name="chevron-up" size={20} color={COLORS._FFFFFF} />
                </View>
              )}
              ArrowDownIconComponent={({ style }) => (
                <View style={style}>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={COLORS._FFFFFF}
                  />
                </View>
              )}
              style={[
                styles._picker,
              ]}
              containerStyle={[styles._dropDownContainer]}
              textStyle={{
                color: COLORS._FFFFFF,
                fontFamily: FONTS.Poppins_400,
                right: -8,
              }}
              dropDownContainerStyle={[
                styles.dropListContainer
              ]}
              arrowIconStyle={{ width: 30 }}
            />

        <GradientButton
          style={{ borderRadius: 100, width: wp(70) }}
          textStyles={{ color: COLORS._FFFFFF, fontFamily: FONTS.Poppins_500 }}
          title="Next"
          onpress={() => {}}
        //   isLoading={isLoading}-
        /> */}
    </View>
  )
}

export default QuizEnteries

const styles = StyleSheet.create({})