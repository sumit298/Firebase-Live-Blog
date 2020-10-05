import React from 'react';
import { useState, useEffect } from 'react';
import Authentication from './components/Authentication';
import Posts from './components/Posts';
import { firestore, auth } from './firebase';
import { collectIdAndData } from './utilities';

function App() {
	const [state, setState] = useState({
		posts: [],
	});
	const [user, setUser] = useState({
		user: null,
		userLoaded: false
	});

	// snapshot = current state of the database in the firebase firestore.
	useEffect(() => {
		let unsubscribeFromFirestore = null;
		let unsubscribeFromAuth = null;

		const getData = async () => {
			unsubscribeFromFirestore = await firestore
				.collection('posts')
				.orderBy('createdAt', 'desc')
				.onSnapshot((snapshot) => {
					const posts = snapshot.docs.map(collectIdAndData);
					setState({ posts });
				
				});
		};
		const getAuth = async () => {
			unsubscribeFromAuth = await auth.onAuthStateChanged((user) => {
				console.log(user);
				setUser({ user, userLoaded: true });
			});
		};

		getData();
		getAuth();
		return () => {
			unsubscribeFromFirestore();
			unsubscribeFromAuth();
		};
	}, []);

	return (
		<main className="Application">
			
			<Authentication user={user.user} />
			<Posts posts={state.posts} />
		</main>
	);
}

export default App;
