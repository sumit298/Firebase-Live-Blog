import React from 'react';
import AddPost from './AddPost';
import Post from './Post';

function Posts({ posts }) {
  // console.log(posts);
	return (
		<section className="posts">
			<AddPost />
			{posts.map((post) => {
        return <Post {...post} id={post.id} key={post.id} />;
        
			})}
		</section>
	);
}

export default Posts;
