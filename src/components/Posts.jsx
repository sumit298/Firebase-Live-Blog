import React from "react";
import AddPost from "./AddPost";
import Post from "./Post";

function Posts({ posts, onCreate }) {
  return (
    <section className="posts">
      <AddPost onCreate={onCreate} />
      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </section>
  );
}

export default Posts;
