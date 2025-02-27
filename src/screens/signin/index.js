import { Image, Text, View } from "react-native";
import React, { useState, useRef } from "react";
import { Background, Layout } from "@components";
import {
  CustomInput,
  Branding,
  Label,
  AuthButton,
  TextButton,
  SocialButton
} from "@components";
import { commonStyles } from "@styles/commonStyles";
import { hp, COLORS, wp, widt, FONTS } from "@utils/common";
import { SCREENS } from "@navigation/routes";
import { 
  loginWithEmail,
  logout,
  googleLogin,
  facebokkLogin
} from "@services/firebaseServices";
import { showFlash } from "../../utils/myUtils";
import LinkedInModal from "react-native-linkedin";
import  KeyboardAvoidWrapper  from "../../components/KeyboardAvoidWrapper";
import { width } from "../../utils/common";
// import { hp, COLORS, wp, width } from "@utils/common";
import { LeftLine, RightLine } from "@assets/svg";
// import { SocialButton } from "@components";

const SignIn = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isEmailValid, setisEmailValid] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const linkedRef = useRef();
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

  const handleLogin = async () => {
    if (isEmailValid && password != "") {
      setisLoading(true);
      loginWithEmail(email, password, () => setisLoading(false));
    } else {
      if (!isEmailValid) {
        showFlash("emai is invalid", "warning");
        return;
      } else {
        showFlash("email or password cannot be empty", "warning");
        return;
      }
    }
  };

   // *****
  // SIGNIN WITH GOOGLE CREDS
  // *****

  const handleGoogleLogin = async () => {
    googleLogin(
      (user) => setuserData(user),
      (uid) => getUser(uid),
      setisLoading
    );
  };

  // ***** END *****

  // *****
  // SIGNIN WITH GOOGLE CREDS
  // *****

  const handleFacebookLogin = async () => {
    facebokkLogin(
      (user) => setuserData(user),
      (uid) => getUser(uid),
      setisLoading
    );
  };

  // ***** END *****

  return (
    <Background source={require("@images/authBg.png")}>
   <KeyboardAvoidWrapper style={{flex:1}}>
   <Layout fixed={false}>
      {/* AUTH BRANDING AND PAGE TITLE */}
      <View style={commonStyles._authBrandingContainer}>
        <Branding size={hp(12)} />
        <Label fontSize={hp(2.3)}>Login</Label>
      </View>
      {/* END */}

      <Image
        source={require("@images/login.png")}
        style={{ width: wp(32), height: hp(20), alignSelf: "center" }}
        resizeMode="contain"
      />

      {/* INOUT FIELDS */}
      <CustomInput
        placeholder={"Enter your email"}
        onChange={(txt) => handleEmail(txt)}
      />
      <CustomInput
        placeholder={"Password"}
        isPassword={true}
        onChange={(txt) => setpassword(txt)}
      />
      {/* END */}

      <View
        style={{ width: "88%", alignItems: "flex-end", paddingTop: hp(1) }}
      >
        <TextButton
          title={"Forgot Password"}
          textStyles={{ color: COLORS._FFFFFF, marginBottom: -5 }}
          onpress={() => props.navigation.navigate(SCREENS.FORGOT_PASSWORD)}
        />
      </View>

      <AuthButton
        title={"Login"}
        onpress={() => handleLogin()}
        textStyles={{ fontFamily: FONTS.Poppins_700 }}
        isLoading={isLoading}
        disabled={isLoading ? true : false}
      />
        {/* SOCIAL BUTTON */}
        <View
          style={[
            commonStyles._rowContainer,
            {
              width: width,
              justifyContent: "space-between",
              marginTop: hp(2.5),
            },
          ]}
        >
          <LeftLine width={wp(35)} />
          <Label fontSize={hp(1.5)}>Or Sign in With</Label>
          <RightLine width={wp(35)} />
        </View>

        <View style={[commonStyles._rowContainer, { marginTop: hp(2) }]}>
          <SocialButton onpress={() => handleGoogleLogin()} />
          <SocialButton type="facebook" onpress={() => handleFacebookLogin()} />
          {/* <SocialButton type='linkedin' onpress={() => logout()} /> */}
        </View>

      <View style={[commonStyles._rowContainer, { marginTop: hp(2.5) }]}>
        <Label fontSize={hp(1.5)} style={{ color: COLORS._FFFFFF }}>
          You Don’t have an account?{" "}
        </Label>
        <TextButton
          title={"Register here"}
          textStyles={{ color: COLORS._0349FE }}
          onpress={() => props.navigation.navigate(SCREENS.SIGNUP)}
        />
      </View>
      
    </Layout>
   </KeyboardAvoidWrapper>
   </Background>
   
  );
};

export default SignIn;
