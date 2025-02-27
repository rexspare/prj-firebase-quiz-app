import { Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Background, Layout } from "@components";
import { Branding, Label, AuthButton, TextButton } from "@components";
import { commonStyles } from "@styles/commonStyles";
import { hp, COLORS, wp, width } from "@utils/common";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { SCREENS } from "@navigation/routes";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@contexts/authContext";
import { saveData } from "@services/firebaseServices";
import { collections } from "@constants/collections";
import { showFlash } from "@utils/myUtils";
import { storageKeys } from "@constants/storageKeys";
const Verification = (props) => {
  const [isCode, setisCode] = React.useState(null);
  const [code, setcode] = React.useState("");
  const [confirm, setconfirm] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { userData, setuserData, setisSigningUp, otp, setOtp } = useContext(AuthContext);
  const sendOtp = async () => {
    // getValue();
    let phone = props.route.params
      ? props?.route?.params?.phone
      : userData?.phone;
    console.log(phone, "phone is");
    auth()
      .verifyPhoneNumber(phone, true)
      .then((confirmation) => {
        setconfirm(confirmation);
        setisCode(confirmation);
      });
  };

  // const getValue = async () => {
  //   AsyncStorage.getItem(
  //     storageKeys.CONFIRMATION_CODE
  //     // JSON.parse(storageKeys.CONFIRMATION_CODE)
  //   ).then((res) => {
  //     console.log("============== CODE =======================");
  //     console.log(res);
  //     console.log("====================================");
  //   });
  // };

  /**
   * verify OTP function
   */
  const confirmCode = async () => {
    console.log("===>>>", confirm?.verificationId || confirm?.token);
    setisLoading(true);
    // alert(code);
    try {
      const credential = auth.PhoneAuthProvider.credential(
        confirm?.verificationId || confirm?.token,
        code
      );
      await auth().currentUser.linkWithCredential(credential);
      await saveData(collections.users, auth()?.currentUser?.uid, {
        isPhoneVerified: true,
      });
      AsyncStorage.removeItem(storageKeys.CONFIRMATION_CODE).then(() => {
        setisSigningUp(false);
        setuserData({ ...userData, isPhoneVerified: true });
      });
    } catch (error) {
      setisLoading(false);
      console.log("=====>>>>>", error);
      if (error.code == "auth/invalid-verification-code") {
        showFlash("Invalid Code", "warning");
      } else {
        showFlash(
          "Number might be already register please use other phone number to register user",
          "warning"
        );
      }
    }
    setisLoading(false);
  };
  // **** END ****
  useEffect(() => {
    AsyncStorage.getItem(storageKeys.CONFIRMATION_CODE).then((data) => {
      if (data) {
        const pData = JSON.parse(data);
        setconfirm(pData);
        setisCode(pData);
        // alert(JSON.stringify(pData))
      } else {
        sendOtp();
      }
    });
  }, []);
  return (
    <Background source={require("@images/authBg.png")}>
      <Layout fixed={true}>
        {/* AUTH BRANDING AND PAGE TITLE */}
        <View style={commonStyles._authBrandingContainer}>
          <Branding size={hp(12)} />
          <Label fontSize={hp(2.3)}>OTP</Label>
        </View>
        {/* END */}
        <Label
          fontSize={hp(1.5)}
          style={{ color: COLORS._FFFFFF, marginTop: hp(3.5) }}
        >
          Enter your 6 digit OTP here
        </Label>
        <OTPInputView
          pinCount={6}
          style={{ width: wp(35), height: 50, alignSelf: "center" }}
          handleChange={(code) => setcode(code)}
          codeInputFieldStyle={{
            width: wp(4),
            height: 45,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: COLORS._000000,
          }}
          onCodeChanged={(code) => {
            setcode(code);
          }}
          autoFocusOnLoad={false}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <AuthButton
          title={"Login"}
          isLoading={isLoading}
          onpress={() => confirmCode()}
          disabled = {isLoading ? true : false}
        />
        <View style={[commonStyles._rowContainer, { marginTop: hp(10.5) }]}>
          <Label fontSize={hp(1.5)} style={{ color: COLORS._FFFFFF }}>
            Didn't get the code?{" "}
          </Label>
          <TextButton
            title={"Resend"}
            textStyles={{ color: COLORS._0349FE }}
            onpress={() => sendOtp()}
          />
        </View>
      </Layout>
    </Background>
  );
};
export default Verification;
