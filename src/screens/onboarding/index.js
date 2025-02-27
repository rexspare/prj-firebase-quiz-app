import React, { useRef, useEffect } from "react";
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { COLORS, FONTS, hp as FS_height, width, height } from "@utils/common";
import { useSelector } from "react-redux";
import { SCREENS } from "@navigation/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { storageKeys } from '@constants/storageKeys'
import LinearGradient from "react-native-linear-gradient";
import { Branding, GradientButton } from "@components";

const slides = [
  {
    id: "1",
    image: require("@images/onboarding/_11.png"),
    title: "Learn\nnew concepts\neach minute",
  },
  {
    id: "2",
    image: require("@images/onboarding/_12.png"),
    title: "Test your brain",
  },
  {
    id: "3",
    image: require("@images/onboarding/onboardingBg.png"),
    title: "Member",
  },
];

const Slide = ({ item, theme, goToNextSlide }) => {
  const imageSize1 = {
    width: width * 0.88,
    height: width * 0.88,
    marginTop: height * 0.06,
  };
  const imageSize2 = {
    width: width * 0.92,
    height: width * 0.92,
    marginTop: -height * 0.06,
  };
  return (
    <View
      style={{
        width: width,
        alignItems: "center",
        paddingTop: item.id == "3" ? 0 : height * 0.09,
      }}
    >
      {item.id != "3" ? (
        <>
          <Text style={styles.title}>{item.title.toUpperCase()}</Text>
          {item.id === "2" && (
            <Image
              source={require("@images/onboarding/_12_1.png")}
              style={{
                width: width * 0.6,
                height: width * 0.5,
                opacity: 0.7,
              }}
            />
          )}
          <Image
            source={item.image}
            style={item.id == "1" ? imageSize1 : imageSize2}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={{
              width: FS_height(10),
              height: FS_height(10),
              position: "absolute",
              bottom: 0,
            }}
            activeOpacity={0.8}
            onPress={() => goToNextSlide()}
          >
            <Image
              source={require("@images/onboarding/arrow.png")}
              style={{ width: FS_height(8), height: FS_height(10) }}
            />
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{
            width: width,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Branding size={FS_height(26)} />
        </View>
      )}
    </View>
  );
};

const OnBoarding = ({ navigation }) => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    // const lastSlideIndex = slides.length - 1;
    // const offset = lastSlideIndex * width;
    // ref?.current.scrollToOffset({ offset });
    // setCurrentSlideIndex(lastSlideIndex);
    gotoApp();
  };

  const gotoApp = () => {
    // AsyncStorage.setItem(storageKeys.ONBOARDING_KEY, "true")
    //     .then(() => {
    navigation.replace(SCREENS.SIGNUP);
    // })
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.14,
          justifyContent: "space-around",
        }}
      >
        {/* Render buttons */}

        {currentSlideIndex == slides.length - 1 && (
          <GradientButton
            style={{ alignSelf: "center" }}
            title="Let’s Get Started"
            onpress={() => gotoApp()}
          />
        )}
      </View>
    );
  };

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity style={[styles.skipBtn]} onPress={skip}>
          <Text style={[styles.skipTxt, {}]}>SKIP</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={"transparent"} translucent />
      <LinearGradient
        colors={[...theme.gradient]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, paddingBottom: height * 0.04 }}
      >
        <ImageBackground
          source={require("@images/onboarding/onboardingBg.png")}
          style={{ flex: 1 }}
        >
          {/* <Header /> */}
          <FlatList
            ref={ref}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            contentContainerStyle={{
              marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={slides}
            pagingEnabled
            renderItem={({ item }) => (
              <Slide item={item} theme={theme} goToNextSlide={goToNextSlide} />
            )}
          />
          <Footer />
        </ImageBackground>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: FONTS.Inter_400,
    lineHeight: 20,
    marginTop: 3,
    fontSize: FS_height(2),
  },
  title: {
    fontFamily: FONTS.Poppins_500,
    textAlign: "center",
    fontSize: FS_height(2.6),
    color: COLORS._063861,
    marginLeft: 20,
    marginTop: 10
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  indicator: {
    height: 8,
    width: 8,
    backgroundColor: COLORS.primary_Light,
    marginHorizontal: 3,
    borderRadius: 4,
  },

  headerContainer: {
    height: 50,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  skipBtn: {
    width: 80,
    height: 50,
    // ...commonStyles._center,
  },
  skipTxt: {
    fontFamily: FONTS.Inter_500,
    fontSize: 15,
    color: COLORS.subtle,
  },
});
export default OnBoarding;
