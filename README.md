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

- The apiKey just associates you with a Firebase project. We don't     need to hide it.
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

## Cloud Firestore

## Fetching posts from cloud firestore

Let's start by fetching posts whenever the 'Application' component by using useEffect.

First, let's pull in Cloud Firestore from our new `firebase.js` file.

```js
import { firestore } from '../firebase';
```

Now, we'll get all of  the posts from Cloud Firestore whenever the `Application` component mounts by using useEffect.

```js
useEffect(async()=>{
  const posts = await firestore.collection('posts').get();
  console.log({posts})
})

```

Hmm.. that looks like a `QuerySnapShot` not our posts. What is that?
Actually Firebase Firestore returns us snapShot of the data. i.e current state
of the data in the database, there are two types of snapshots `QuerySnapShot` and `DocumentSnapShot`.

### QuerySnapShots

A QuerySnapShots has following properties:

- `docs` : All the documents of the snapshot
- `empty` : This is a boolean that lets us know if the snapshot was empty.
- `metadata`: Metadata about this snapshot, concerning its source and if it has local modifications.
  - Example - `SnapShotMetadata {hasPendingWrites: false, fromCache: false}`
- `query`: A reference to the query you fired.
- `size`: The number of documents in the `QuerySnapShot`.

and the following methods:

- `docChanges()`: An array of changes since the last snapshot.
- `forEach()`: Iterates over the entire array of snapshots.
- `isEqual()`: Let's you know if it matches another snapshot.

References allow you to access the database itself. This is useful for getting the collection that document is from, deleting the document, listening for changes, setting and updating properties.

### Iterating for documents

So now, let's iterate through all our documents.
My Method:

```js
useEffect(() => {
 const getData = async () => {
  const snapShot = firestore.collection('posts').onSnapshot((snapshot) => {
  return snapshot.forEach((doc) => {
     const id = doc.id;
     const data = doc.data();
      console.log({ id, data });
    });
   });
  };
  getData();
 }, []);

```

You should see results in the console.

Setting it to the setState to actually render some data in the app which we get from the application.

```js
useEffect(()=>{
  const getData = async ()=>{
    const snapShot = await firebase.collection('posts').get();
    const posts = snapShot.docs.map(doc=> {return { id: doc.id, ...doc.data()}});
   setState({posts});
  }
  getData();
},[])

```

For sake of simplicity and reusability,

An aside, combining the document IDs with the data is something we're going to be doing a lot. Let's make a utility method in `utilities.js`:

```js
export const collectIdsAndData = doc => ({ id: doc.id, ...doc.data() })
```

Now, we will refactor our code as follows in `App.js`:

```js
useEffect(()=>{
  const getData = async ()=>{
    const snapShot = await firestore.collection('posts').get();
    const posts = snapShot.docs.map(collectIdsAndData);

    setState({posts});
  }
  getData();
},[])
```

Now, we can get rid of predefined posts in state.

```js
const [state, setState] = useState({
 posts: [],
});
```

### Adding a new Post

First of all, we need to get rid of that `Date.now()` based `id` in `AddPost`. It was useful for us for a second or two there, but now have Firebase generating for us on our behalf.

```js

  // Function for Add Post.
  const handleCreate = async (post){
    const {posts} = state;
    const docRef = await firestore.collection('posts').add(post);
    const doc = await docRef.get();
    const newPost = collectIdAndData(doc)
    setState({posts: [...posts, newPost]})
  }
```

-> Get rid of automatically generate date-based ID!

### Removing a Post

In `App.js`

I will fix later but for now I am passing this function via props.
from App.js => Posts.js => Post.js  i.e Prop drilling.

```js

const handleRemove = async (id)=>{
  const allPosts = state.posts;
  await firestore.doc(`/posts/${id}`).delete();
  const posts = allPosts.filter(post=> post.id !== id);
  setState({posts});
}
```

### Subscribing to Changes

Instead of managing data manually, you can also subscribe to the changes in the database. Instead of a `get()` method on the collection we can go with `onSnapshot()`.

