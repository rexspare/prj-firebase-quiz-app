import { Alert, Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { collections } from "@constants/collections";
import { showFlash } from "@utils/myUtils";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  Profile,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import storage from "@react-native-firebase/storage";
import moment from "moment";
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import jwt_decode from "jwt-decode";
// *****
// AUTH FUNCTIONS
// *****

// SIGN IN WUTH EMAIL
const registerWithEmail = async (
  email,
  password,
  phone,
  onSuccess,
  onFailure
) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (data) => {
      await saveData(collections.users, data.user.uid, {
        email: email,
        phone: phone,
        isPhoneVerified: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
        lastUpdatedAt: firestore.FieldValue.serverTimestamp(),
        authProvider: "email",
        uid: data.user.uid,
        userName: "",
        score: 0,
      });
      await createSettings();
      onSuccess({
        email: email,
        phone: phone,
        isPhoneVerified: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
        lastUpdatedAt: firestore.FieldValue.serverTimestamp(),
        authProvider: "email",
        uid: data.user.uid,
        userName: "",
        score: 0,
      });
    })
    .catch((error) => {
      onFailure();
      if (error.code === "auth/email-already-in-use") {
        showFlash("email already in use", "danger");
      }
      if (error.code === "auth/invalid-email") {
        showFlash("email is invalid", "danger");
      }
      console.error(error);
    });
};

// LOGIN WITH EMAIL
const loginWithEmail = async (email, password, callBack) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (data) => {
      showFlash("you have successfully logged in!");
      callBack();
    })
    .catch((error) => {
      callBack();
      console.log(error.code, "error code is");
      if (error.code === "auth/email-already-in-use") {
        showFlash("That email address is already in use!", "danger");
        return;
      }
      if (error.code === "auth/wrong-password") {
        console.log("auth/wrong-password!");
        showFlash("Password is wrong!",'warning')
        return "Please enter a valid password!";
      }
      if (error.code === "auth/user-not-found") {
        showFlash("no user found with this email", "danger");
        return;
      }
      if (error.code === "auth/invalid-email") {
        showFlash("email address is invalid!", "danger");
        return;
      }
      console.error(error);
    });
};

// RESET PASSWORD LINK
const sendPasswordResendLink = async (email, onSuccess, onFailure) => {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      showFlash("Successfully sent the password reset email");
      onSuccess();
    })
    .catch(() => {
      onFailure();
      showFlash("An Error Occured while sending password reset link", "danger");
    });
};

// GOOGLE LOGIN
const googleLogin = async (
  loggedIn = () => {},
  notLoggedIn = () => {},
  callBack = () => {}
) => {
  try {
    callBack(true);
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const logs = await auth().signInWithCredential(googleCredential);
    //  Check if the user already has a doc
    const exists = await getAllOfCollectionwhere(
      collections.users,
      "email",
      logs?.user?.email
    );
    if (exists.length != 0) {
      loggedIn(exists[0]);
      callBack(false);
    } else {
      await saveData(collections.users, logs?.user?.uid, {
        name: logs?.user?.displayName,
        email: logs?.user?.email,
        phone: logs?.user?.phoneNumber || "",
        createdAt: firestore.FieldValue.serverTimestamp(),
        lastUpdatedAt: firestore.FieldValue.serverTimestamp(),
        isPhoneVerified: true,
        uid: logs?.user?.uid,
        authProvider: "Google",
        userName: logs?.user?.displayName,
        score: 0,
      });
      await createSettings();
      notLoggedIn(logs?.user?.uid);
      callBack(false);
    }
  } catch (error) {
    console.log(error);
    callBack(false);
  }
};

// FACEBOOK LOGIN
const facebokkLogin = async (
  loggedIn = () => {},
  notLoggedIn = () => {},
  callBack = () => {}
) => {
  callBack(true);
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "public_profile",
    "email",
  ]);

  if (result.isCancelled) {
    callBack(false);
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    callBack(false);
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken
  );

  // Sign-in the user with the credential

  const logs = await auth().signInWithCredential(facebookCredential);
  //  Check if the user already has a doc
  const exists = await getAllOfCollectionwhere(
    collections.users,
    "uid",
    logs?.user?.uid
  );
  if (exists.length != 0) {
    loggedIn(exists[0]);
    callBack(false);
  } else {
    await saveData(collections.users, logs?.user?.uid, {
      name: logs?.user?.displayName,
      email: logs?.user?.email,
      phone: logs?.user?.phoneNumber || "",
      createdAt: firestore.FieldValue.serverTimestamp(),
      lastUpdatedAt: firestore.FieldValue.serverTimestamp(),
      isPhoneVerified: true,
      uid: logs?.user?.uid,
      authProvider: "Facebook",
      userName: logs?.user?.displayName,
      score: 0,
    });
    await createSettings();
    notLoggedIn(logs?.user?.uid);
    callBack(false);
  }
  callBack(false);
};

