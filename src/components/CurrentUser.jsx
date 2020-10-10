import React from 'react';
import moment from 'moment';
import { signOut } from '../firebase';
// Children???
function CurrentUser(props)
 {
	 const { displayName,
		email,
		photoURL,
		createdAt, children} = props;
		// console.log(metadata);
	return (
		<section className="CurrentUser">
			<div className="CurrentUser--profile">
				{photoURL && <img src={photoURL} alt={displayName} />}
				<div className="CurrentUser--information">
					<h2>{displayName}</h2>
					<p className="email">{email}</p>
					<p className="created-at">{moment(createdAt).calendar()}</p>
					{/* <p className="last-sign-in">{metadata.lastSignInTime}</p> */}
				</div>
			</div>
			<div>{children}</div>
			<button onClick={signOut}>Sign Out</button>
		</section>
	);
}


export default CurrentUser;
