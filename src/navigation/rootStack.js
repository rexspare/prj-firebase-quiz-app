import { View, Text } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from './routes';
import OnBoarding from '@screens/onboarding';
import SignUp from '@screens/signup';
import Verification from '@screens/verification';
import SignIn from '@screens/signin';
import Home from '@screens/home';
import Detail from '@screens/detail';
import Quiz from '@screens/quiz';
import Profile from '@screens/profile';
import ForgotPassword from '@screens/forgotPassword';
import PasswordOtp from '@screens/verification/passwordOtp';
import ResetPassword from '@screens/resetPassword';
import Statistics from '@screens/statistics';
import EditProfile from '@screens/editProfile';
import NotificationSettings from '@screens/notificationSetting';
import LeaderBoard from '@screens/leaderBoard';
import { AuthContext } from '@contexts/authContext';
import auth from '@react-native-firebase/auth';
import Contact from '../screens/contact';
import Help from '../screens/help';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import FAQ from '../screens/FAQ';
import QuizEnteries from '../screens/quizEntries';
import SelectCategory from '../screens/selectCategory';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const { setUser, userData } = useContext(AuthContext)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }} >
        {
          !userData || userData?.isPhoneVerified == false ? (
            <>
              {userData?.isPhoneVerified == false ? (
                <>
                  < Stack.Screen name={SCREENS.VERIFICATION} component={Verification} />
                </>
              ) : (
                <>
                  <Stack.Screen name={SCREENS.ONBOARDING} component={OnBoarding} />
                  <Stack.Screen name={SCREENS.SIGNUP} component={SignUp} />
                  <Stack.Screen name={SCREENS.SIGNIN} component={SignIn} />

                </>
              )}
            </>
          ) : (
            <>
              <Stack.Screen name={SCREENS.HOME} component={Home} />
              <Stack.Screen name={SCREENS.DETAIL} component={Detail} />
              <Stack.Screen name={SCREENS.QUIZ} component={Quiz} />
              <Stack.Screen name={SCREENS.PROFILE} component={Profile} />
              <Stack.Screen name={SCREENS.STATISTICS} component={Statistics} />
              <Stack.Screen name={SCREENS.EDIT_PROFILE} component={EditProfile} />
              <Stack.Screen name={SCREENS.NOTIFICATION_SETTINGS} component={NotificationSettings} />
              <Stack.Screen name={SCREENS.LEADER_BOARD} component={LeaderBoard} />
              <Stack.Screen name={SCREENS.CONTACT_SCREEN} component={Contact} />
              <Stack.Screen name={SCREENS.HELP_SCREEN} component={Help} />
              <Stack.Screen name={SCREENS.PRIVACY_POLICY} component={PrivacyPolicy} />
              <Stack.Screen name={SCREENS.FAQ} component={FAQ} />
              <Stack.Screen name={SCREENS.QUIZ_ENTRY} component={QuizEnteries} />
              <Stack.Screen name={SCREENS.SELECT_CATEGORY} component={SelectCategory} />
            </>
          )}
        <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotPassword} />
        <Stack.Screen name={SCREENS.PASSWORD_OTP} component={PasswordOtp} />
        <Stack.Screen name={SCREENS.RESET_PASSWORD} component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack




