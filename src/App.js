import React from 'react';
import Authentication from './components/Authentication';
import Posts from './components/Posts';
import { Switch, Route, Link } from 'react-router-dom';
import UserProfile from './UserProfile';

function App() {
	return (
		<main className="Application">
			<Link className="links" to="/"><h1>My Blogger</h1></Link>

			<Authentication />
			<Switch>
				<Route exact path="/profile" component={UserProfile}></Route>
				<Route exact path="/" component={Posts}></Route>
			</Switch>
		</main> 
	);
}

export default App;
