import { Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const FONTS = {
  Ubuntu_700: 'Ubuntu-Bold',
  Poppins_900: 'Poppins-Black',
  Poppins_800: 'Poppins-ExtraBold',
  Poppins_700: 'Poppins-Bold',
  Poppins_600: 'Poppins-SemiBold',
  Poppins_500: 'Poppins-Medium',
  Poppins_400: 'Poppins-Regular',
  Poppins_300: 'Poppins-Light',
  Poppins_200: 'Poppins-ExtraLight',
  Poppins_100: 'Poppins-Thin',
};

const COLORS = {
  _063861: "#063861",
  _333333: "#333333",
  _FFFFFF: "#FFFFFF",
  _DDDDDD: "#DDDDDD",
  _F3982F: "#F3982F",
  _0349FE: "#0349FE",
  _000000: "#000000",
  _C2C2C2: "#C2C2C2",
  _999999: "#999999",
  _F2C94C: "#F2C94C",
  _78DED4: "#78DED4",
  _D4D4D4: "#D4D4D4",
  _F7F7F7: "#F7F7F7",
  _E0E0E0: "#E0E0E0",
  _7C7C7C: "#7C7C7C",
  _D7D7D7: "#D7D7D7",
  _ABABAB: "#ABABAB",
  _E5E5E5: "#E5E5E5",
  _E4F6F3: "#E4F6F3",
  _6AC3BB: "#6AC3BB"
};


export {
  width,
  height,
  wp,
  hp,
  FONTS,
  COLORS
}