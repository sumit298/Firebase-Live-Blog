import React, { useEffect, useState } from "react";
import Post from "./Post";
import Comments from "./Comments";
import { firestore } from "../firebase";
import { collectIdAndData } from "../utilities";
import { withRouter } from "react-router-dom";
import withUserHOC from "./withUserHOC";

const PostPage = (props) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  // console.log(props);
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
        // console.log(comments);
        setComments(comments);
      });
    };
    getPost();
    getComments();
    return () => {
      unsubscribeFromPost();
      unsubscribeFromComment();
    };
    
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createComment = (comment) => {
    const {user} = props.user;
    commentsRef().add({
      ...comment,
      user
    })
  };

  return (
    <section>
      {post && <Post {...post} />}
      <Comments comments={comments} onCreate={createComment} />
    </section>
  );
};

export default withRouter(withUserHOC(PostPage));
