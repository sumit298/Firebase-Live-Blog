import React from 'react';
import AddComment from './AddComment';
import Comment from './Comment';
function Comments({ onCreate, comments }) {
	return (
		<section className="Comments">
			<AddComment onCreate={onCreate} />
			{comments.map((comment) => (
				<Comment {...comment} key={comment.id} />
			))}
		</section>
	);
}

export default Comments;
