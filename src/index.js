import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth from './Auth';

const auth= new Auth();

//can grab user info from a bunch of diff services, google, fb etc 

let state= {};
let username = auth.getProfile().nickname || "Didn't grab the Name"

 /*eslint no-restricted-globals: 0 */

window.setState= changes =>{
    state=Object.assign({}, state, changes)

    ReactDOM.render(<App {...state} />, document.getElementById('root'));

}


let initalState= {
    name: username,
    location: location.pathname.replace(/^\/?|\/$/g, ""),
    auth
};

window.setState(initalState);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
