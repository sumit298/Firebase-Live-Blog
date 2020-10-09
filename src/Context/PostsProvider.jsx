import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collectIdAndData } from '../utilities';

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
