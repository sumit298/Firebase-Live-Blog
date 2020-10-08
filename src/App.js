import React from 'react';
import Authentication from './components/Authentication';
import Posts from './components/Posts';

function App() {
	return (
		<main className="Application">
			<Authentication />
			<Posts />
		</main>
	);
}

export default App;
