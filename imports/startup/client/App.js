import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { HTTP } from 'meteor/http';
import TwitterLogin from "../../ui/TwitterLogin";

export default class App extends Component{
  constructor(props){
    super(props);
  }

  // login(){
  //   Meteor.call("create.popup",(err,res)=> {
  //     if(err)
  //     console.log(err);
  //     else {
  //       console.log(res);
  //     }
  //   });
  //   // HTTP.call("post","https://api.twitter.com/oauth/authenticate?oauth_callback=http://localhost:3000");
  // }

  render(){

    return(
<div>
      <TwitterLogin />
</div>
    )
  }
}

Meteor.startup(() => {
  ReactDOM.render(<App />,document.querySelector(".render-target"));
});
