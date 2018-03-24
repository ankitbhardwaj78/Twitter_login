import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { getOAuthRequestToken } from './oauth'
import { getOAuthAccessToken } from './oauth'
import { Tokens } from '../../api/tokens'
import get_twiiter_data from './TwitterConfig'
Meteor.methods({
	async "get_request_token"(){
		let res;
		try{
			res = await getOAuthRequestToken();
			oauth_request_token = res.token
			oauth_request_token_secret = res.secret
			console.log("got the token")
		}catch(err) {
			console.log("error while getting token")
			throw new Meteor.Error("oauth request token exception")
		}
		return res;
	},
	async "get_oauth_token"(oauth_verifier) {
		console.log(oauth_request_token, oauth_request_token_secret, oauth_verifier)
		try{
			let res = await getOAuthAccessToken(oauth_request_token, oauth_request_token_secret, oauth_verifier);
			console.log("Final tokens", res)
			Tokens.update(
				{ token : oauth_request_token},
				{
					$set:{
						"access_token":res.oauth_access_token,
						"access_token_secret":res.oauth_access_token_secret,
						"inUse":false,
						"nextResetlimit":((new Date().getTime()))
					}})
				}catch(err) {
					console.log('error', error)
					throw new Meteor.Error("error")
				}
				return res;
			},


			async "get_followers"(screen_name,userId){
				let tokens = Meteor.call("find_free_token");
				console.log("tokens",tokens);
				let next_cursor = -1
				if(tokens)
				{
					let appConfig = get_twiiter_data(tokens.access_token,tokens.access_token_secret);
					while(next_cursor!=0)
					{
						console.log(tokens);
						try{
							let res = await appConfig.get('followers/list', { screen_name: screen_name , count : 200 ,cursor : next_cursor});
							if(res.resp.caseless.dict['x-rate-limit-remaining']==0)
							{
							 Tokens.update(
									{ token : tokens.token},
									{
										$set:{
											inUse:false,
											nextResetlimit:res.resp.caseless.dict['x-rate-limit-reset']*1000
										}
									}
								)
								tokens = Meteor.call("find_free_token");
								if(tokens )
								{
									appConfig =  get_twiiter_data(tokens.access_token,tokens.access_token_secret);
									next_cursor = res.data.next_cursor;
								}
								else {
									next_cursor =0;
								}
							}
							else{
								next_cursor = res.data.next_cursor;
							}
						}catch(err) {
							console.log('error', error)
							throw new Meteor.Error("error")
						}
					}
					console.log("running")
				}
				else {
					console.log("finished");
				}
			}
		});
