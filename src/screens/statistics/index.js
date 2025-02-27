import { View, ScrollView, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CurveHeader, Label, GradientButton } from "@components";
import styles from "./styles";
import { hp, COLORS, FONTS, width, wp } from "@utils/common";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import ProgressBar from "react-native-animated-progress";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { LineChart } from "react-native-chart-kit";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { SCREENS } from "@navigation/routes";
import { AppContext } from "@contexts/appContext";
import moment from "moment";
import { getUnixDate } from "../../utils/myUtils";
import { useCallback } from "react";
import Carousel from 'react-native-reanimated-carousel';

const Statistics = (props) => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const {
    getAllCompletedQuizes,
    allCompletedQuizes,
    setallCompletedQuizes,
    allQuizes,
    getAllCompletedQuizesByDate,
    allCompletedQuizesFilter,
  } = useContext(AppContext);
  const { navigation } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([{ label: "daily", value: "daily" }]);

  const [open_, setOpen_] = useState(false);
  const [value_, setValue_] = useState("weekly");
  const [items_, setItems_] = useState([
    { label: "weekly", value: "weekly" },
    { label: "monthly", value: "monthly" },
  ]);
  const [progressBar, setprogressBar] = useState(0);
  const [currentData, setCurrentData] = useState([]);

  const onCategoryOpen = useCallback(() => {
    setOpen_(false);
  }, []);

  const onCompletionOpen = useCallback(() => {
    setOpen(false);
  }, []);

  // CHART CONFIG
  const config = {
    backgroundColor: COLORS._FFFFFF,
    backgroundGradientFrom: COLORS._FFFFFF,
    backgroundGradientTo: COLORS._FFFFFF,
    fillShadowGradientTo: theme.mainColor,
    fillShadowGradientToOpacity: 0.1,
    fillShadowGradientToOffset: 0.9,
    fillShadowGradientFromOffset: 0.6,
    fillShadowGradientOpacity: 0.2,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity) => `rgba(120, 222, 212, ${opacity})`,
    labelColor: (opacity = 1) => COLORS._DDDDDD,
    style: {},
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: theme.mainColor,
    },
  };

  /**
   * GET COMPLETED QUIZES
   * **/
  useEffect(() => {
    const subscribe = navigation.addListener("focus", async () => {
      // ADD FUNCTION HERE
      await getAllCompletedQuizes();
    });

    return subscribe;
  }, [navigation]);

  useEffect(() => {
    let data = allCompletedQuizesFilter.map((d, i) => {
      let date = d.Data[0].quizId ? d.Data.length : 0;
      return Number(date);
    });

setCurrentData(data)

}, [allCompletedQuizesFilter])

    useEffect(() => {
        // const subscribe = navigation.addListener('focus', async () => {
            // ADD FUNCTION HERE
           
        // })
        getInitialChartData()

        // return subscribe
    }, [navigation, value_])


// const getInitialChartData = async () => {
//     await getAllCompletedQuizesByDate(value_)
// }
//     console.log("Current DATA ====>>", currentData)

