import React, {Component} from 'react';

export default class Main extends Component {
    //ternary operator for isAuthen only shows login if not authen
    render() {
        return(
            <>
            <div>
                <h2>Home Page</h2>
                <h3>Hello, {this.props.name}</h3>
                <p>Secrets of Universe</p>
                <a href="/secret">Click Here</a>
            </div>
            
            {!this.props.auth.isAuthenticated() && ( 

<div>
                <hr/>
                Login First
                <br/>
                <button onClick={this.props.auth.login}>Login</button>
            </div>

            )}
           
            </>
        )
    }
}