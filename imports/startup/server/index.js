import url from "url";

import { Meteor } from 'meteor/meteor';
import { WebApp } from "meteor/webapp";
import "./twitter_methods";


Meteor.startup(() => {
  WebApp.connectHandlers.use("/myroute", (req, res, next) => {
    const urlParts = url.parse(req.url, true);
    const token = urlParts.query.token;
    console.log("token2 : ", token);
    res.statusCode = 200;
    res.end("token : " + token);
  });
  WebApp.connectHandlers.use('/twitter/callback', (req, res, next) => {
    const urlParts = url.parse(req.url, true);
console.log(urlParts);
    const token = urlParts.query.oauth_token;
    console.log("token1 : ", token);
    if(token) {
      let route = `/myroute?token=${token}`;
      res.statusCode = 302;
      res.setHeader("Location", route);
      res.end();
    } else {
      next();
    }
  });
});
