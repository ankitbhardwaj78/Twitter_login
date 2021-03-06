import { Meteor } from 'meteor/meteor'
import url from 'url'
import { WebApp } from 'meteor/webapp'
import './twitter_methods'
import { Session } from 'meteor/session'
import {Tokens} from '../../api/tokens';



Meteor.startup(() => {

	Meteor.publish("tokens",function(){
	 if(this.userId){
		 return Tokens.find({ uid: this.userId});
	 }
 });

	WebApp.connectHandlers.use('/', (req, res, next) => {
		const oauth_verifier = url.parse(req.url, true).query.oauth_verifier;
		if(oauth_verifier){
			Meteor.call("get_oauth_token", oauth_verifier, (err, res) => {

			})
		}
		next();
	})
})
