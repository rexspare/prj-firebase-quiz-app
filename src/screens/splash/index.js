import { StyleSheet, ImageBackground, StatusBar,View} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AnimatedSplash from 'react-native-animated-splash-screen';
import RootStack from '@navigation/rootStack'
import PrefManager from '@data/local/PrefManager';
import { useSelector, useDispatch } from 'react-redux';
import { themeReducer, } from '@data/local/store/actions';
import { AuthContext } from '@contexts/authContext';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, hp as FS_height, width, height } from '@utils/common';
import { Branding, GradientButton } from '@components';
import { hp } from '../../utils/common';


const prefManager = new PrefManager();

const Splash = () => {
    const theme = useSelector((state) => state.themeReducer.theme)
    const dispatch = useDispatch();
    const { setUser, userData } = useContext(AuthContext)
    const [isLoaded, setisLoaded] = useState(false);

    useEffect(() => {
        prefManager.getTheme(theme => {
            dispatch(themeReducer(theme));
        });
        try {
            auth().onAuthStateChanged(function (user) {
                console.log('====================================');
                console.log(user);
                console.log('====================================');
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
            });
        } catch (error) {
            console.log("Splash Screen===>>>", error);
        }

        setTimeout(() => {
            setisLoaded(true)
        }, 1500);
    }, []);

    const Screen = () => {
        return (
            <View style={{ width : width , height :height}}>
                <StatusBar
                    backgroundColor={"transparent"}
                    translucent
                />
                <LinearGradient
                    colors={[...theme.gradient]}
                    start={{ x: 0.5, y: 0 }} end={{ x: 1, y: 1 }}
                    style={{ flex: 1, paddingBottom: height * 0.04 }}>
                    <ImageBackground
                        source={require('@images/onboarding/onboardingBg.png')}
                        style={{ flex: 1, justifyContent:'center'}}
                    >
                        <Branding size={hp(16)}/>
                        
                    </ImageBackground>
                </LinearGradient>
            </View>
        )
    }

    return (
        <AnimatedSplash
            translucent={false}
            isLoaded={isLoaded}
            customComponent={<Screen />}
            backgroundColor={theme.appColor}>
            <RootStack />
        </AnimatedSplash>
    )
}

export default Splash

const styles = StyleSheet.create({})