//     // return subscribe
//   }, [navigation, value_]);

  const getInitialChartData = async () => {
    await getAllCompletedQuizesByDate(value_);
  };

  // let date = new Date()
  // console.log("New Data", date)
  // let year = moment().format("YYYY-MM")
  // let date = moment().format('MM')
  // console.log("Fomatted Date", year)
  // // let currentDates = Array.from({length: moment(year).daysInMonth()}, (x, i) => moment(date).startOf(date).add(i, 'days').format('DD'))
  // // setGetCurrentMonthDates(currentDates)
  //  var startOfWeek = moment().startOf('week');
  // var endOfWeek = moment().endOf('week');

  // var days = [];
  // var day = startOfWeek;

  // while (day <= endOfWeek) {
  //     days.push(day);
  //     day = day.clone().add(1, 'd');
  // }

  // let dateObject = allCompletedQuizesFilter.map(d => {
  //     let date = d.date.split('-')
  //     return Number(date[0])
  // })

  // console.log("Length of Data",dateObject);

  // console.log("Date",  Array.from({length: moment(year).daysInMonth()}, (x, i) => moment(new Date()).startOf(date).add(i, 'days').format('DD')))
  /**
   * GET PROGESS
   * **/
  const getProgress = (list = []) => {
    let answeredQuestions = 0;
    let totalQuestions = 0;
    allCompletedQuizes.map((quiz) => {
      answeredQuestions = answeredQuestions + quiz.correctAnswers;
      totalQuestions = totalQuestions + quiz.totalQuestions;
    });
    setprogressBar(parseInt((answeredQuestions / totalQuestions) * 100));
    return parseInt((answeredQuestions / totalQuestions) * 100);
  };

  useEffect(() => {
    getProgress();
  }, [allCompletedQuizes, allCompletedQuizes?.length]);

  /**
   * GET UNIQUE TOPICS?CATEGORIES
   * **/
  useEffect(() => {
    let unique = [...new Set(allQuizes.map((item) => item.topic))];
    let topics = unique.map((item) => {
      return { label: item, value: item };
    });
    setItems(topics);
  }, [allQuizes.length]);

  /**
   * FILTER QUIZES
   * **/
  // console.log(allCompletedQuizesFilter.map(d => {
  //     let date = d.Data[0].quizId ?  d.Data.length : 0
  //     // moment(d.Data[0].date,"DD-MM-YYYY").format("DD")
  //     console.log('date===========>>>>>>>>', d.Data[0])
  //     return Number(date)
  // }))

  console.log("Current State", currentData);

  return (
    <View style={styles.main}>
      <CurveHeader
        leftText={"My Statistics"}
        showImage={true}
        onLeftPress={() => props.navigation.goBack()}
      />
      <View style={styles.keyDropDown}>
        <Label style={{ color: COLORS._333333, fontSize: hp(2) }}>
          Progress
        </Label>

        {/* <DropDownPicker
          open={open}
          onOpen={onCategoryOpen}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          // maxHeight={30}
          placeholder="Category"
          ArrowUpIconComponent={({ style }) => (
            <View style={style}>
              <Feather name="chevron-up" size={20} color={COLORS._333333} />
            </View>
          )}
          ArrowDownIconComponent={({ style }) => (
            <View style={style}>
              <Feather name="chevron-down" size={20} color={COLORS._333333} />
            </View>
          )}
          style={[styles._picker]}
          containerStyle={[styles._dropDownContainer]}
          textStyle={{
            color: COLORS._333333,
            fontFamily: FONTS.Inter_500,
            right: -8,
          }}
          dropDownContainerStyle={styles.dropListContainer}
          iconContainerStyle={{ borderWidth: 2, width: 10 }}
          arrowIconStyle={{ width: 30 }}
        /> */}
      </View>
      <ScrollView>
        <View style={[styles.itemContainer, {borderWidth: 1}]}>
          <Label
            style={{
              color: theme.appColor,
              fontSize: hp(1.7),
              textAlign: "left",
            }}
          >
            This Week
          </Label>
          <ProgressBar
            progress={progressBar}
            height={6}
            backgroundColor={theme.mainColor}
            trackColor="#D5FAF3"
          />

          {/* CRICULAR PROGRESS INDICATOR */}
          <View style={[styles.rowContainer]}>
          <Carousel
            loop
            width={width}
            height={width}
            autoPlay={false}
            data={allCompletedQuizes}
            scrollAnimationDuration={1000}
            onSnapToItem={(item) => console.log('current index:', item.index)}
            renderItem={({ item, index }) => (
              // <View
              //   style={{
              //     flex: 1,
              //     borderWidth: 1,
              //     justifyContent: 'center',
              //   }}
              // >
              //   <Text style={{ textAlign: 'center', fontSize: 30, color: '#000' }}>
              //     {`${item.correctAnswers}/${item.totalQuestions}`}
              //   </Text>
              // </View>
              <View style={styles.circleIndicator} key={index}>
              <AnimatedCircularProgress
                size={width * 0.37}
                width={19}
                fill={(item.correctAnswers / item.totalQuestions) * 100}
                tintColor={theme.mainColor}
                onAnimationComplete={() => {}}
                backgroundColor={"#D5FAF3"}
                rotation={200}
              >
                {(fill) => (
                  <Label
                    style={{
                      color: theme.appColor,
                      fontSize: hp(2.4),
                      fontFamily: FONTS.Poppins_500,
                    }}
                  >
                    {`${item.correctAnswers}/${item.totalQuestions}`}
                  </Label>
                )}
              </AnimatedCircularProgress>
              <Label style={styles.indicatorTxt}>
                {`${item.title}\nQuiz`}
              </Label>
            </View>
            )}
            />
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allCompletedQuizes.map((quiz, index) => (
              <View style={styles.circleIndicator} key={index}>
                <AnimatedCircularProgress
                  size={width * 0.37}
                  width={19}
                  fill={(quiz.correctAnswers / quiz.totalQuestions) * 100}
                  tintColor={theme.mainColor}
                  onAnimationComplete={() => {}}
                  backgroundColor={"#D5FAF3"}
                  rotation={200}
                >
                  {(fill) => (
                    <Label
                      style={{
                        color: theme.appColor,
                        fontSize: hp(2.4),
                        fontFamily: FONTS.Poppins_500,
                      }}
                    >
                      {`${quiz.correctAnswers}/${quiz.totalQuestions}`}
                    </Label>
                  )}
                </AnimatedCircularProgress>
                <Label style={styles.indicatorTxt}>
                  {`${quiz.title}\nQuiz`}
                </Label>
              </View>
            ))}
            </ScrollView> */}
          </View>
        </View>
        {/* END */}

        {/* CHART */}
        <View
          style={[
            styles.itemContainer,
            { paddingHorizontal: 0, marginTop: hp(1.8), marginBottom: hp(25) },
          ]}
        >
          <View style={styles.keyDropDown}>
            <Label style={{ color: COLORS._333333, fontSize: hp(2) }}>
              Completion Rate
            </Label>

            <DropDownPicker
              open={open_}
              onOpen={onCompletionOpen}
              value={value_}
              items={items_}
              setOpen={setOpen_}
              setValue={setValue_}
              setItems={setItems_}
              // maxHeight={30}
              placeholder="weekly"
              ArrowUpIconComponent={({ style }) => (
                <View style={style}>
                  <Feather name="chevron-up" size={20} color={COLORS._FFFFFF} />
                </View>
              )}
              ArrowDownIconComponent={({ style }) => (
                <View style={style}>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={COLORS._FFFFFF}
                  />
                </View>
              )}
              style={[
                styles._picker,
                { backgroundColor: theme.mainColor, borderWidth: 0 },
              ]}
              containerStyle={[styles._dropDownContainer]}
              textStyle={{
                color: COLORS._FFFFFF,
                fontFamily: FONTS.Poppins_400,
                right: -8,
              }}
              dropDownContainerStyle={[
                styles.dropListContainer,
                { backgroundColor: theme.mainColor },
              ]}
              arrowIconStyle={{ width: 30 }}
            />
          </View>
          {currentData.length ? (
            <LineChart
              data={{
                labels: allCompletedQuizesFilter.map((data) =>
                  moment(data.date, "DD-MM-YYYY").format("DD")
                ),
                datasets: [
                  {
                    data: currentData,
                    // data:allCompletedQuizesFilter.map(d => {
                    //     let date = d.Data.length
                    //     return Number(date)
                    // })
                    // data: [
                    //     10, 20, 30, 30, 40, 50, 55, 40
                    // ]
                  },
                ],
              }}
              width={wp(88)} // from react-native
              height={hp(26)}
              // yAxisLabel="$"
              // yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={config}
              bezier
              style={{}}
            />
          ) : null}
        </View>
      </ScrollView>
      {/* BUTTON */}
      <LinearGradient
        colors={["rgba(0,0,0,0)", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
        style={styles.absoluteBtn}
      >
        <GradientButton
          style={{ borderRadius: 100, width: wp(70) }}
          textStyles={{ color: COLORS._FFFFFF, fontFamily: FONTS.Poppins_500 }}
          title="Check Leaderboard"
          onpress={() => props.navigation.navigate(SCREENS.LEADER_BOARD)}
        />
      </LinearGradient>
    </View>
  );
};

export default Statistics;
