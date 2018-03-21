import React, { Component } from "react";

class TwitterLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { err: "", token: 0 };
    this.twitterLogin = this.twitterLogin.bind(this);
  }

  twitterLogin() {
    Meteor.call("twitter_sign_in", (err, res) => {
      if(err) {
        console.log("err : ", err);
      } else {
        console.log("res : ", res);
        this.redirectAnchor.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${res}`;
        this.redirectAnchor.click();
      }
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.twitterLogin}>Twitter Login</button>
        <a style={{ display: "none" }} href="#"
          ref={el => { this.redirectAnchor = el; }}>
        </a>
      </div>
    );
  }
}

export default TwitterLogin;
