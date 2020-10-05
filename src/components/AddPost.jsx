import { firestore, auth } from '../firebase';
import React, { useState } from 'react';

const AddPost = () => {
	const [post, setPost] = useState({ title: '', content: '' });
	const handleSubmit = (event) => {
		event.preventDefault();

		const { title, content } = post;
		const { uid, displayName, email, photoURL } = auth.currentUser || {};
		const defaultPost = {
			// not any need of id because of firebase id autoGenerates.
			// id: Date.now().toString(),
			title,
			content,
			user: {
				uid,
				displayName,
				email,
				photoURL,
			},
			favorites: 0,
			comments: 0,
			createdAt: new Date().toUTCString(),
		};

		firestore.collection('posts').doc().set(defaultPost);
		setPost({ content: '', title: '' });
	};
	const handleChange = (event) => {
		const { name, value } = event.target;
		setPost({ ...post, [name]: value });
	};
	const { title, content } = post;
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="title"
				placeholder="Title"
				value={title}
				onChange={handleChange}
			/>
			<input
				type="text"
				name="content"
				placeholder="Content"
				value={content}
				onChange={handleChange}
			/>
			<input className="create" type="submit" value="Create Post" />
		</form>
	);
};

export default AddPost;


// service cloud.firestore {
// 	match /databases/{database}/documents {
// 	  match /posts/{postId} {
// 		allow read;
// 		allow create: if request.auth.uid != null;
// 		allow update, delete: if request.auth.uid == resource.data.user.uid;
// 	  }
// 	}
//   }