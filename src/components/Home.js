import React, { Component } from 'react';
import Main from './Main/Main';
import Nav from './Nav/Nav';

export default class Home extends Component {
    render() {
        return (
            <div className="App">
                <Nav/>
                <Main userInfo={this.props.userInfo}/>
            </div>
        );
    }
}