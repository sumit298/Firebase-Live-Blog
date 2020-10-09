import React, { createContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [state, setState] = useState({
		user: null,
		userLoaded: true,
	});

	useEffect(() => {
		let unsubscribeFromAuth = null;

		const getAuth = async () => {
			unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
				const user = await createUserProfileDocument(userAuth);
				// console.log(user);
				setState({ user, userLoaded: false });
			});
		};

		getAuth();
		return () => {
			unsubscribeFromAuth();
		};
	}, []);

	const { user, userLoaded } = state;

	return (
		<UserContext.Provider value={{ user, userLoaded }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
