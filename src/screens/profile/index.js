import { View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { CurveHeader, Label, MenuItem } from '@components'
import styles from './styles'
import { hp, COLORS } from '@utils/common'
import Feather from 'react-native-vector-icons/Feather'
import { commonStyles } from '@styles/commonStyles'
import ToggleSwitch from 'toggle-switch-react-native'
import PrefManager from '@data/local/PrefManager';
import { useSelector, useDispatch } from 'react-redux';
import { themeReducer, } from '@data/local/store/actions';
import { SCREENS } from '@navigation/routes'
import { AuthContext } from '@contexts/authContext'
import { logout } from '../../services/firebaseServices'
import { darkTheme, lightTheme } from '@assets/theme';
import { onShare } from '@utils/myUtils';
import InAppReview from 'react-native-in-app-review';

const Profile = (props) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    const { userData, setuserData, defaultAvatar } = useContext(AuthContext)
    const [toggle, setToggle] = useState(false);
    const prefManager = new PrefManager();
    const dispatch = useDispatch();
    const settings = [
        {
            image: require('@images/icons/account.png'),
            title: 'My Account ',
            subtle: 'Make changes to your account',
            onPress: () => { props.navigation.navigate(SCREENS.EDIT_PROFILE) }
        },
        {
            image: require('@images/icons/notification.png'),
            title: 'Notifications',
            subtle: 'Manage your notifications at ease',
            onPress: () => { props.navigation.navigate(SCREENS.NOTIFICATION_SETTINGS) }
        },
       
        {
            image: require('@images/icons/help.png'),
            title: 'Help',
            subtle: 'Help center, contact us, privacy policy',
            onPress: () => {props.navigation.navigate(SCREENS.HELP_SCREEN)}
        },
        // {
        //     image: require('@images/icons/logout.png'),
        //     title: 'Quiz Entry',
        //     subtle: 'Further secure your account for safety',
        //     onPress: () => {
        //         props.navigation.navigate(SCREENS.QUIZ_ENTRY)
        //     }
        // },
        {
            image: require('@images/icons/logout.png'),
            title: 'Log out',
            subtle: 'Further secure your account for safety',
            onPress: () => {
                logout(() => setuserData(null))
            }
        },
    ]

    const onRateApp = () => {
      InAppReview.isAvailable();

        // trigger UI InAppreview
        InAppReview.RequestInAppReview()
        .then((hasFlowFinishedSuccessfully) => {
            // when return true in android it means user finished or close review flow
            console.log('InAppReview in android', hasFlowFinishedSuccessfully);

            // when return true in ios it means review flow lanuched to user.
            console.log(
            'InAppReview in ios has launched successfully',
            hasFlowFinishedSuccessfully,
            );

            // 1- you have option to do something ex: (navigate Home page) (in android).
            // 2- you have option to do something,
            // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

            // 3- another option:
            if (hasFlowFinishedSuccessfully) {
            // do something for ios
            // do something for android
            }

            // for android:
            // The flow has finished. The API does not indicate whether the user
            // reviewed or not, or even whether the review dialog was shown. Thus, no
            // matter the result, we continue our app flow.

            // for ios
            // the flow lanuched successfully, The API does not indicate whether the user
            // reviewed or not, or he/she closed flow yet as android, Thus, no
            // matter the result, we continue our app flow.
        })
        .catch((error) => {
            //we continue our app flow.
            // we have some error could happen while lanuching InAppReview,
            // Check table for errors and code number that can return in catch.
            console.log(error);
        });
    }

    /**
    * Theme Handlet
    */
    const activeTheme = theme => {
        dispatch(themeReducer(theme));
        prefManager.setTheme(theme);
    };

    useEffect(() => {
        prefManager.getTheme(theme => {
            dispatch(themeReducer(theme));
        });

        if (theme.mode == 'dark') {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }, []);

    /*** End ***/

    return (
        <View style={styles.main}>
            <CurveHeader
                title={'Profile'}
                menu={true}
                onLeftPress={() => props.navigation.goBack()}
            />
            {/* CONTEXT */}
            <ScrollView>
                <View style={{ flex: 1, paddingTop: hp(2.5) }}>
                    {/* Profile */}
                    <View style={[styles.itemContainer]}>
                        <View style={commonStyles._rowContainer}>
                            <Image
                                source={{ uri: userData?.profileImage || defaultAvatar }}
                                style={styles.image}
                            />
                            <View>
                                <Label style={{ color: COLORS._7C7C7C, top: 2 }} fontSize={hp(2)}>
                                    {userData?.name || 'Fullname'}</Label>
                                <Label style={{ color: COLORS._D7D7D7, top: -2, textAlign: 'left' }} fontSize={hp(1.6)}>
                                    {userData?.name || '@username'}</Label>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREENS.EDIT_PROFILE)}>
                            <Feather name='edit-3' size={hp(2.5)} color={COLORS._7C7C7C} />
                        </TouchableOpacity>
                    </View>

                    {/* STATICTICS */}
                    <View style={[styles.itemContainer, { marginVertical: hp(2) }]}>
                        <MenuItem
                            item={{
                                image: require('@images/icons/statistics.png'),
                                title: 'My Statistics',
                                subtle: 'Check your statistics and quiz levels'
                            }}
                            onpress={() => props.navigation.navigate(SCREENS.STATISTICS)}
                        />
                    </View>

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

                        <TouchableOpacity onPress={() => onShare()}>
                            <Label style={{ color: COLORS._7C7C7C, fontSize: hp(1.8), marginBottom: hp(1) }}>
                                Invite a friend
                            </Label>
                        </TouchableOpacity>
                    </View>
                    {/* END */}

                    {/* THEME SWITCH */}
                    <MenuItem
                        touchDisable={true}
                        item={{
                            image: require('@images/icons/theme.png'),
                            title: 'Dark Mode',
                            subtle: 'Switch to dark mode'
                        }}
                        style={{ width: '86%', alignSelf: 'center', marginBottom: hp(2.5), marginTop: hp(4.5) }}
                        Icon={<ToggleSwitch
                            isOn={toggle}
                            onColor={theme.appColor}
                            offColor={COLORS._C2C2C2}
                            size="small"
                            onToggle={() => {
                                if (toggle) {
                                    activeTheme(lightTheme);
                                } else {
                                    activeTheme(darkTheme);
                                }
                                setToggle(!toggle);
                            }}
                        />}
                    />

                    <MenuItem
                        item={{
                            image: require('@images/icons/rate.png'),
                            title: 'Rate this app',
                            subtle: 'Further secure your account for safety'
                        }}
                        style={{ width: '86%', alignSelf: 'center' }}
                        onpress={() =>onRateApp()}
                    />

                </View>
            </ScrollView>
        </View>
    )
}

export default Profile