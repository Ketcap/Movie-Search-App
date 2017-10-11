import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Search from '../routes/search';
import Home from '../routes/home';
import Movie from '../routes/movie'
import { Provider } from 'mobx-preact';
import { observable } from 'mobx';
require('preact/devtools');

let movieStore = observable({
	v3_key: '6960b557a12d8e6dbee6840893d6af67',
	searchValue: null,
	results: false,
	movie: false,
	headerActive: false
});

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
		if (e.url.length === 1){
			movieStore.headerActive = false;
		}
	};
	render() {
		return (
			<Provider movieStore={movieStore}>
				<div id="app">
					<Header />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Search path="/:query" />
						<Movie path="/m/:id/:movie" />
					</Router>
				</div>
			</Provider>
		);
	}
}
