import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBW-2gHAbTDei5kpnx2U_aG-LJTxrgwrt0',
	authDomain: 'fir-live-blog-d6f43.firebaseapp.com',
	databaseURL: 'https://fir-live-blog-d6f43.firebaseio.com',
	projectId: 'fir-live-blog-d6f43',
	storageBucket: 'fir-live-blog-d6f43.appspot.com',
	messagingSenderId: '823090351833',
	appId: '1:823090351833:web:e0ee06bcfd03f95a8678c8',
	measurementId: 'G-D890YWLKGL',
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

window.firebase = firebase;

export default firebase;
