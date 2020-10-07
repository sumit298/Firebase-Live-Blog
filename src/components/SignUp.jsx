import React, { useState } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

function SignUp() {
	const [signUpState, setSignUpState] = useState({
		displayName: '',
		email: '',
		password: '',
	});
	const handleChange = (event) => {
		const { name, value } = event.target;
		setSignUpState({ ...signUpState, [name]: value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const { displayName, email, password } = signUpState;
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			createUserProfileDocument(user, { displayName });
		} catch (error) {
			console.error(error);
		}
		setSignUpState({ displayName: '', email: '', password: '' });
	};
	const { displayName, email, password } = signUpState;
	return (
		<form className="SignUp" onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			<input
				type="text"
				name="displayName"
				value={displayName}
				placeholder="Please Enter your name"
				onChange={handleChange}
			/>
			<input
				type="text"
				name="email"
				value={email}
				placeholder="Email"
				onChange={handleChange}
			/>
			<input
				type="password"
				name="password"
				value={password}
				placeholder="Password"
				onChange={handleChange}
			/>
			<input type="submit" value="Sign Up" />
		</form>
	);
}

export default SignUp;