For realtime updates in the app use onSnapshot. Here we are
continuously firing query so that data in the database change UI change.
but we will stop listening to the database when component
unmounted or navigate away from that section to prevent memory leaks,by using unsubscribe method.

refactoring useEffect in the `App.js`

```js
useEffect(()=>{
  let unsubscribe = null;
  const getData = async ()=>{
    unsubscribe = firestore.collection('posts').onSnapshot(snapshot=>{
      const posts =  snapshot.docs.map(collectIdAndData);
      setState({posts});

    })
    getData();
    // For unsubscribing from the database cleanup function
    return ()=>{
      unsubscribe();
    }
})

```

Currently I am manually passing data to the state, and firebase
does this automatically i will remove some code which are passed through props from `App.js` to their respective components.

### Refactoring

In `Post.jsx`

```js
  // Grabbing id of the document and deleting them.
  const postRef = firestore.doc(`posts/${id}`);
  const remove = ()=>postRef.delete()
  // Passing this remove function to the delete button
```

In `AddPost.jsx`

```js
  // Idk why doc() is working? will figure it out later.
  firestore.collection('posts').doc().set(defaultPost);
```

In `App.jsx`:

- Removed the `handleCreate` method completely.
- Removed the `handleRemove` method completely.
- Removed `onCreate` and `onRemove` from the `<Post />` component in the `render()` method.

### Getting the order right

```js
 useEffect(()=>{
   let unsubscribe = null;
   const getData = async ()=>{
     unsubscribe = firestore.collection('posts').orderBy('createdAt','desc').onSnapshot(snapshot=>{
       const posts = await snapshot.docs.map(collectIdAndData);
       setState({posts})
     })
   }
   getData();
   return ()=>{
     unsubscribe();
   }
 },[])

```

### Updating Documents

Let's implement a approach to updating documents in cloud firestore.
For updating, we can use `set()` method which will create new record, if data not exists otherwise wipe the existing data.

Another method is `update()` which will update the some fields of the document without overwriting the existing data.

In Blog Post, we have star button, so when a user clicks on the star button, we should eventually increase the stars in the post.

Now currently is not the best way to do this, but I will update it later.

```js
const postRef = firestore.doc(`posts/${id}`);
const addStar = ()=> postRef.update({ stars: stars + 1});
// Now passing this function to the star button by using onClick event.
```

## Authentication

Right now, the application is wide open. If we pushed this to production, any user could do literally anything they wanted with our database. That's not good.

Let's implement authentication in our application.

First, let's head over to the dashboard and turn on some authentication. We'll be using 4 forms of authentication.

- Email and password authentication
- Google sign-in
- Github sign-in
- Facebook sign-in
  
Let's enable this on firebase console.

Google authentication will not require to register our app explicitly.
but for github and facebook sign-in we will have to register our app in their consoles and from there we will get `App-Id` and `App-secret`, which you can store in the sign-in-method tab of the authentication in firebase console.

### Writing the current user up to the application state

```js
  const [user, setUser] = useState({
    user: null
  })
```

Cool.We have a `CurrentUser`, `SignIn`, and `SignUp` components ready to rock.

We're going to start with Google Sign-in because I can assume you have a Google account if you can create a Firebase application.

In `firebase.js`:

```js
import 'firebase/auth';

// ...
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
// there is signInWithRedirect method also which will redirect to the google sign in page.
export const googleSignIn = () => auth.signInWithPopup(provider);
```

In `SignIn.jsx`

```js
<button onClick={googleSignIn}>Sign In With Google</button>
```

same goes with facebook and github sign in.

- create new the provider with respective sign in.
- i.e export const provider = new firebase.auth.FacebookAuthProvider()

- create the method to pass the provider in the signInWithPopup or signInWithRedirect function.
- i.e export const facebookSignIn = () => auth.signInWithPopup(provider)

### Updating Based on Authentication State

In `App.js`

