import React, { createContext, useState, useEffect, useContext } from "react";


// const completedQuizesRef = firestore().collection('users').doc()

export const QuizEntryContext = new createContext();

export const QuizEntryProvider = ({ children }) => {
 
  return (
    <QuizEntryContext.Provider
      value={{
       
      }}
    >
      {children}
    </QuizEntryContext.Provider>
  );
};
