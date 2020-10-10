import React, { useContext } from 'react';

import moment from 'moment';

import { firestore } from '../firebase';
import { UserContext } from '../Context/UserProvider';

const Post = ({ id, title, content, user, createdAt, stars, comments }) => {
	const currentUser = useContext(UserContext);
	const belongsToCurrentUser = (currentUser, postAuthor) => {
		if (!currentUser) return false;
		return currentUser.uid === postAuthor.uid;
	};
	const postRef = firestore.doc(`posts/${id}`);
	const remove = () => postRef.delete();
	const addStar = () =>
		postRef.update({
			stars: stars + 1,
		});

	return (
		<article className="Post">
			<div className="Post-content">
				<h2>{title}</h2>
				<div style={{ fontSize: '1.2rem', margin: '15px 0' }}>{content}</div>
			</div>
			<div className="Post--meta">
				<div>
					<p>
						<span role="img" aria-label="star">
							⭐️
						</span>
						{stars}
					</p>
					<p>
						<span role="img" aria-label="comments">
							🙊
						</span>
						{comments}
					</p>
					<p>Posted by {user.displayName}</p>
					<p>{moment(createdAt).calendar()}</p>
				</div>
				<div>
					<button onClick={addStar} className="star">
						Star
					</button>
					{belongsToCurrentUser(currentUser.user, user) && (
						<button className="delete" onClick={remove}>
							Delete
						</button>
					)}
				</div>
			</div>
		</article>
	);
};

Post.defaultProps = {
	user: {
		id: '123',
		displayName: 'Sunny',
		email: 'billmurray@mailinator.com',
		photoURL: 'https://www.fillmurray.com/300/300',
	},

	stars: 0,
	comments: 0,
};

export default Post;
