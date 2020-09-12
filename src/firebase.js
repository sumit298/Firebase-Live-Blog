import firebase from 'firebase/app';
import 'firebase/firestore';

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

export const firestore = firebase.firestore();

window.firebase = firebase;

export default firebase;