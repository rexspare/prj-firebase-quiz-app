import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import {
  Gradient,
  AppHeader,
  CurveContainer,
  Label,
  QuestionSelector,
  GradientButton,
} from "@components";
import styles from "./styles";
import { COLORS, hp, wp, FONTS, width } from "@utils/common";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { commonStyles } from "@styles/commonStyles";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { answerOptions } from "../../data/dummies";
import { SCREENS } from "@navigation/routes";
import { AppContext } from "@contexts/appContext";
import { nextChar, resetAndGo, showFlash } from "@utils/myUtils";

const Quiz = (props) => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const [selectedAnswer, setselectedAnswer] = useState();
  const {
    seletctedQuiz,
    updateQuizAttemp,
    quizResponse,
    setquizResponse,
    submitQuiz,
    isLoading,
    getLeaderBoard
  } = useContext(AppContext);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [refreshState, setrefreshState] = useState(false);
  const ref = React.useRef();

  let time = seletctedQuiz?.time;
  var remainingTime = time;
  /**
   *  SCROLL ON BUTTON HANDLERS
   * **/

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round((contentOffsetX / width));
    setCurrentSlideIndex(currentIndex);
  };

  const goToSlide = (index) => {
    let slides = seletctedQuiz?.questionsList;
    const nextSlideIndex = index;
    if (nextSlideIndex != slides.length){
      const offset = nextSlideIndex * (width );
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(index);
    } else if (nextSlideIndex == slides.length) {
      submitQuiz(() => {
        resetAndGo(props.navigation, SCREENS.HOME);
        showFlash(
          "Your response have been saved successfully, you can access the results in statistics section of the app"
        );
        
      });
    }
  };

  /*** END ***/

  // const getQuestion = () => {
  //     let question_ = seletctedQuiz?.questionsList?.find((ques) => ques?.do_id == selectedQuestion?.do_id)
  //     setquestion(question_)
  // }

  const saveAnswer = (qIndex, aIndex) => {
    let responseArray = quizResponse;
    responseArray[qIndex] = aIndex;
    setquizResponse(responseArray);
    setrefreshState(!refreshState);
    updateQuizAttemp(remainingTime, responseArray, () => {});
  };

  return (
    <Gradient>
      <AppHeader
        leftText={seletctedQuiz?.title}
        onLeftPress={() => props.navigation.goBack()}
      />

      {/* BODY */}
      <CurveContainer style={{ flex: 1, marginTop: 8 }}>
        <View style={styles.CurveContainer}>
          {/* QUESTION NUMBER */}
          <QuestionSelector
            questions={seletctedQuiz?.questionsList}
            goToQuestion={(index) => goToSlide(index)}
            currentSlideIndex={currentSlideIndex}
            setCurrentSlideIndex={(index) => setCurrentSlideIndex(index)}
          />

          <View style={styles.countDownContainer}>
            <CountdownCircleTimer
              isPlaying
              duration={time * 60}
              colors={COLORS._F3982F}
              colorsTime={[7, 5, 2, 0]}
              strokeWidth={4}
              trailStrokeWidth={9}
              size={135}
              trailColor={COLORS._063861}
              onComplete={() => {
                // do your stuff here
                // return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
              }}
            >
              {({ elapsedTime }) => {
                var mTime = time * 60;
                var minutes = Math.floor((mTime - elapsedTime) / 60);
                var seconds = mTime - elapsedTime - minutes * 60;
                remainingTime = minutes + 1;
                return (
                  <View>
                    <Label font="h5" style={{ fontSize: 24 }}>
                      {`${minutes < 10 ? "0" : ""}${minutes}:${
                        parseInt(seconds) < 10 ? "0" : ""
                      }${parseInt(seconds)}`}
                    </Label>
                    <Label
                      style={{
                        color: COLORS._F3982F,
                        fontSize: 11,
                        marginTop: -10,
                      }}
                    >
                      Countdown
                    </Label>
                  </View>
                );
              }}
            </CountdownCircleTimer>
          </View>

          <FlatList
            ref={ref}
            data={seletctedQuiz?.questionsList}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              let qIndex = index;
              return (
                <View style={{ width: width * 0.9 }}>
                  <Label
                    style={{
                      color: COLORS._333333,
                      fontSize: hp(2.1),
                      textAlign: "left",
                      marginTop: hp(2.5),
                      marginBottom: hp(1),
                    }}
                  >
                    {item.question}
                  </Label>
                  <ScrollView style={{ marginBottom: hp(17) }}>
                    {item.options.map((answer, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.answerItem}
                        onPress={() => saveAnswer(qIndex, index)}
                      >
                        <View
                          style={[
                            styles.circle,
                            {
                              backgroundColor:
                                quizResponse[qIndex] == index
                                  ? COLORS._78DED4
                                  : COLORS._D4D4D4,
                            },
                          ]}
                        >
                          <Label
                            style={{
                              color:
                                quizResponse[qIndex] == index
                                  ? COLORS._FFFFFF
                                  : COLORS._333333,
                              fontSize: hp(1.9),
                            }}
                          >
                            {nextChar(index)}
                          </Label>
                        </View>
                        <Label
                          style={{
                            color:
                              quizResponse[qIndex] == index
                                ? COLORS._78DED4
                                : COLORS._333333,
                            fontSize: hp(1.9),
                            textAlign: "left",
                            width: '85%'
                          }}
                        >
                          {answer}
                        </Label>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              );
            }}
          />

          {/* BUTTON */}
          <LinearGradient
            colors={["rgba(0,0,0,0)", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
            style={styles.absoluteBtn}
          >
            <GradientButton
              style={{ borderRadius: 100, width: wp(70) }}
              textStyles={{
                color: COLORS._FFFFFF,
                fontFamily: FONTS.Poppins_500,
              }}
              title={
                seletctedQuiz?.questionsList?.length - 1 == currentSlideIndex
                  ? "Submit"
                  : "Next Question ➔"
              }
              onpress={() => goToSlide(currentSlideIndex + 1)}
              isLoading={isLoading}
            />
          </LinearGradient>
        </View>
      </CurveContainer>
    </Gradient>
  );
};

export default Quiz;
