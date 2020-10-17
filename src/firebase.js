import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW-2gHAbTDei5kpnx2U_aG-LJTxrgwrt0",
  authDomain: "fir-live-blog-d6f43.firebaseapp.com",
  databaseURL: "https://fir-live-blog-d6f43.firebaseio.com",
  projectId: "fir-live-blog-d6f43",
  storageBucket: "fir-live-blog-d6f43.appspot.com",
  messagingSenderId: "823090351833",
  appId: "1:823090351833:web:e0ee06bcfd03f95a8678c8",
  measurementId: "G-D890YWLKGL",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleSignIn = () => auth.signInWithPopup(googleProvider);
export const facebookSignIn = () => auth.signInWithPopup(facebookProvider);
export const githubSignIn = () => auth.signInWithPopup(githubProvider);
export const signOut = () => auth.signOut();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const createdAt = new Date().toUTCString();
    const { displayName, email, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        photoURL,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("Error Fetching User", error.message);
  }
};

export default firebase;
