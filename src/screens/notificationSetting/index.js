import { View, ScrollView } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { CurveHeader, Label, } from '@components'
import styles from './styles'
import { hp, COLORS, FONTS, wp } from '@utils/common'
import { useSelector } from 'react-redux'
import ToggleSwitch from 'toggle-switch-react-native'
import { AppContext } from '@contexts/appContext'
import { AuthContext } from 'contexts/authContext'
import { collections } from '@constants/collections';
import { getAllOfCollectionwhere, saveData } from '@services/firebaseServices';


const NotificationSettings = (props) => {
    const theme = useSelector((state) => state.themeReducer.theme)
    const { settings, getSettings } = useContext(AppContext)
    const { userData } = useContext(AuthContext)
    const [isOn, setisOn] = useState(false)
    const [generalNotification, setgeneralNotification] = useState(false)
    const [sound, setsound] = useState(false)
    const [vibrate, setvibrate] = useState(false)
    const [appUpdates, setappUpdates] = useState(false)
    const [billReminder, setbillReminder] = useState(false)
    const [promotion, setpromotion] = useState(false)
    const [discounts, setdiscounts] = useState(false)
    const [paymentRequest, setpaymentRequest] = useState(false)
    const [newQuiz, setnewQuiz] = useState(false)
    const [newTip, setnewTip] = useState(false)
    const [refreshHandler, setrefreshHandler] = useState(false)

    let notifications = [
        { title: 'General Notification', state: generalNotification, toggle: (val) => setgeneralNotification(val) },
    ]

    // let services = [
    //     { title: 'App updates', state: appUpdates, toggle: (val) => setappUpdates(val) },
    //     { title: 'Bill Reminder', state: billReminder, toggle: (val) => setbillReminder(val) },
    //     { title: 'Promotion', state: promotion, toggle: (val) => setpromotion(val) },
    //     { title: 'Discount Available', state: discounts, toggle: (val) => setdiscounts(val) },
    //     { title: 'Payment request', state: paymentRequest, toggle: (val) => setpaymentRequest(val) },
    // ]

    let others = [
        { title: 'New Quiz Available', state: newQuiz, toggle: (val) => setnewQuiz(val) },
        { title: 'New Tips Available', state: newTip, toggle: (val) => setnewTip(val) },
    ]


    /**
     * GET SETTINGS
     */
    useEffect(() => {
        getNotifcationStates()
    }, [refreshHandler]);

    const getNotifcationStates = async () => {
        let response = [];
        response = await getAllOfCollectionwhere(
            collections.settings,
            'user',
            userData.uid,
        );
        let notiStates = response.length > 0 ? response[0] : settings;
        setgeneralNotification(notiStates.generalNotification)
        setsound(notiStates.sound)
        setvibrate(notiStates.vibrate)
        setappUpdates(notiStates.appUpdates)
        setbillReminder(notiStates.billReminder)
        setpromotion(notiStates.promotion)
        setdiscounts(notiStates.discounts)
        setpaymentRequest(notiStates.paymentRequest)
        setnewQuiz(notiStates.newQuiz)
        setnewTip(notiStates.newTip)
    }

    /*** END ***/

    /**
    * SET SETTINGS
    */
    const toggle = async (key, value) => {
        switch (key) {
            case "General Notification":
                await saveData(collections.settings, userData.uid, {
                    generalNotification: value,
                });
                setrefreshHandler(!refreshHandler)
                break;
            case "Promotion":
                await saveData(collections.settings, userData.uid, {
                    promotion: value,
                });
                (!refreshHandler)
                break;
            case "New Quiz Available":
                await saveData(collections.settings, userData.uid, {
                    newQuiz: value,
                });
                setrefreshHandler(!refreshHandler)
                break;
            case "New Tips Available'":
                await saveData(collections.settings, userData.uid, {
                    newQuiz: value,
                });
                setrefreshHandler(!refreshHandler)
                break;
            default:
                break;
        }
    }
    /*** END ***/

    return (
        <View style={styles.main}>
            <CurveHeader
                title={'Notifications'}
                onLeftPress={() => props.navigation.goBack()}
            />
            {/* CONTEXT */}
            <ScrollView>
                <View style={[styles.itemContainer, { paddingTop: hp(3.2) }]}>
                    <Label style={{ color: COLORS._333333, fontSize: hp(2.2) }}>Notifications</Label>
                    {
                        notifications.map((setting, index) => (
                            <View style={styles.row} key={index}>
                                <Label style={{ color: COLORS._333333, fontSize: hp(1.7) }}>{setting.title}</Label>
                                <ToggleSwitch
                                    isOn={setting.state}
                                    onColor={theme.appColor}
                                    offColor={COLORS._C2C2C2}
                                    size="small"
                                    onToggle={isOn => {toggle(setting.title, isOn); setting.toggle(isOn)}}
                                />
                            </View>
                        ))
                    }
                </View>

                <View style={styles.line}></View>

                {/* <View style={styles.itemContainer}>
                    <Label style={{ color: COLORS._333333, fontSize: hp(2.2) }}>System & services update</Label>
                    {
                        services.map((setting, index) => (
                            <View style={styles.row} key={index}>
                                <Label style={{ color: COLORS._333333, fontSize: hp(1.7) }}>{setting.title}</Label>
                                <ToggleSwitch
                                    isOn={setting.state}
                                    onColor={theme.appColor}
                                    offColor={COLORS._C2C2C2}
                                    size="small"
                                    onToggle={isOn => {toggle(setting.title, isOn); setting.toggle(isOn)}}
                                />
                            </View>
                        ))
                    }
                </View> */}

                {/* <View style={styles.line}></View> */}

                <View style={styles.itemContainer}>
                    <Label style={{ color: COLORS._333333, fontSize: hp(2.2) }}>Others</Label>
                    {
                        others.map((setting, index) => (
                            <View style={styles.row} key={index}>
                                <Label style={{ color: COLORS._333333, fontSize: hp(1.7) }}>{setting.title}</Label>
                                <ToggleSwitch
                                    isOn={setting.state}
                                    onColor={theme.appColor}
                                    offColor={COLORS._C2C2C2}
                                    size="small"
                                    onToggle={isOn => {toggle(setting.title, isOn); setting.toggle(isOn)}}
                                />
                            </View>
                        ))
                    }
                </View>

            </ScrollView>
        </View>
    )
}

export default NotificationSettings