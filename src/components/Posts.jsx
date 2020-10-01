import React from "react";
import AddPost from "./AddPost";
import Post from "./Post";

function Posts({ posts, onCreate, onRemove }) {
  return (
    <section className="posts">
      <AddPost onCreate={onCreate} />
      {posts.map((post) => (
        <Post {...post} id={post.id} key={post.id} onRemove={onRemove} />
      ))}
    </section>
  );
}

export default Posts;
