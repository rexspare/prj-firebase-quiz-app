import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Background, Layout } from "@components";
import {
  CustomInput,
  Branding,
  Label,
  AuthButton,
  TextButton,
} from "@components";
import { COLORS, hp } from '../../utils/common';
import { SCREENS } from '../../navigation/routes';

const PhoneNumberInput = (props) => {
  const [phone, setphone] = useState("");

  return (
    <Background source={require("@images/authBg.png")}>
      <Layout fixed={true}>
        {/* AUTH BRANDING AND PAGE TITLE */}
        <View style={commonStyles._authBrandingContainer}>
          <Branding size={hp(12)} />
          <Label fontSize={hp(2.3)}>Verify Phone</Label>
        </View>
        {/* END */}

        {/* INPUT FIELDS */}
        <CustomInput
          placeholder={"Enter your mobile number"}
          onChange={(txt) => setphone(txt)}
          keyboardType={"phone-pad"}
        />
        {/* END */}

        <AuthButton
          title={"Send Code"}
          onpress={() => {}}
          isLoading={isLoading}
        />
      </Layout>
    </Background>
  )
}

export default PhoneNumberInput

const styles = StyleSheet.create({})