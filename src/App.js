import React from 'react';
import { useState, useEffect } from 'react';
import Posts from './components/Posts';
import { firestore } from './firebase';

function App() {
	const [state, setState] = useState({
		posts: [
			{
				id: '1',
				title: 'A Very Hot Take',
				content:
					'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
				user: {
					uid: '123',
					displayName: 'Bill Murray',
					email: 'billmurray@mailinator.com',
					photoURL: 'https://www.fillmurray.com/300/300',
				},
				stars: 1,
				comments: 47,
			},
			{
				id: '2',
				title: 'The Sauciest of Opinions',
				content:
					'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!',
				user: {
					uid: '456',
					displayName: 'Mill Burray',
					email: 'notbillmurray@mailinator.com',
					photoURL: 'https://www.fillmurray.com/400/400',
				},
				stars: 3,
				comments: 0,
			},
		],
	});
  // snapshot = current state of the database in the firebase firestore.
	useEffect(() => {
		const posts = firestore.collection('posts').get().then(snapshot=>{
      console.log({snapshot});

    });
	},[]);
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
