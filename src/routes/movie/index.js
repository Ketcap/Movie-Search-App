import { h , Component } from 'preact';
import style from './style';
import { connect } from 'mobx-preact';
import { getCurrentUrl } from 'preact-router';
import Loading from '../../components/loading/';

@connect(['movieStore'])
export default class Movie extends Component{
	state = {
		video: false
	}

	handleModal(event,video){
		event.preventDefault();
		const videoState = this.state.video ? false : video;
		this.setState({
			video: videoState
		});
	}

	componentDidMount(){
		this.props.movieStore.movie = false;
		this.props.movieStore.headerActive ? null : (this.props.movieStore.headerActive = true);
		const current = getCurrentUrl().split('/');
		const id = decodeURIComponent(current[2]);
		this.props.movieStore.searchValue = decodeURIComponent(current[3]);
		const v3 = this.props.movieStore.v3_key;
		const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${v3}&language=en-US&append_to_response=videos,credits`;
		fetch(url,{
			method: 'GET',
			headers: {}
		}).then( r => r.json() ).then(data => {
			this.props.movieStore.movie = data;
		});
	}


	render( { movieStore } , { handleModal , video } ){
		const v = video;
		const movie = movieStore.movie ? movieStore.movie : false;
		if (movie){
		 return (
				<div class={`columns ${style.home}`}>
					<div class="column is-12-mobile is-half-tablet is-half-desktop has-text-centered">
						<img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
					</div>
					<div class="column is-12-mobile is-half-tablet is-half-desktop">
						<div class="column tags">
							<a href={`http://www.imdb.com/title/${movie.imdb_id}/`} class="tag is-warning is-medium column tag" target="_blank"> IMDB </a>
							{ movie.homepage ?
								(<a href={`${movie.homepage}`} class="tag is-info is-medium column tag" target="_blank"> WEBSITE </a>)
								:
								('')
							}
							{movie.videos.results.map((video,index) => (
								<a href={`https://youtu.be/${video.key}`}
									//eslint-disable-next-line
								onClick={event => this.handleModal(event,video) } class="tag is-primary is-medium column tag" target="_blank">{video.name}</a>
							))
							}
						</div>
						<h2 class="subtitle has-text-centered"><b>{movie.tagline}</b></h2>
						<h2>
							<b>Title : </b>{movie.title}
						</h2>

						<p>
							<b>Overview : </b>{movie.overview}
						</p>

					</div>
					{ v ?
						(
							<div class="modal is-active">
								<div class="modal-background"
								//eslint-disable-next-line
								onClick={event => this.handleModal(event,v) }>{' '}</div>
								<div class="modal-card columns">
									<header class="modal-card-head">
										<p class="modal-card-title">{v.name}</p>
									</header>
									<section class="modal-card-body columns">
										<iframe height="315" src={`https://www.youtube.com/embed/${v.key}`} class="column is-12-mobile has-text-centered" frameborder="0" allowfullscreen />
									</section>
								</div>
							</div>
						)
						:
						('')
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