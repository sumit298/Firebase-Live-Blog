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
		const getData = async () => {
			const snapShot = await firestore.collection('posts').get();

			const posts = snapShot.docs.map(collectIdAndData);
			setState({posts})

				
		};
		getData();
	}, []);

	const handleCreate =  async(post) => {
		const { posts } = state;
		const docRef = await firestore.collection('posts').add(post);
		const doc = await docRef.get();
		const newPost = collectIdAndData(doc)
		setState({ posts: [...posts, newPost] });
	};

	const handleRemove = async (id)=>{
		const allPosts = state.posts;

		await firestore.doc(`posts/${id}`).delete()
		const posts = allPosts.filter(post=> post.id !== id);
		setState({posts});
		console.log(posts);
	}

	const { posts } = state;
	return (
		<main className="Application">
			<h1>My Blogs</h1>
			<Posts posts={posts} onCreate={handleCreate} onRemove={handleRemove} />
		</main>
	);
}

export default App;
