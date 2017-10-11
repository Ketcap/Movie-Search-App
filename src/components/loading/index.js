import { h, Component } from 'preact';
import style from './style';
import svg from '../../assets/tail-spin.svg';

export default class Loading extends Component {
	render()  {
		return (
			<img src={svg} class={`${style.loader}`}/>
		);
	}
}