import { Text, View } from 'react-native'
import React from 'react'
import { Background, Layout } from '@components'
import { Branding, Label, AuthButton, TextButton } from '@components'
import { commonStyles } from '@styles/commonStyles'
import { hp, COLORS, wp, width, FONTS } from '@utils/common'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { SCREENS } from '@navigation/routes'

const PasswordOtp = (props) => {
    return (
        <Background source={require("@images/authBg.png")}>
            <Layout fixed={true}>
                {/* AUTH BRANDING AND PAGE TITLE */}
                <View style={commonStyles._authBrandingContainer}>
                    <Branding size={hp(12)} />
                    <Label fontSize={hp(2.3)}>OTP Verification</Label>
                </View>
                {/* END */}
                <Label fontSize={hp(1.6)} style={{ marginVertical: hp(1) }}>
                    {`Enter the OTP code which we sent to your\nmobile number to verify this\naccount recovery`}</Label>


                <OTPInputView
                    pinCount={6}
                    style={{ width: wp(70), height: 50, alignSelf: 'center', marginTop: hp(1) }}
                    codeInputFieldStyle={{
                        width: wp(9.5),
                        height: 45,
                        borderWidth: 0,
                        backgroundColor: COLORS._FFFFFF,
                        borderRadius: 5,
                        fontSize: 25,
                        color: COLORS._063861,
                        fontFamily: FONTS.Poppins_500,
                        paddingBottom: 0
                    }}
                    onCodeChanged={code => { }}
                    autoFocusOnLoad={false}
                    onCodeFilled={(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                    placeholderCharacter="_"
                />
                <AuthButton
                    title={"Submit Verification"}
                    onpress={() => props.navigation.navigate(SCREENS.RESET_PASSWORD)}
                />

                <View style={[commonStyles._rowContainer, { marginTop: hp(3) }]}>
                    <Label fontSize={hp(1.5)} style={{ color: COLORS._FFFFFF }}>You Don’t have an account? </Label>
                    <TextButton
                        title={"Sign up"}
                        textStyles={{ color: COLORS._0349FE }}
                        onpress={() => props.navigation.navigate(SCREENS.SIGNUP)}
                    />
                </View>


            </Layout>
        </Background>
    )
}

export default PasswordOtp