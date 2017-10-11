import { h, Component } from 'preact';
import { route  } from 'preact-router';
// import { Link } from 'preact-router/match';
import style from './style';
import { connect } from 'mobx-preact';
import fetch from 'unfetch';

@connect(['movieStore'])
export default class Header extends Component {

	searchMovie = event => {
		// Search That Bitch
		event.preventDefault();
		const type = event.target.searchText.value;
		if (type.trim() === ''){
			return false;
		}
		this.props.movieStore.searchValue = type;
		const v3 = this.props.movieStore.v3_key;
		const url = `https://api.themoviedb.org/3/search/movie?api_key=${v3}&query=${type}&language=en-US&page=1&include_adult=false`;
		fetch(url,{
			method: 'GET',
			headers: {}
		}).then( r => r.json() ).then(data => {
			const movies = data.results;
			this.props.movieStore.results = movies;
			this.props.movieStore.headerActive = true;
			route(`/${type}`);
		});

	}

	goBack = () => {
		this.props.movieStore.results = null;
		route(`/`);
	}


	render( { movieStore } , { searched } )  {
		const backButton = movieStore.headerActive ? true : false; // eslint-disable-line
		const headerClass = movieStore.headerActive ? '' : style.activeHeader;
		return (
			<header class={`${style.header} ${headerClass}`}>
				{ backButton ?
					( <input  type="submit" onClick={this.goBack} value="Back" class={`${style.inline} ${style.button}`} />)
					:
					('')
				}
				<form onSubmit={this.searchMovie} class={`${style.inline}`}>
					<div class="field">
						<div class="control">
							<input id="searchText" class={`${style.search} input is-medium`} type="text" placeholder="Search Movie" value={movieStore.searchValue} />
						</div>
					</div>
				</form>
			</header>
		);
	}
}