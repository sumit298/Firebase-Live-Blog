import React, { useState } from "react";

const AddPost = ({ onCreate }) => {
  const [post, setPost] = useState({ title: "", content: "" });
  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, content } = post;
    const defaultPost = {
      // not any need of id because of firebase id autogenerates.
      // id: Date.now().toString(),
      title,
      content,
      user: {
        uid: "1111",
        displayName: "Sumit Sinha",
        email: "sumit@gmail.com",
        photoURL: "http://placekitten.com/g/200/200",
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date().toUTCString(),
    };

    onCreate(defaultPost);
    setPost({ content: "", title: "" });
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
