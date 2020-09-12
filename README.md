# Firebase and React

## Initial Set Up

- Set up a new project on Firebase Console.
- Take a tour of firebase Console.
- Go the setup of your platform and copy config file in your codebase.
- Now Go to Database section in firebase console of your app and create a new Cloud Firestore.
- Follow necessary steps for ex. deciding for test mode(Development) or locked mode(Production).
- Put into test mode after selecting necessary location of the database server.

## Installing firebase in your React Application

Let's make a new file called 'firebase.js'.

```js
import firebase from 'firebase/app';

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

export default firebase;
```

Some Important Points:

- The apiKey just associates you with a Firebase project. We don't need to hide it.
  - Your project will be protected by security rules later.
  - There is a second, more important key that we'll use later that *should* be hidden.
- We're just pulling in `firebase/app` so that we don't end up pulling in more than we need in our client-side application.
- We configure Firebase and then we'll export it for use in other places in our application.

## Setting up cloud firestore

```js
import firebase from 'firebase/app';
import 'firebase/firestore'; //New

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
export const firestore = firebase.firestore(); //NEW
export default firebase;

```
