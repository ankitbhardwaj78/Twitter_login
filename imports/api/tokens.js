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
  },
 "find_free_token"(){
    var time = new Date().getTime();
    let token = Tokens.findOne({inUse:false,nextResetlimit:{$lte : time}})
    console.log("before",token)
    if(token)
    {
      Tokens.update(
        { token : token.token},
        {
          $set:{
            inUse: true
          }
        }
      )
      console.log("token updated",token)
      return token
    }
    else {
      return undefined;
    }
  },
   "tokens.update"(tokens,nextResetlimit){
    console.log("tokens update")
     Tokens.update(
      { token : tokens.token},
      {
        $set:{
          "inUse":false,
          "nextResetlimit":nextResetlimit
        }
      }
    )
    console.log("upaddddd",tokens);
    return tokens;
  }
});
