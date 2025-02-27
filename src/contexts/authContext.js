import React, { createContext, useState, useEffect } from 'react';
import { storageKeys } from '@constants/storageKeys';
import { collections } from "@constants/collections"
import { getDocData } from '@services/firebaseServices'
import firestore from '@react-native-firebase/firestore';

export const AuthContext = new createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setuserData] = useState(null);
  const [isSigningUp, setisSigningUp] = useState(false)
  const [otp, setOtp] = useState(null)
  const defaultAvatar = 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png'

  useEffect(() => {
    //   AsyncStorage.getItem(storageKeys.onboardingKey)
    //     .then(value => {
    //       if (value == 'true') {
    //         setisFirstTimeOpen(false);
    //       } else {
    //         setisFirstTimeOpen(true)
    //       }
    //     })
    //     .catch(() => {setisFirstTimeOpen(true); console.log("ERRORRROROROO");});
  }, []);

  useEffect(() => {
    if (user && isSigningUp == false) {
      getUser()
    }
  }, [user,]);

  useEffect(() => {
   if(user?.uid){
    firestore().collection(collections.users).where('uid', '==', user.uid)
    .onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          // setuserData(change.doc.data())
        }
        if (change.type === 'modified') {
          console.log("USER DATA MODIFIED ===>>",change.doc.data());
          setuserData(change.doc.data())
        }
        if (change.type === 'removed') {
          setuserData(change.doc.data())
        }
      });
    });
   }
  },[])

  const getUser = async (uid = user.uid) => {
    let data = await getDocData(collections.users, uid)
    setuserData({ ...data})
    // alert(JSON.stringify(data))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData, 
        setuserData,
        getUser,
        isSigningUp, 
        setisSigningUp,
        defaultAvatar,
        getUser,
        otp,
        setOtp
      }}>
      {children}
    </AuthContext.Provider>
  );
};