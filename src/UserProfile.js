import { auth } from './firebase';
import React, { useRef, useState } from 'react';
import { firestore } from './firebase';

const UserProfile = () => {
	const [state, setState] = useState({
		displayName: '',
	});

	const imageInput = useRef(null);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setState({ [name]: value });
	};

	const uid = () => {
		return auth.currentUser.uid;
	};

	const userRef = () => {
		return firestore.doc(`users/${uid()}`);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const { displayName } = state;
		if (displayName) {
			userRef().update({
				displayName,
			});
		}
	};

	const { displayName } = state;
	return (
		<section className="UserProfile">
			<form onSubmit={handleSubmit} className="UpdateUser">
				<input
					type="text"
					name="displayName"
					value={displayName}
					onChange={handleChange}
					placeholder="Enter display name."
				/>
				<input type="file" ref={imageInput.current} name="image-upload" />
				<input className="update" type="submit" />
			</form>
		</section>
	);
};

export default UserProfile;
