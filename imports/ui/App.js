import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Session } from 'meteor/session'
import TwitterLogin from './TwitterLogin'
import Signup from './Signup';
import { Tokens } from '../api/tokens';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';


export default class App extends Component {
	constructor(props){
		super(props);
	}


func(){
browserHistory.push("not-found");
}
	render() {
		return(
			<div>
			<Link to = "/signup" >Signup</Link>
			<TwitterLogin />
      <button onClick={this.func}>History</button>
			</div>
		)
	}
}
