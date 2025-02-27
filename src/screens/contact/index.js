import { View, Text, ScrollView, TextInput } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
    CurveHeader,
    Label,
    ProfileInput,
    GradientButton,
    GenderPicker,
    CustomInput
  } from "@components";
import { COLORS, FONTS, height, width, wp } from '../../utils/common';
import styles from './styles';
import { useState } from 'react';
import { saveContactData } from '../../services/firebaseServices';
import { showFlash } from "@utils/myUtils";

const Contact = (props) => {
    const [isLoading, setisLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')
    const [isEmailValid, setisEmailValid] = useState(false);

    const onsubmit = () => {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if(!name || !email || !description){
        showFlash("All fields must be filled", "warning")
      }else if(!emailRegex.test(email)){
        showFlash("Email is not correct.", "warning")
      }else{
        saveContactData(name, email, description)
      }
    }

  return (
    <View style={styles.main}>
      <CurveHeader
        title={"Contact Us"}
        onLeftPress={() => props.navigation.goBack()}
      />
      {/* CONTEXT */}
      <ScrollView contentContainerStyle={{ paddingBottom: height * 0.2, marginTop: height*0.1 }}>
      

        {/* INPUT FIELDS */}

        <ProfileInput
          title="Name"
        //   value={name}
          onChange={(txt) => setName(txt)}
        />

        <ProfileInput
          title="Email"
          value={email}
          onChange={(txt) => setEmail(txt)}
        //   editable={false}
        />

       <TextInput
         multiline={true}
         numberOfLines={10}
         placeholder={'Description'}
         placeholderTextColor={COLORS._DDDDDD}
         style={styles.descriptionInput}
         value={description}
         onChangeText={(txt) => setDescription(txt)}
       />


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
        onpress={() => onsubmit()}
        isLoading={isLoading}
      />
    </LinearGradient>
    </View>
  )
}

export default Contact