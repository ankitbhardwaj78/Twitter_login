import { OAuth } from "oauth";

const twitterConsumerKey = "toQ8aXyGvTyRRNwTF7KKzrCGs";
const twitterConsumerSecret = "NMkTwca6R2wis27Lz2dyHiJ4SMG6fwtV84isgim7KWj6OWgYL9";

const oauthClient = new OAuth("https://twitter.com/oauth/request_token",
	"https://twitter.com/oauth/access_token",
	twitterConsumerKey, twitterConsumerSecret,
	"1.0A", "http://localhost:3000/twitter/callback",
	"HMAC-SHA1"
);

export const getOAuthRequestToken = () => {
console.log("tt",oauthClient._authorize_callback);
	return new Promise( ( resolve, reject ) => {
		oauthClient.getOAuthRequestToken(function(err, token, secret, results) {
			if (err) {
				return reject(err);
			}
			console.log("resolving");
			resolve({
				token,
				secret,
        results
			});
		});
	});
}
