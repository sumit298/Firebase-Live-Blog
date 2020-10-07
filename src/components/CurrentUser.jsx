import React from 'react';
import moment from 'moment';
import { signOut } from '../firebase';
// Children???
function CurrentUser({
	// metadata,
	displayName,
	email,
	photoURL,
	createdAt,
	children,
}) {
	return (
		<section className="CurrentUser">
			<div className="CurrentUser--profile">
				{photoURL && <img src={photoURL} alt={displayName} />}
				<div className="CurrentUser--information">
					<h2>{displayName}</h2>
					<p className="email">{email}</p>
					<p className="created-at">{moment(createdAt.toDate()).calendar()}</p>
					{/* <p className="last-sign-in">{metadata.lastSignInTime}</p> */}
				</div>
			</div>
			<div>{children}</div>
			<button onClick={signOut}>Sign Out</button>
		</section>
	);
}


export default CurrentUser;
