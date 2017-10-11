import { h, Component } from 'preact';
import { connect } from 'mobx-preact';

@connect(['movieStore'])
export default class Home extends Component {
	componentDidMount(){
		this.props.movieStore.headerActive = false;
	}
	render(){
		return (
			<div>
				{' '}
			</div>
		);
	}
}