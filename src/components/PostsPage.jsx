import React, { useEffect, useState } from "react";
import Post from "./Post";
import Comments from "./Comments";
import { firestore } from "../firebase";
import { collectIdAndData } from "../utilities";
import { withRouter } from "react-router-dom";

const PostPage = (props) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  // Some helper functions
  const postId = () => {
    return props.match.params.id;
  };

  const postRef = () => {
    return firestore.doc(`/posts/${postId()}`);
  };

  const commentsRef = () => {
    const commentRefs = postRef().collection("comments");
    // console.log(commentRefs);
    return commentRefs;
  };

  useEffect(() => {
    let unsubscribeFromComment = null;
    let unsubscribeFromPost = null;

    const getPost = async () => {
      unsubscribeFromPost = await postRef().onSnapshot((snapshot) => {
        const posts = collectIdAndData(snapshot);
        // console.log(posts);
        setPost(posts);
      });
    };

    const getComments = () => {
      unsubscribeFromComment = commentsRef().onSnapshot((snapshot) => {
        const comments = snapshot.docs.map(collectIdAndData);
        console.log(comments);
        setComments(comments);
      });
    };
    getPost();
    getComments();
    return () => {
      unsubscribeFromPost();
      unsubscribeFromComment();
    };
  }, []);

  const createComment = (comment) => {
    commentsRef().add({
      ...comment
    })
  };

  return (
    <section>
      {post && <Post {...post} />}
      <Comments comments={comments} onCreate={createComment} />
    </section>
  );
};

export default withRouter(PostPage);
