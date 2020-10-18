import React from 'react';
import moment from 'moment';

function Comment({ content, user, createdAt }) {
	return (
		<article className="Comment">
			<span className="Comment--author">{user.displayName}</span>
			<span className="Comment--content">{content}</span>
			<span className="Comment--timestamp">{moment(createdAt).calendar()}
			</span>
		</article>
	);
}

Comment.defaultProps = {
	title: 'An Incredibly Hot Take',
	content:
		'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.',
	user: {
		displayName: 'Sumit Sinha',
		email: 'sumitssss@gmail.com',
		photoURL: 'https://www.fillmurray.com/300/300',
	},
	createdAt: new Date(),
};

export default Comment;
