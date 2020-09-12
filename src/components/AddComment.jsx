import React from "react";
import { useState } from "react";

const AddComment = () => {
  const [comment, setComment] = useState({ content: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setComment({ content: "" });
  };

  const { content } = comment;
  return (
    <form onSubmit={handleSubmit} className="AddComment">
      <input
        type="text"
        value={content}
        placeholder="Comment"
        onChange={handleChange}
        name="content"
      />
      <input type="submit" value="Create Comment" />
    </form>
  );
};

export default AddComment;
