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
	});

	// snapshot = current state of the database in the firebase firestore.
	useEffect(() => {
		let unsubscribeFromFirebase = null;
		let unsubscribeFromAuth = null;

		const getData = async () => {
			unsubscribeFromFirebase = await firestore
				.collection('posts')
				.orderBy('createdAt', 'desc')
				.onSnapshot((snapshot) => {
					const posts = snapshot.docs.map(collectIdAndData);
					setState({ posts });
					console.log(posts);
				});
		};
		const getAuth = async () => {
			unsubscribeFromAuth = await auth.onAuthStateChanged((user) => {
				console.log(user);
				setUser({ user });
			});
		};

		getData();
		getAuth();
		return () => {
			unsubscribeFromFirebase();
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