// const onAppleLogin = async (  loggedIn = () => {},
// notLoggedIn = () => {},
// callBack = () => {}) => {
//   callBack(true)
//   const appleAuthRequestResponse = await appleAuth.performRequest({
//     requestedOperation: appleAuth.Operation.LOGIN,
//     requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//   });
//   if (!appleAuthRequestResponse.identityToken) {
//     throw new Error('Apple Sign-In failed - no identify token returned');
//   }
//   const { identityToken, nonce } = appleAuthRequestResponse;
//   const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
//   const { email } = jwt_decode(identityToken)
//   const logs = await auth().signInWithCredential(appleCredential);
//   const exists = await getAllOfCollectionwhere(
//     collections.users,
//     "uid",
//     logs?.user?.uid
//   );
//   if (exists.length != 0) {
//     loggedIn(exists[0]);
//     callBack(false);
//   } else {
//     await saveData(collections.users, logs?.user?.uid, {
//       name: logs?.user?.displayName,
//       email: logs?.user?.email,
//       phone: logs?.user?.phoneNumber || "",
//       createdAt: firestore.FieldValue.serverTimestamp(),
//       lastUpdatedAt: firestore.FieldValue.serverTimestamp(),
//       isPhoneVerified: true,
//       uid: logs?.user?.uid,
//       authProvider: "Facebook",
//       userName: logs?.user?.displayName,
//       score: 0,
//     });
//     await createSettings();
//     notLoggedIn(logs?.user?.uid);
//     callBack(false);
//   }
//   Alert.alert(email)
//   callBack(false);
// }

// LOGOUT
const logout = async (callBack) => {
  auth()
    .signOut()
    .then(() => callBack());
};

export {
  registerWithEmail,
  loginWithEmail,
  sendPasswordResendLink,
  googleLogin,
  facebokkLogin,
  logout,
};
// ***** END *****

// *****
// FIRESTORE FUNCTIONS
// *****
const saveData = async (collection, doc, jsonObject) => {
  console.log(collection, doc, jsonObject);
  await firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, { merge: true })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
  console.log("Document successfully written!");
};

const saveData_2 = async (collection, doc, collection_, doc_, jsonObject) => {
  console.log(collection, doc, jsonObject);
  await firestore()
    .collection(collection)
    .doc(doc)
    .collection(collection_)
    .doc(doc_)
    .set(jsonObject, { merge: true })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
  console.log("Document successfully written!");
};

const getDocData = async (collection, doc) => {
  let found = {};
  await firestore()
    .collection(collection)
    .doc(doc)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        found = { ...doc.data(), doc_id: doc?.id };
      }
    });
  return found;
};

const getAllOfCollection = async (collection) => {
  let data = [];
  let querySnapshot = await firestore().collection(collection).get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push({ ...doc.data(), doc_id: doc?.id });
    } else {
      console.log("No document found!");
    }
  });
  return data;
};

const getAllOfCollection_2 = async (collection, doc, collection_2) => {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .doc(doc)
    .collection(collection_2)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push({ ...doc.data(), doc_id: doc?.id });
    } else {
      console.log("No document found!");
    }
  });
  return data;
};

const getAllOfCollection_2_Ordered = async (
  collection,
  doc,
  collection_2,
  key,
  order
) => {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .doc(doc)
    .collection(collection_2)
    .orderBy(key)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push({ ...doc.data(), doc_id: doc?.id });
    } else {
      console.log("No document found!");
    }
  });
  return data;
};

const getAllOfCollectionwhere = async (collection, key, id) => {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .where(key, "==", id)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      data.push({ ...doc.data(), doc_id: doc?.id });
    } else {
      console.log("No document found!");
    }
  });
  return data;
};

const addInCol = async (collection, jsonObject) => {
  await firestore()
    .collection(collection)
    .add(jsonObject)
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
  console.log("Document successfully written!");
};

const addInCol_2 = async (collection, doc, collection_, jsonObject) => {
  await firestore()
    .collection(collection)
    .doc(doc)
    .collection(collection_)
    .add(jsonObject)
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
  console.log("Document successfully written!");
};

const createSettings = async () => {
  await saveData(collections.settings, auth().currentUser.uid, {
    user: auth().currentUser.uid,
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
};

const saveContactData = (name, email, description) => {
  new Promise(async(resolve, reject) => {
    try {
      await firestore().collection("contact").add({
        date: moment().valueOf(),
        userName: name,
         userEmail: email,
        userQuery: description,
      })
      showFlash('Your query has been submitted successfully.','success')
      return resolve();
    } catch (error) {
      console.log("Error", error);
      showFlash(error,'danger')
      return reject();
    }
  })
}


export {
  saveData,
  saveData_2,
  getDocData,
  getAllOfCollection,
  getAllOfCollection_2,
  getAllOfCollection_2_Ordered,
  getAllOfCollectionwhere,
  addInCol,
  addInCol_2,
  createSettings,
  saveContactData,
};
// ***** END *****

// *****
// STORAGE FUNCTIONS
// *****
const uploadImage = async (path) => {
  const uri = path;
  const filename = uri.substring(uri.lastIndexOf("/") + 1);
  const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;

  const task = storage().ref(filename).putFile(uploadUri);
  // set progress state
  task.on("state_changed", (snapshot) => {
    console.log(
      Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
    );
  });

  try {
    await task;
    const url = await storage().ref(filename).getDownloadURL();
    return url;
  } catch (e) {
    console.error(e);
    return "false";
  }
  return "false";
};

export { uploadImage };
// ***** END *****
