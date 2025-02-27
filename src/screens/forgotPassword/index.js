import { Image, Text, View } from "react-native";
import React, { useState } from "react";
import { Background, Layout } from "@components";
import {
  CustomInput,
  Branding,
  Label,
  AuthButton,
  TextButton,
} from "@components";
import { commonStyles } from "@styles/commonStyles";
import { hp, COLORS, wp, width } from "@utils/common";
import { SCREENS } from "@navigation/routes";
import { sendPasswordResendLink } from "../../services/firebaseServices";
import { showFlash } from "../../utils/myUtils";

const ForgotPassword = (props) => {
  const [email, setemail] = useState("");
  const [isEmailValid, setisEmailValid] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  /**
   * Email validation
   */
  const handleEmail = (text) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setemail(text);
    if (emailRegex.test(text)) {
      setisEmailValid(true);
    } else {
      setisEmailValid(false);
    }
  };

  /**
   * SEND RESET PASSWORD LINK
   */
  const handleReset = () => {
    if (isEmailValid) {
      setisLoading(true);
      sendPasswordResendLink(
        email,
        () => {
          setisLoading(false);
          props.navigation.navigate(SCREENS.SIGNIN);
        },
        () => setisLoading(false)
      );
    } else {
      showFlash("Enter a valid email address", "warning");
    }
  };

  return (
    <Background source={require("@images/authBg.png")}>
      <Layout fixed={true}>
        {/* AUTH BRANDING AND PAGE TITLE */}
        <View style={commonStyles._authBrandingContainer}>
          <Branding size={hp(12)} />
          <Label fontSize={hp(2.3)}>Forgot Password</Label>
        </View>
        {/* END */}
        <Label fontSize={hp(1.6)} style={{ marginVertical: hp(1) }}>
          {`Opps. It happens to the best of us. Input your\n email address to fix the issue.`}
        </Label>

        <CustomInput
          styles={{ marginTop: hp(2), marginBottom: hp(1) }}
          placeholder={"Enter your email address"}
          onChange={(txt) => handleEmail(txt)}
          keyboardType={'email'}
        />

        <AuthButton
          title={"Submit"}
          onpress={() => handleReset()}
          isLoading={isLoading}
        />
      </Layout>
    </Background>
  );
};

export default ForgotPassword;
