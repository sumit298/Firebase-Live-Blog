import React from 'react'
import SignInAndSignUp from './SignInAndSignUp';
import CurrentUser from './CurrentUser';

function Authentication({user, loading}) {
    if(loading) return null;
    return (
        <div>
            {user ? <CurrentUser/> : <SignInAndSignUp/>}
        </div>
    )
}

export default Authentication
