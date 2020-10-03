import React from 'react';
import { useState, useEffect } from 'react';
import Posts from './components/Posts';
import { firestore } from './firebase';
import { collectIdAndData } from './utilities';

function App() {
	const [state, setState] = useState({
		posts: [],
	});
	// snapshot = current state of the database in the firebase firestore.
	useEffect(() => {
		let unsubscribe = null;
		const getData = async () => {
			unsubscribe = await firestore
				.collection('posts')
				.orderBy('createdAt', 'desc')
				.onSnapshot((snapshot) => {
					const posts = snapshot.docs.map(collectIdAndData);
					setState({ posts });
				});
		};
		getData();
		return () => {
			unsubscribe();
		};
	}, []);

	const { posts } = state;
	return (
		<main className="Application">
			<h1>My Blogs</h1>
			<Posts posts={posts} />
		</main>
	);
}

export default App;