```js
useEffect(()=>{
  let unsubscribeFromFirestore = null;
  let unsubscribeFromAuth = null;

  const getData = async ()=>{
    unsubscribeFromFirestore = await firestore.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot=>{
      const posts = snapshot.docs.map(collectIdAndData);
      setState({posts});
    });
  };

  const getAuth = async ()=>{
    // OnAuthStateChanged method is for when user login, we will get user information and when user logout then user will set back to null.
    unsubscribeFromAuth = await auth.onAuthStateChanged(user=>{
      setState({user});
    })
  }

  getData();
  getAuth();

  return ()=>{
    unsubscribeFromFirestore();
    unsubscribeFromAuth();
  }

},[])

```

### SignOut

In `firebase.js`

```js
export const signOut = () => auth.signOut();
```

Now In `CurrentUser.jsx`

```js
<button onClick={signOut}>Sign Out</button>
```

## Security Rules

Up until now, everything has been wide open. That's not great. If we are going to push stuff to production, we're going to need to start adding some security to our application.

Cloud Firestore rules always following this structure:

```javascript
service.cloud.firestore {
  match /databases/{database}/documents{
    // ..
  }
}
```

There is a nice query pattern for rules:

```js
service.cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if <Condition>;
      allow write: if <Condition>;
    }
  }
}
```

You can combine them into one:

```js
service.cloud.firestore {
  match /databases/{database}/documents{
    match /posts/{postId}{
      allow read, create, update: if <condition>;

    }
  }
}
```

You can get a bit more granular if you'd like:

- `read` - Applies to both lists and documents.
  - `get` - When reading a single document.
  - `list` - When querying a collection.
- `write` - Applies rule to create, update, and delete.
  - `create` - When setting new data with `docRef.set()` or `collectionRef.add()`
  - `update` - When updating data with `docRef.update()` or `set()`
  - `delete` - When deleting data with `docRef.delete()`

You can nest rules to sub-collections:

```js
service.cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId}{
      match /comments/{comment}{
        allow read, write: if <condition>;
      }
    }
  }
}
```

If you want to go to arbitrary depth, then you can do {document=**}.

**Important**: If multiple requests match, then the operation is allowed if any of them is true.

### Validating Based on the document

