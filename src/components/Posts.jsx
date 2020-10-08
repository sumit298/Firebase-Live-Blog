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
				<Post {...post} id={post.id} key={post.id} />
			))}
		</section>
	);
}

export default Posts;
