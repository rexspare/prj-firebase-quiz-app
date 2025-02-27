import { SafeAreaView, Text, View } from "react-native";
import React, { useState, useContext } from "react";
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
import { LeftLine, RightLine } from "@assets/svg";
import { SocialButton } from "@components";
import { SCREENS } from "@navigation/routes";
import auth from "@react-native-firebase/auth";
import { showFlash, passwordStrength_ } from "@utils/myUtils";
import {
  registerWithEmail,
  getAllOfCollectionwhere,
  googleLogin,
  facebokkLogin,
  onAppleLogin,
  logout,
} from "@services/firebaseServices";
import { collections } from "@constants/collections";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKeys } from "@constants/storageKeys";
import { AuthContext } from "@contexts/authContext";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import firestore from "@react-native-firebase/firestore";
const SignUp = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [confrimPassword, setconfrimPassword] = useState("");
  const [isEmailValid, setisEmailValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
  const { setuserData, getUser, isSigningUp, setisSigningUp, otp, setOtp } =
    useContext(AuthContext);

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
   * Phone Number validation
   */

  const handlePhoneNumber = (text) => {
    const phoneRegex =  /^\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/
    // /^[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}$/;
    // /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    // /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
    setphone(text);
    if(phoneRegex.test(text)){
      console.log("Hello")
      setIsPhoneNumberValid(true);
    }else{
      console.log("Hi")
      setIsPhoneNumberValid(false);
    }
  }
    // *****
  // REGISTER WITH EMAIL AND PASSWORD
  // *****
  const register = async () => {
    console.log("Is Phone Number Valid", isPhoneNumberValid)
    // handlePhoneNumber()
 
    if (
      isEmailValid &&
      email != "" &&
      isPhoneNumberValid &&
      phone != "" &&
      password != "" &&
      password == confrimPassword &&
      passwordStrength_(password)
    ) {
      setisLoading(true);
      // Check if phone alreay exists
      let exists = await getAllOfCollectionwhere(
        collections.users,
        "phone",
        phone
      );
      if (exists.length == 0) {
        setisSigningUp(true);
        registerWithEmail(
          email,
          password,
          phone,
          (mUser) => {
            showFlash("Sending verification code to phone");
            auth()
              .verifyPhoneNumber(phone, true)
              .then((confirmation) => {
                AsyncStorage.setItem(
                  storageKeys.CONFIRMATION_CODE,
                  JSON.stringify(confirmation)
                ).then(() => {
                  console.log("============== CODE =======================");
                  console.log(confirmation);
                  setOtp(confirmation)
                  console.log("====================================");
                  setisLoading(false);
                  setuserData(mUser);
                });
              });
          },
          () => {
            setisLoading(false);
          }
        );
      } else {
        showFlash("Phone already exists", "danger");
        setisLoading(false);
        return;
      }
    } else {
      if (!isEmailValid || email == "") {
        showFlash("Email must be valid", "warning");
        return;
      } else if (!isPhoneNumberValid || phone == "") {
        showFlash("phone number must be valid* +12025550179", "warning");
        return;
      }else if (password == "" || !passwordStrength_(password)) {
        showFlash("Enter a strong password", "warning");
        return;
      } else if (password != confrimPassword) {
        showFlash("passwords do not match", "warning");
        return;
      }
    }
  };
  // ***** END *****

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

  /**
   * APPLE LOGIN
   */

  const handleAppleLogin = async() => {
    // onAppleLogin(
    //   (user) => setuserData(user),
    //   (uid) => getUser(uid),
    //   setisLoading
    // )
    
      const appleAuthReqRes = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      if (!appleAuthReqRes.identityToken) {
        throw new Error("Apple Signin failed - no identify token returned");
      }
      const { identityToken, nonce } = appleAuthReqRes;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
      );
      return auth()
        .signInWithCredential(appleCredential)
        .then(async (res) => {
          console.log("Response Apple", res);
          if (res)
            await firestore().collection('users').doc(res.user.uid).set({
              id: res.user.uid,
              email: res.user.email,
              userName: res.user.displayName || "",
              phone: res.user?.phoneNumber || "",
              createdAt: firestore.FieldValue.serverTimestamp(),
              lastUpdatedAt: firestore.FieldValue.serverTimestamp(),
              isPhoneVerified: true,
              authProvider: "Apple",
              score: 0,
            });
        });
  
  }

  return (
  // <SafeAreaView style={{flex: 1}}>
      <Background source={require("@images/authBg.png")}>
      <Layout fixed={true}>
        {/* AUTH BRANDING AND PAGE TITLE */}
        <View style={commonStyles._authBrandingContainer}>
          <Branding size={hp(12)} />
          <Label fontSize={hp(2.3)}>Register</Label>
        </View>
        {/* END */}

        {/* INOUT FIELDS */}
        <CustomInput
          placeholder={"Enter your email"}
          onChange={(txt) => handleEmail(txt)}
        />
        <CustomInput
          placeholder={"+12025550179"}
          onChange={(txt) => handlePhoneNumber(txt)}
          keyboardType={"phone-pad"}
        />
        <CustomInput
          placeholder={"Password"}
          isPassword={true}
          onChange={(txt) => setpassword(txt)}
        />
        <CustomInput
          placeholder={"Confirm Password"}
          isPassword={true}
          onChange={(txt) => setconfrimPassword(txt)}
        />
        {/* END */}

        <AuthButton
          title={"Register"}
          onpress={() => register()}
          isLoading={isLoading}
          disabled={isLoading ? true : false}
        />

        <View style={[commonStyles._rowContainer, { marginTop: hp(2.5) }]}>
          <Label fontSize={hp(1.5)} style={{ color: COLORS._FFFFFF }}>
            if you have already account{" "}
          </Label>
          <TextButton
            title={"click here"}
            textStyles={{ color: COLORS._0349FE }}
            onpress={() => {
              props.navigation.navigate(SCREENS.SIGNIN);
            }}
          />
        </View>

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
          <Label fontSize={hp(1.5)} color={'#fff'}>Or Sign up With</Label>
          <RightLine width={wp(35)} />
        </View>

        <View style={[commonStyles._rowContainer, { marginTop: hp(2) }]}>
          <SocialButton onpress={() => handleGoogleLogin()} />
          <SocialButton type="facebook" onpress={() => handleFacebookLogin()} />
          <SocialButton type="apple" onpress={() => handleAppleLogin()} />
          {/* <SocialButton type='linkedin' onpress={() => logout()} /> */}
        </View>
      </Layout>
    </Background>
  // </SafeAreaView>
  );
};

export default SignUp;
