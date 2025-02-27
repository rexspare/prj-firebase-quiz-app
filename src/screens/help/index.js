import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
    CurveHeader,
    Label,
    ProfileInput,
    GradientButton,
    GenderPicker,
    MenuItem
  } from "@components";
import { COLORS, FONTS, height, hp, wp } from '../../utils/common';
import styles from './styles'
import { useState } from 'react';
import { SCREENS } from '../../navigation/routes';

const Help = (props) => {
    const [isLoading, setisLoading] = useState(false);
    const settings = [
        {
            image: require('@images/icons/account.png'),
            title: 'Help Center ',
            subtle: 'Your guide to help you with the app',
            // props.navigation.navigate(SCREENS.EDIT_PROFILE) 
            onPress: () => {props.navigation.navigate(SCREENS.FAQ)}
        },
        {
            image: require('@images/icons/notification.png'),
            title: 'Contact Us',
            subtle: 'You can ask your quries by contacting us.',
            onPress: () => { props.navigation.navigate(SCREENS.CONTACT_SCREEN)}
        },
       
        {
            image: require('@images/icons/help.png'),
            title: 'Privacy Policy',
            subtle: 'Privacy policy and terms of services',
            onPress: () => {props.navigation.navigate(SCREENS.PRIVACY_POLICY)}
        },
    ]


  return (
    <View style={styles.main}>
    <CurveHeader
      title={"Help"}
      onLeftPress={() => props.navigation.goBack()}
    />
    {/* CONTEXT */}
    <ScrollView contentContainerStyle={{ paddingBottom: height * 0.2 }}>
    

      {/* OPTIONS */}
      <View style={[styles.itemContainer, { flexDirection: 'column' }]}>
        {
          settings.map((setting, index) => (
            <MenuItem
              key={index}
              item={setting}
              style={{ marginVertical: hp(1.3) }}
              onpress={() => setting.onPress()}
            />
            ))
        }

          <View style={styles.line}></View>

      </View>
                    {/* END */}

    


    </ScrollView>
    {/* BUTTON */}
    <LinearGradient
      colors={["rgba(0,0,0,0)", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
      style={styles.absoluteBtn}
    >
      <GradientButton
        style={{ borderRadius: 100, width: wp(70) }}
        textStyles={{ color: COLORS._FFFFFF, fontFamily: FONTS.Poppins_500 }}
        title="Submit"
        onpress={() => {}}
        isLoading={isLoading}
      />
    </LinearGradient>
  </View>
  )
}

export default Help