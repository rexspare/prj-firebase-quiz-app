import { showMessage, hideMessage } from "react-native-flash-message";
import { passwordStrength } from 'check-password-strength';
import { FONTS } from "./common";
import { Platform, Share } from "react-native";
import { CommonActions } from '@react-navigation/native';


const showFlash = (message, type = 'success', icon = "none", floating = false) => {
  showMessage({
    message: message,
    type: type,
    icon: icon,
    floating: true,
    textStyle: { fontFamily: FONTS.Poppins_400 },
    titleStyle: { fontFamily: FONTS.Poppins_400 },
    style: { marginTop: Platform.OS === 'ios' ? 30 : 10 }
  });
}

const getUnixDate = () => {
  var date = new Date();
  date.setDate(date.getDate());
  const unixDate = Math.floor(new Date(date) / 1000)
  return unixDate
}

const passwordStrength_ = (txt, callBack) => {
  const strength = passwordStrength(txt).id;
  if (strength > 1) {
    return true;
  } else {
    return false;
  }
};

const getQuizTime = (time) => {
  let hour = parseInt(time / 60)
  let minutes = parseInt(time % 60)
  if (hour > 0) {
    return `${hour} hour ${minutes} min`
  } else {
    return `${minutes} min`
  }
}


const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const nextChar = (count) => {
  const initail = 'A'
  let char = 'A'

  for (let index = 0; index < count; index++) {
    char = String.fromCharCode(char.charCodeAt(0) + 1);
  }

  return char
}

const resetAndGo = (navigation, routeName, routeParams) => {
  if (navigation && routeName) {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: routeName,
            params: routeParams ? routeParams : {},
          },
        ],
      }),
    );
  }
};


export {
  showFlash,
  getUnixDate,
  passwordStrength_,
  getQuizTime,
  onShare,
  nextChar,
  resetAndGo
}