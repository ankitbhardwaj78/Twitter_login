import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Session } from 'meteor/session'
import { withTracker } from "meteor/react-meteor-data";
import Signup from './Signup';
import { Tokens } from '../api/tokens';
import TwitterData from './TwitterData';
class TwitterLogin extends Component{
  constructor(props){
    super(props);
    this.twitterLogin = this.twitterLogin.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    console.log("this props",this.props);
    console.log("next props",nextProps);
  }

  twitterLogin() {
    Meteor.call("get_request_token", (err, res) => {
      if(err)
      console.log(err)
      else{
        console.log(res)
        Meteor.call("tokens.insert",res,this.props.userId,(err,res)=>{
          if(err)
          console.log("not saved");
          else {
            console.log("saved successfully");
          }
        })
        Session.set('responds', res.secret)
        // console.log(Session)
        this.anchor.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${res.token}`
        res = this.anchor.click();
      }
    })
  }
  render() {
    if(!this.props.userId)
    {
      return <Signup />
    }
    else{
      console.log(this.props.tokens);
      if(this.props.tokens && this.props.tokens[0] && this.props.tokens[0].access_token)
      {
        return(
          <TwitterData />
        )
      }
      else{
        return(
          <div>
          <button onClick = {this.twitterLogin.bind(this)}>Login with Twitter</button>
          <a style = {{ display: "none" }} href="#"
          ref = {el => {this.anchor = el; }}>
          </a>
          </div>
        )
      }
    }
  }
}


export default withTracker( (props) => {
  let dataloaded;
  let tokens;
  let userId = Meteor.userId();
  let test1=Session.get("test1");
  const tokenSubHandle = Meteor.subscribe("tokens");
  dataloaded = tokenSubHandle.ready();
  if(tokenSubHandle.ready())
  {
    tokens =Tokens.find().fetch();
  }

  return {
    dataloaded,
    tokens,
    test1,
    userId
  };
} )(TwitterLogin);