- `resource.data` will have the fields on the document as it stored in the database.
- `request.resource.data` will having the incoming document. (**Note**: This is all you have if you're responding to document creation.)

### Some Practical Examples

Only read or write if you are logged in.

```javascript
service.cloud.firestore {
  match /databases/{database}/document{
    // Allow the user to access documents in the "posts" collection
    // only if they are authenticated
    match /posts/{postId} {
      allow read, write: if request.auth.id != null;
    }
  }
}
```

Secure by owner, Has-one Relationship

Only read and write your own data:

```js
service.cloud.firestore{
  match /databases/{database}/document{
    match /users/{userId} {
      allow read, update, delete: if belongsTo(userId);
      allow create: if request.auth.uid != null;

      function belongsTo(userId){
          return request.auth.uid == userId;
      }
    }
  }
}
```

Create a rule that insists on title

```js
service.cloud.firestore{
  match /databases/{database}/document{
    match /posts/{postId}{
      allow read;
      allow create: if request.auth.uid != null && !request.resource.data.title;
      allow update, delete: if request.auth.uid == resource.data.user.uid;
    }
  }
}

```

### Secure by Owner, Has-Many Relationship

Sometimes a user will own many documents in a collection, so the Document ID will be different than the User ID. In this case, we can look at the request (create) and or the existing resource (delete), assuming it has a `uid` property to track the relationship. Example: user has-many posts.

```js
service.cloud.firestore{
    match /databases/{database}/document{
        match /posts/{postId}{
            allow write: if requestMatchesUID();
            allow update: if requestMatchesUID() && resourceMatchesUID();
            allow delete: if resourceMatchesUID();
        }

        function requestMatchesUID(){
            return request.auth.uid == request.resource.data.uid;
        }

        function resourceMatchesUID(){
            return request.auth.uid == request.data.uid;
        }
    }
}

```

Make all Collections Readable or Writable - Except One

Let’s imagine you create collection names dynamically and want them to be unlocked by default. However, you have a special collection that requires strict rules. You start by locking down all paths, then dynamically pass the collection name in a rule. If the name does not equal the special collection then allow the operation.

```js
service.cloud.firestore{
    match /{document=**}{
        allow read, write: if false;
    }

    match /{collectionName}/{docId}{
        allow read: if collectionName != 'special-collection';
    }
}
```

### Some Common Functions

```js
service cloud.firestore {
  match /databases/{database}/documents {


    function isSignedIn() {
      return request.auth != null;
    }
    function emailVerified() {
      return request.auth.token.email_verified;
    }
    function userExists() {
      return exists(/databases/$(database)/documents/users/$(request.auth.uid));
    }

    // [READ] Data that exists on the Firestore document
    function existingData() {
      return resource.data;
    }
    // [WRITE] Data that is sent to a Firestore document
    function incomingData() {
      return request.resource.data;
    }

    // Does the logged-in user match the requested userId?
    function isUser(userId) {
      return request.auth.uid == userId;
    }

    // Fetch a user from Firestore
    function getUserData() {
      return get(/databases/$(database)/documents/accounts/$(request.auth.uid)).data
    }

    // Fetch a user-specific field from Firestore
    function userEmail(userId) {
      return get(/databases/$(database)/documents/users/$(userId)).data.email;
    }


    // example application for functions
    match /orders/{orderId} {
      allow create: if isSignedIn() && emailVerified() && isUser(incomingData().userId);
      allow read, list, update, delete: if isSignedIn() && isUser(existingData().userId);
    }

  }
}

```

### Accessing Other documents

- `exists(/databases/$(database)/documents/users/$(request.auth.uid))` will verify that a document exists.
- `get(/databases/$(database)/documents/users/$(request.auth.uid)).data` will get you the data of another document.

### Data Validation

Now let’s combine some of the functions created earlier to build a robust validation rule. By chaining together rules with `&&` we can validate the data structure of multiple fields as an `AND` condition. We can also use `||` for OR conditions.

```js

// allow update: if isValidProduct();
function isValidProduct() {
  return incomingData().price > 10 && incomingData().name.size() < 50 && incomingData().category in ['widgets', 'things'] && existingData().locked == false && getUserData().admin == true
}
```

- You can limit the size of a query so that malicious users (or you after a big lunch) can't run expensive queries
  - `allow list: if request.query.limit <= 10;`

### Time-Based Rules Examples

Firestore also includes a `duration` helper to generate dates that can be operated upon. For example, we might want to throttle updates to 1 minute intervals. We can create this rule by comparing the `request.time` to a timestamp on the document + the throttle duration.

```js
// allow update: if isThrottled() == false;

function isThrottled() {
  return request.time < resource.data.lastUpdate + duration.value(1, 'm')
}

```

## Implementing Sign In with Email Authentication

In `SignUp.jsx`

```js

const handleSubmit = async (event) =>{
  event.preventDefault();
  const { displayName, email, password} = signUpState;
  try{
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    user.updateProfile({displayName})
  }
  catch(error){
    console.error(error.message);
  }
  setSignUpState({ displayName: '', email: '', password: '' })
}

```

Now this has some problems

- The display name would not update immediately, because see in try block we are creating user with passing email and password first and then we are updating profile of user with `displayName`;
- There is not `photoURL` which we are getting free from google signIn or facebook signIn.
- we may want to store other information beyond what we get from user profile.

Now what we can do?
we can create documents for user profile in Cloud Firestore.

## Storing User Profile in Cloud Firestore

The information on the user object seems great, but we going to run into limitations *real* quick.

- What if we want to let the user set bio or something?
- What if we want to set admin permissions on the users?
- What if we want to keep track of posts a user has liked?

There are many more possibilities, right?

The solution is, we will make documents based off the users uid in Cloud firestore.

In `firebase.js`

```js
export const createUserProfileDocument = async (user, additionalData)=>{
  // If there is no user, let's not create his document.
  if(!user) return;

  // Getting a reference to the location in the firestore where the user document may or may not exist.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch document from that location
  const snapshot = await userRef.get();

  // If there is not a document for the user. Let's use information that we got from either Google or our sign in form.

  if(!snapshot.exists){
    const {displayName, email, photoURL} = user;
    const createdAt =  new Date().toUTCString();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch(error){
      console.error("Error Creating User",error.message);
    }
  }

  // Get the document and return it, since that's we are likely want to do next.
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid)=>{

  if(!uid) return null;
  try{
    // Getting uid of the users document
    const userDocument = await firestore.collection('users').doc('uid').get();

    // Returning uid and all the saved data in the user document.
    return { uid , ...userDocument.data()}
  }
  catch(error){
    console.error("Error Fetching User", error.message);
  }
}
```

I am going to put it into two places:

- `onAuthStateChanged` in order to get google sign Ups
- In `handleSubmit` in `SignUp` because there's we will display custom displayName.

### Updating Security Rules

```js
match /users/{userId} {
  allow read;
  allow write: if request.auth.uid == userId;
}
```

## Modern State Management in React with Firebase

We have a small bug. For our first-time email users, we'll still get null for their display name.

We could solve all of this by passing everything down from the Application component, but I feel like we might be able do a little better.

We could wrap everything in HOCs, but that might also end us up in a position where we make additional queries to Cloud Firestore. This isn't ideal, but it's probably not the biggest problem in the world.

We could use something big like Redux. But that for some other project.

But for this, I am using Context API.
As currently firebase does our actions in the state, that's why I am not using any useReducer, but who knows in future I will.

In `PostProvider.jsx`

```js
import React, { createContext, useState, useEffect } from 'react';
import { firestore} from '../firebase';
import { collectIdAndData} from '../utilities'

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [state, setState] = useState({
    posts: [],
  });
  
  useEffect(() => {
    let unsubscribeFromFirestore = null;

    const getData = async () => {
      unsubscribeFromFirestore = await firestore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          const posts = snapshot.docs.map(collectIdAndData);
          setState({ posts });
      });
    };

    getData();
    return () => {
    unsubscribeFromFirestore();
    };
  }, []);
  const { posts } = state;

  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};

export default PostProvider;

```

Hooking up the Post Provider

In `index.js`:

```js
import PostsProvider from './contexts/PostsProvider';

ReactDOM.render(
  <PostsProvider>
    <App/>
  </PostsProvider>,
  document.getElementById('root'),
);

```

Now in `Post.jsx`

```js
import React, { useContext } from 'react';
import { PostContext } from '../Context/PostsProvider';
import AddPost from './AddPost';
import Post from './Post';

function Posts() {
  const posts = useContext(PostContext);
  return (
  <section className="posts">
    <AddPost />
      {posts.map((post) => (
      <Post {...post} id={post.id} key={post.id} />)
      )}
  </section>);
}

export default Posts;

```

Similarly for our User's state,

In `UserProvider.jsx`

```js

import React, { createContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    userLoaded: true,
  });

  useEffect(() => {
    let unsubscribeFromAuth = null;

    const getAuth = async () => {
      unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        const user = await createUserProfileDocument(userAuth);
        // console.log(user);
        setState({ user, userLoaded: false });
      });
    };

    getAuth();
    return () => {
      unsubscribeFromAuth();
    };
  }, []);


  const { user, userLoaded } = state;

  return (
    <UserContext.Provider value={{ user, userLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

```

Now similarly wrapping `UserProvider` component in `index.js`

```js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import PostProvider from './Context/PostsProvider';
import UserProvider from './Context/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    <PostProvider>
      <UserProvider>
      <App />
      </UserProvider>
    </PostProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

```

Now in `Authentication.js`

```js

import React, { useContext } from 'react'
import SignInAndSignUp from './SignInAndSignUp';
import CurrentUser from './CurrentUser';
import { UserContext } from '../Context/UserProvider';


function Authentication() {
    const {user, userLoaded} = useContext(UserContext);
    if(userLoaded) return null;
    // console.log(user);
    return (
        <div>
            {user ? <CurrentUser {...user}/> : <SignInAndSignUp/>}
        </div>
    )
}

export default Authentication
```

## Some UI Changes
