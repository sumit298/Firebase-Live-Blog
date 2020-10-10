import { auth } from './firebase';
import React, { useState } from 'react';
import { firestore } from 'firebase';

const UserProfile = () => {
	const [state, setState] = useState({
		displayName: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setState({ [name]: value });
	};

	const getUID = () => {
		return auth.currentUser.uid;
	};

	const userReferenceFromFirestore = () => {
		return firestore.collection(`users/${getUID}`);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const { displayName } = state;
	return (
		<section className="UserProfile">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="displayName"
					value={displayName}
                    onChange={handleChange}
                    placeholder="Enter display name."
				/>
			</form>
		</section>
	);
};

export default UserProfile;
