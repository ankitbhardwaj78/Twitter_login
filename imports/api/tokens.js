import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';

export const Tokens = new Mongo.Collection("tokens");
Meteor.methods({
  "tokens.insert"(token,userId){
    console.log("hel",this.userId);
    if(!this.userId)
    throw new Meteor.Error("Not authorised")
    return Tokens.insert({ uid:userId , token:token.token , verifier:token.secret });
  }
});
