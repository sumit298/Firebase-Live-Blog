import React from 'react';
import { useState, useEffect } from 'react';
import Posts from './components/Posts';
import { firestore } from './firebase';

function App() {
	const [state, setState] = useState({
		posts: [
],
	});
	// snapshot = current state of the database in the firebase firestore.

	useEffect(() => {
		const getData = async () => {
			const snapShot = await firestore.collection('posts').get();

			const posts = snapShot.docs.map(doc=> ({id: doc.id, ...doc.data()}));
			setState({posts})

				
		};
		getData();
	}, []);

	const handleCreate = (post) => {
		const { posts } = state;
		setState({ posts: [...posts, post] });
	};
	const { posts } = state;
	return (
		<main className="Application">
			<h1>My Blogs</h1>
			<Posts posts={posts} onCreate={handleCreate} />
		</main>
	);
}

export default App;
