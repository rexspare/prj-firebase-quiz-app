import React, { createContext, useState, useEffect, useContext } from "react";
import { storageKeys } from "@constants/storageKeys";
import { collections } from "@constants/collections";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "./authContext";
import {
  getAllOfCollection,
  getAllOfCollection_2,
  saveData_2,
  saveData,
  getDocData,
  getAllOfCollection_2_Ordered,
} from "@services/firebaseServices";
import { showFlash, getUnixDate } from "@utils/myUtils";
import moment from "moment";
import _ from "lodash";

// const completedQuizesRef = firestore().collection('users').doc()

export const AppContext = new createContext();

export const AppProvider = ({ children }) => {
  const { userData } = useContext(AuthContext);
  const [settings, setsettings] = useState({
    generalNotification: true,
    sound: true,
    vibrate: true,
    appUpdates: true,
    billReminder: true,
    promotion: true,
    discounts: true,
    paymentRequest: true,
    newQuiz: true,
    newTip: true,
  });
  const [selectedTopic, setselectedTopic] = useState("Popular");
  const [seletctedQuiz, setseletctedQuiz] = useState({});
  const [allQuizes, setallQuizes] = useState([]);
  const [selectedQuestion, setselectedQuestion] = useState();
  const [quizResponse, setquizResponse] = useState([]);
  const [currentAttemptingQuizId, setcurrentAttemptingQuizId] = useState("");
  const [
    currentAttemptingInComplteQuizID,
    setcurrentAttemptingInComplteQuizID,
  ] = useState("");
  const [allIncompleteQuizes, setallIncompleteQuizes] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [refreshState, setrefreshState] = useState(false);
  const [leaderBoard, setleaderBoard] = useState([]);
  const [leaderPagination, setleaderPagination] = useState([]);
  const [allCompletedQuizes, setallCompletedQuizes] = useState([]);
  const [allCompletedQuizesFilter, setAllCompletedQuizesFilter] = useState([]);
  // *****
  // GETTING QUIZES AND QUESTIONS
  // *****

  useEffect(() => {
    if (userData?.uid) {
      getallQuizes();
      getLeaderBoard();
    }
  }, [userData?.uid]);

  const getallQuizes = async () => {
    setallQuizes([]);
    let querySnapshot = await getAllOfCollection(collections.quizes);
    let questions = [];
    await querySnapshot.forEach(async function (doc) {
      questions = await getAllOfCollection_2_Ordered(
        collections.quizes,
        doc.doc_id,
        collections.questions,
        "questionNumber"
      );
      setallQuizes((prev) => [...prev, { ...doc, questionsList: questions }]);
    });
  };

  const getAllIncompleteQuizes = async () => {
    setallIncompleteQuizes([]);
    let querySnapshot = await getAllOfCollection_2(
      collections.users,
      userData.uid,
      collections.incompleteQuiz
    );
    let questions = [];
    let quiz = {};
    await querySnapshot.forEach(async function (doc) {
      quiz = await getDocData(collections.quizes, doc.quizId);
      questions = await getAllOfCollection_2_Ordered(
        collections.quizes,
        doc?.quizId,
        collections.questions,
        "questionNumber"
      );
      setallIncompleteQuizes((prev) => [
        ...prev,
        { ...doc, quiz: { ...quiz, questionsList: questions } },
      ]);
    });
    // setrefreshState(!refreshState)
  };

  const deleteIncomepleteQuiz = (id) => {
    let remaingQuizes = [];
    firestore()
      .collection(collections.users)
      .doc(userData?.uid)
      .collection(collections.incompleteQuiz)
      .doc(id)
      .delete()
      .then(() => {
        remaingQuizes = allIncompleteQuizes?.filter(
          (quiz) => quiz.doc_id != id
        );
        setallIncompleteQuizes(remaingQuizes);
      });
  };

  // ***** END *****

  // *****
  // QUIZ HANDLER
  // *****

  useEffect(() => {
    if (seletctedQuiz?.doc_id) {
      setcurrentAttemptingQuizId(seletctedQuiz?.doc_id);
    }
  }, [seletctedQuiz?.doc_id]);

  const attemptQuiz = async (callBack) => {
    setisLoading(true);
    let response = seletctedQuiz.questionsList.map(() => 99);
    setquizResponse(response);
    firestore()
      .collection(collections.users)
      .doc(userData.uid)
      .collection(collections.incompleteQuiz)
      .add({
        quizId: seletctedQuiz.doc_id,
        remainingTime: seletctedQuiz.time,
        answersArray: response,
      })
      .then((doc) => {
        callBack();
        setcurrentAttemptingInComplteQuizID(doc.id);
        setisLoading(false);
      })
      .catch(() => {
        setisLoading(false);
        showFlash("Error creating instance please tru again", "danger");
      });
  };

  const updateQuizAttemp = async (time, response, callBack) => {
    await saveData_2(
      collections.users,
      userData?.uid,
      collections.incompleteQuiz,
      currentAttemptingInComplteQuizID,
      {
        remainingTime: time,
        answersArray: response,
      }
    );
    callBack();
  };

  const submitQuiz = async (callBack) => {
    setisLoading(true);
    firestore()
      .collection(collections.users)
      .doc(userData?.uid)
      .collection(collections.incompleteQuiz)
      .doc(currentAttemptingInComplteQuizID)
      .delete()
      .then(async () => {
        /**
         * Calcutate result and update users points in user's doc
         * add doc in users completed quizes collection
         * **/
        let totalPointsEarned = 0;
        let totalCorrectAnsers = 0;
        seletctedQuiz?.questionsList?.forEach((ques, index) => {
          if (ques?.correctIndex == quizResponse[index]) {
            totalCorrectAnsers = totalCorrectAnsers + 1;
          }
        });
        totalPointsEarned = totalCorrectAnsers * 10;
        await saveData(collections.users, userData?.uid, {
          score: userData?.score
            ? userData?.score + totalPointsEarned
            : totalPointsEarned,
          lastUpdatedAt: firestore.FieldValue.serverTimestamp(),
        });
        firestore()
          .collection(collections.users)
          .doc(userData.uid)
          .collection(collections.completedQuiz)
          .add({
            title: seletctedQuiz.title,
            totalQuestions: seletctedQuiz?.questionsList?.length,
            correctAnswers: totalCorrectAnsers,
            quizId: seletctedQuiz.doc_id,
            date: getUnixDate(),
          })
          .then((doc) => {
            setcurrentAttemptingInComplteQuizID("");
            setseletctedQuiz({ questionsList: [] });
            setquizResponse([]);
            getLeaderBoard()
            callBack();
          });
        setisLoading(false).catch(() => {
          setisLoading(false);
        });
      })
      .catch(() => {
        setisLoading(false);
      });
  };

  /**
   * Handle Continue Quiz
   * */

  const continueAttemp = (quiz) => {
    setquizResponse(quiz.answersArray);
    setcurrentAttemptingInComplteQuizID(quiz.doc_id);
  };

  // ***** END *****

  /**
   * Handle Leader Board
   * */

  const getLeaderBoard = async () => {
    let data = [];
    let leaderDocs = [];
    let rank = 1;
    let querySnapshot = await firestore()
      .collection(collections.users)
      .orderBy("score", "desc")
      .limit(10)
      .get();
    querySnapshot.forEach(function (doc) {
      if (doc.exists) {
        data.push({ ...doc.data(), doc_id: doc?.id, rank: rank });
        leaderDocs.push(doc);
        rank = rank + 1;
      } else {
        console.log("No document found!");
      }
      setleaderBoard(data);
      setleaderPagination(leaderDocs);
    });
  };

  const getMoreLeaderBoard = async () => {
    // Last Visible.
    const lastVisible = leaderPagination[leaderPagination?.length - 1];
    let data = [];
    let leaderDocs = [];
    let rank = leaderBoard?.length + 1;
    // Query.
    let querySnapshot = await firestore()
      .collection(collections.users)
      .orderBy("score", "desc")
      .startAfter(lastVisible)
      .limit(10)
      .get();
    querySnapshot.forEach(function (doc) {
      if (doc.exists) {
        data.push({ ...doc.data(), doc_id: doc?.id, rank: rank });
        leaderDocs.push(doc);
        rank = rank + 1;
      } else {
        console.log("No document found!");
      }
      setleaderBoard([...leaderBoard, ...data]);
      setleaderPagination(leaderDocs);
    });
  };

  // ***** END *****

  /**
   * GET ALL COMPLETED QUIZES
   * */
  const getAllCompletedQuizes = async () => {
    // let temp= []
    let quizes = await getAllOfCollection_2(
      collections.users,
      userData?.uid,
      collections.completedQuiz
    );
    // let quizesRef = firestore().collection('users').doc(userData?.uid).collection('completedQuiz')
    // let snapShot = await quizesRef.get()
    // snapShot.forEach(doc =>{
    //     if(doc.exists){
    //         temp.push({
    //             id: doc.id,
    //             ...doc.data()
    //         })

    //     }
    // })
    // for (let i = 0; i < temp.length; i++) {
    //     const quizId = temp[i].quizId
    //     const quizSnap = await firestore().collection('quizes').doc(quizId).get()
    //     temp[i].quizName =  quizSnap.data().name
    //     console.log("Hello", quizId)

    // }

    setallCompletedQuizes(quizes);
  };

  /**
    GET ALL COMPLETED QUIZES BY DATES
    */

    const getAllCompletedQuizesByDate = async (value_) => {
        // const _7daysago = Date.now() - (7 * 24 * 60 * 60 * 1000);
        console.log("Value =====>>", value_)
        
        if(value_ === 'weekly'){
            let temp = []
            let quizesRef = firestore().collection('users').doc(userData?.uid).collection('completedQuiz')
            let snapShot = await quizesRef.orderBy('date','desc').startAt(moment().startOf('week').format('X')).get()
            snapShot.forEach(doc => {
                console.log("Doc", doc)
                temp.push({
                    id: doc.id,
                    ...doc.data(),
                    date: moment(doc.data().date, "X").format("DD-MM-YYYY")
                })
            })
    
            let dates = []
    
            let now = moment()
            for (let i = 0; i < 7; i++) {
                // const element = temp[i];
                if(i === 0){
                    dates.push(now.format("DD-MM-YYYY"))
                }else{
                    dates.push(now.subtract(1,'days').format("DD-MM-YYYY"))
                }
                // now = now.subtract(1,'days')
            }
            console.log("Dates", dates)
            for (let i = 0; i < dates.length; i++) {
                const element = dates[i];
                const final = temp.some((data) => data.date === element)
                if(!final){
                    temp.push({ date: element})
               }
            }
            
            let groupedData = _.chain(temp)
            .groupBy('date')
            .map((value, key) => ({date: key, Data: value}))
            .value()
      
            console.log("Temp Data", _.sortBy(groupedData, 'date'))
            setAllCompletedQuizesFilter(_.sortBy(groupedData, 'date'))
        }else if(value_ === 'monthly'){
            let temp = []
            let quizesRef = firestore().collection('users').doc(userData?.uid).collection('completedQuiz')
            let snapShot = await quizesRef.orderBy('date','desc').startAt(moment().startOf('week').format('X')).get()
            snapShot.forEach(doc => {
                console.log("Doc", doc)
                temp.push({
                    id: doc.id,
                    ...doc.data(),
                    date: moment(doc.data().date, "X").format("DD-MM-YYYY")
                })
            })
    
            let dates = []
    
            let now = moment()
            for (let i = 0; i < 7; i++) {
                // const element = temp[i];
                if(i === 0){
                    dates.push(now.format("DD-MM-YYYY"))
                }else{
                    dates.push(now.subtract(5,'days').format("DD-MM-YYYY"))
                }
                // now = now.subtract(1,'days')
            }
            console.log("Dates", dates)
            for (let i = 0; i < dates.length; i++) {
                const element = dates[i];
                const final = temp.some((data) => data.date === element)
                if(!final){
                    temp.push({ date: element})
               }
            }
            
            let groupedData = _.chain(temp)
            .groupBy('date')
            .map((value, key) => ({date: key, Data: value}))
            .value()
      
            console.log("Temp Data", _.sortBy(groupedData, 'date'))
            setAllCompletedQuizesFilter(_.sortBy(groupedData, 'date'))
        }
        else{
            let temp = []
            let quizesRef = firestore().collection('users').doc(userData?.uid).collection('completedQuiz')
            let snapShot = await quizesRef.orderBy('date','desc').startAt(moment().startOf('month').format('X')).get()
            snapShot.forEach(doc => {
                console.log("Doc", doc)
                temp.push({
                    id: doc.id,
                    ...doc.data(),
                    date: moment(doc.data().date, "X").format("DD-MM-YYYY")
                })
            })
    
            let dates = []
    
            let now = moment()
            for (let i = 0; i < 7; i++) {
                // const element = temp[i];
                if(i === 0){
                    dates.push(now.format("DD-MM-YYYY"))
                }else{
                    dates.push(now.subtract(1,'days').format("DD-MM-YYYY"))
                }
                // now = now.subtract(1,'days')
            }
            console.log("Dates", dates)
            for (let i = 0; i < dates.length; i++) {
                const element = dates[i];
                const final = temp.some((data) => data.date === element)
                if(!final){
                    temp.push({ date: element})
               }
            }
            
            let groupedData = _.chain(temp)
            .groupBy('date')
            .map((value, key) => ({date: key, Data: value}))
            .value()
      
            console.log("Temp Data", _.sortBy(groupedData, 'date', ['asc']))
            setAllCompletedQuizesFilter(_.sortBy(groupedData, 'date', ['desc']))
        }
       
        // return temp
    }

    // return temp
 

  // ***** END *****

  return (
    <AppContext.Provider
      value={{
        settings,
        setsettings,
        allQuizes,
        selectedTopic,
        setselectedTopic,
        seletctedQuiz,
        setseletctedQuiz,
        selectedQuestion,
        setselectedQuestion,
        setallQuizes,
        getallQuizes,
        quizResponse,
        setquizResponse,
        attemptQuiz,
        updateQuizAttemp,
        submitQuiz,
        isLoading,
        setisLoading,
        getAllIncompleteQuizes,
        allIncompleteQuizes,
        setallIncompleteQuizes,
        deleteIncomepleteQuiz,
        continueAttemp,
        refreshState,
        setrefreshState,
        leaderBoard,
        setleaderBoard,
        getLeaderBoard,
        getMoreLeaderBoard,
        allCompletedQuizes,
        setallCompletedQuizes,
        getAllCompletedQuizes,
        getAllCompletedQuizesByDate,
        allCompletedQuizesFilter,
        setAllCompletedQuizesFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
