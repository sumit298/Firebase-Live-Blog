import React, { createContext, useState, useEffect } from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    // userLoaded: true,
  });

  useEffect(() => {
    let unsubscribeFromAuth = null;

    const getAuth = async () => {
      unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot((snapshot) => {
            setState({ user: { uid: snapshot.id, ...snapshot.data() } });
          });
          // console.log(user);
          setState({ user: userAuth });
        }
      });
    };

    getAuth();
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  const { user } = state;


  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
