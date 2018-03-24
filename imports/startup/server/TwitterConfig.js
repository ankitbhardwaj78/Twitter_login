let Twit = require('twit');

export default function get_twiiter_data(oauth_access_token,oauth_access_token_secret){
  let appConfig = new Twit({
    consumer_key:         'gRVg8FedIrQJEvhFncYyflRJ7',
    consumer_secret:      'ZAQKCqoUHpe8SzasjBY4Eav8l3pbXSkXUMEFxtlgYhDPbWIS5R',
    access_token:         oauth_access_token,
    access_token_secret:  oauth_access_token_secret
  })
  return appConfig;
}
