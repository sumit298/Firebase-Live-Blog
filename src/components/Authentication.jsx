import React, { useContext } from 'react'
import SignInAndSignUp from './SignInAndSignUp';
import CurrentUser from './CurrentUser';
import { UserContext } from '../Context/UserProvider';


function Authentication() {
    const {user, userLoaded} = useContext(UserContext);
    // if(userLoaded) return null;
    // console.log(user);
    return (
        <div>
            {user ? <CurrentUser {...user}/> : <SignInAndSignUp/>}
        </div>
    )
}

export default Authentication
