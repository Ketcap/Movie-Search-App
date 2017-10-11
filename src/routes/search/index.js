import { h, Component } from 'preact';
import style from './style';
import { connect } from 'mobx-preact';
import { getCurrentUrl , route } from 'preact-router';
import Loading from '../../components/loading/';
 
@connect(['movieStore'])
export default class Search extends Component {
	linkToMovie(event,m){
		const link = `/m/${m.id}/${m.title}`;
		route(link);
	}
	componentDidMount(){
		// If url is directly visited instead search bar
		if (!this.props.movieStore.results){
			const current = getCurrentUrl().split('/');
			const type = decodeURIComponent(current[1]);
			this.props.movieStore.searchValue = type;
			const v3 = this.props.movieStore.v3_key;
			const url = `https://api.themoviedb.org/3/search/movie?api_key=${v3}&query=${type}&language=en-US&page=1&include_adult=false`;
			console.log(type);
			fetch(url,{
				method: 'GET',
				headers: {}
			}).then( r => r.json() ).then(data => {
				const movies = data.results;
				this.props.movieStore.results = movies;
				this.props.movieStore.headerActive = true;
			});
		}
	
	}

	render( { movieStore } , { linkToMovie } ) {
		const activeClass = movieStore.headerActive ? style.active : '';
		if (movieStore.results){
			 return (
				<div class={`${style.home} ${activeClass}`}>
					
					{movieStore.results.map(movie => {
						if (movie.poster_path){
							return (<div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})` }}>
								<a //eslint-disable-next-line
								onClick={(event) => this.linkToMovie(event,movie) }>{movie.original_title}</a>
							</div>
							);
						}
						
					})
					}
				</div>
			);
		}
		return (
			<div class={`${style.loading}`}>
				<Loading />
			</div>
		);
		
		
	}
}