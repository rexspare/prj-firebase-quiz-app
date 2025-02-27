import { View, Text } from 'react-native'
import React from 'react'
import { ClockCircle, QuestionCirlce, StarCirclr } from '@svg'
import { hp } from '@utils/common'

const explainationData = [
    {
        id : 1,
        Icon : <QuestionCirlce width={hp(6)} height={hp(6)}/>,
        title : '10 Question',
        subtle : '10 point for a correct answer'
    },
    {
        id : 2,
        Icon : <ClockCircle width={hp(6)} height={hp(6)}/>,
        title : '1 hour 15 min',
        subtle : 'Total duration of the quiz'
    },
    {
        id : 3,
        Icon : <StarCirclr width={hp(6)} height={hp(6)}/>,
        title : 'Win 10 star',
        subtle : 'Answer all questions correctly'
    }
]

const instructionsData =[
    {
        id: 1,
        text : '10 point awarded for a correct answer and no marks for a incorrect answer'
    },
    {
        id: 2,
        text : 'Tap on options to select the correct answer'
    },
    {
        id: 3,
        text : 'Tap on the bookmark icon to save interesting questions'
    },
    {
        id: 4,
        text : 'Click submit if you are sure you want to complete all the quizzes'
    },
]

const answerOptions = [
    {
        id: 1,
        text : 'User Interface and User Experience',
        option : 'A'
    },
    {
        id: 2,
        text : 'User Interface and User Experience',
        option : 'B'
    },
    {
        id: 3,
        text : 'User Interface and Using Experience',
        option : 'C'
    },
    {
        id: 4,
        text : 'User Interface and User Experience',
        option : 'D'
    },
    
]

export {
    explainationData,
    instructionsData,
    answerOptions
}