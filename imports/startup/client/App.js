import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Session } from 'meteor/session'
import TwitterLogin from '../../ui/TwitterLogin'
import Signup from '../../ui/Signup';
import { Tokens } from '../../api/tokens';
export default class App extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return(
			<div>
			<TwitterLogin />
			</div>
		)
	}
}

Meteor.startup( () => {
	ReactDOM.render(<App />, document.querySelector('.render-target'))
});
