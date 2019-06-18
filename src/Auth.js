import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
//THIS PAGE IS WRAPPER TO INTERACT WITH auth0 API

const LOGIN_SUCCESS_PAGE = '/secret'
const LOGIN_FAILURE_PAGE = '/'
const LOGOUT_AUTH0_LAYER = 'https://dev2911.auth0.com/v2/logout?federated'

 /*eslint no-restricted-globals: 0 */

 //scope profile allows you to get user info from token

export default class Auth {
auth0 = new auth0.WebAuth({
    domain: "dev2911.auth0.com",
    clientID: "TKNdGO64rqRJSDBdJh7WIhhjvYF60rdN",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://dev2911.auth0.com/userinfo",
    responseType: "token id_token",
    //scope is how you can determine who gets diff permission levels for the roles you have
    scope: "openid profile"

});

// auth0.logout({
//     returnTo: 'YOUR_LOGOUT_URL',
//     client_id: 'YOUR_CLIENT_ID'
//   });

constructor() {
    this.login= this.login.bind(this);
}

login() {
    this.auth0.authorize();
}

//get info token and store in local storage

handleAuthentication () {
this.auth0.parseHash((err, authResults) => {
    //want to handle info in url..so first thing is check its actually there (if)
    if (authResults && authResults.accessToken && authResults.idToken) {
        let expireAt = JSON.stringify(
            authResults.expiresIn * 36000 + new Date().getTime()
        );
            //allows us to get all query strings form url
            localStorage.setItem("access_token", authResults.accessToken)
            localStorage.setItem("id_token", authResults.idToken)
            localStorage.setItem("expires_at", expireAt)
            location.hash = "";
            //go somewhere when authenticated:
            location.pathname = LOGIN_SUCCESS_PAGE;
    } else if(err) {
        Location.pathname = LOGIN_FAILURE_PAGE;
        console.log(err)
    }
})
}

isAuthenticated(){
 let expireAt = JSON.parse(localStorage.getItem("expires_at"));
 //if current time is less than what the expire time is..then we know we're authenticated
 return new Date().getTime() < expireAt;
}

Logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    location.pathname = LOGOUT_AUTH0_LAYER;
}

getProfile(){
    //id_token gives access to profile
    if(localStorage.getItem("id_token")){
        return jwtDecode(localStorage.getItem("id_token"))
    }else{
        return {};
    }
}

}