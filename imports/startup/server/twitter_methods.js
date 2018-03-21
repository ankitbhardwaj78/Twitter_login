import { Meteror } from "meteor/meteor";
import faker from "faker";

import { getOAuthRequestToken } from "./oauth";

Meteor.methods({
  async "get_user_request_token"() {
    // const getOAuthRequestTokenSync = Meteor.wrapAsync(oauthClient.getOAuthRequestToken, oauthClient);
    let res;
    try {
      res = await getOAuthRequestToken();
      console.log("got res");
    } catch(err) {
      console.log("Error getting OAuth request token : ", err);
      throw new Meteor.Error("oauth request token error");
    }
    // oauthClient.getOAuthRequestToken(Meteor.bindEnvironment(function(error, oauthToken, oauthTokenSecret, results){
    //   if (error) {
    //     console.log("Error getting OAuth request token : ", error);
    //     throw new Meteor.Error("oauth request token error");
    //   } else {
    //     console.log("oauthToken : ", oauthToken);
    //     // console.log("oauthTokenSecret : ", oauthTokenSecret);
    //     // console.log("results : ", results);
    //     res = { oauthToken, oauthTokenSecret, results };
    //   }
    //   return res;
    // }));
    console.log("returning res");
    return res;
  },
  "twitter_sign_in"() {
    let reqTokenRes = Meteor.call("get_user_request_token");
    console.log("yp",reqTokenRes);
    let reqToken;
    if(reqTokenRes && reqTokenRes.results.oauth_callback_confirmed === "true") {
      console.log("yoo");
      reqToken = reqTokenRes.token;
    } else {
      throw new Meteror.Error("oauth req token error : ", reqToken);
    }
    console.log("yes",reqToken);
    return reqToken;
  },

  "get_user_access_token"(oauth_verifier){
    let baseURL = "https://api.twitter.com/";
    let path = "oauth/access_token";
    let apiURL = `${baseURL}${path}?oauth_verifier=${oauth_verifier}`;
console.log("api",apiURL);
    let res = HTTP.call("post", apiURL);
    console.log("res : ", res);
    return res;
  }
,
  "try_route"() {
    const token = faker.random.number();
    console.log("token : ", token);
    return token;
  }

});
