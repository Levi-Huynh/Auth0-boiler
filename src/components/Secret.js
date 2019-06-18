import React, {Component} from 'react';

export default class Secret extends Component {
    render() {
        return(
            <div>
                <h2>The answer to life and the universe is 42</h2>
            <p>Return to Home Page <a href="/">Click Here</a></p>
            <button onClick={this.props.auth.Logout} >Log Out</button>
            </div>
        )
    }}