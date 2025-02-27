import { Image, Text, View } from 'react-native'
import React from 'react'
import { Background, Layout } from '@components'
import { CustomInput, Branding, Label, AuthButton, TextButton } from '@components'
import { commonStyles } from '@styles/commonStyles'
import { hp, COLORS, wp, width } from '@utils/common'
import { SCREENS } from '@navigation/routes'

const ResetPassword = (props) => {
    return (
        <Background source={require("@images/authBg.png")}>
            <Layout fixed={true}>
                {/* AUTH BRANDING AND PAGE TITLE */}
                <View style={commonStyles._authBrandingContainer}>
                    <Branding size={hp(12)} />
                    <Label fontSize={hp(2.3)}>Set New Password</Label>
                </View>
                {/* END */}

                <Label fontSize={hp(1.6)} style={{ marginVertical: hp(1) }}>
                    {`Enter your new password to complete this\naccount recovery`}</Label>


                {/* INOUT FIELDS */}
                <CustomInput placeholder={"Enter new password"} />
                <CustomInput placeholder={"Confirm password"} />
                {/* END */}


                <AuthButton 
                title={"Submit Password"} 
                onpress={() => props.navigation.navigate(SCREENS.SIGNIN)} />

                <View style={[commonStyles._rowContainer, { marginTop: hp(2.5) }]}>
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

export default ResetPassword
