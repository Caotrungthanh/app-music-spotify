import React, { Component } from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import Categories from '../Home/Categories';
import PlaylistsDetails from '../Detail/PlaylistsDetails';
import Search from './../Search/Search';

export default class Main extends Component 
{
    constructor(props)
    {
        super(props);
        const token = localStorage.getItem("token");
        let loggedIn = true
        if(token == null)
        {
            loggedIn = false
        }

        this.state = {
            loggedIn,
            isDropdown: false,
        }
    }

    onDropdown = () => {
        this.setState({
            isDropdown: !this.state.isDropdown
        })
    }

    onLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    render()
    {
        if(this.state.loggedIn === false)
        {
            return <Redirect to="/login"/>
        }
        const menuClass = `dropdown-menu${this.state.isDropdown ? " show" : ""}`;
            
        return (
            <div className="main">
                <div className="upperNav">
                    <div className="dropdown" onClick={this.onDropdown}>
                        <button type="button" className="userDetail btn" data-toggle="dropdown">
                            <img src={this.props.userInfo.images[0].url} className="userImage" alt={this.props.userInfo.display_name}/>
                            <p className="userName">
                                {this.props.userInfo.display_name}
                                <i className="fa fa-sort-down"></i>
                            </p>
                        </button>
                        <div className={menuClass}>
                            <a className="dropdown-item" href="/#" onClick={this.onLogout}>Đăng xuất</a>
                        </div>
                    </div>
                </div> 
                <div className="container-fluid w-100">
                    <Switch>
                        <Route path="/" exact component={Categories}></Route>
                        <Route path="/search" component={Search}></Route>
                        <Route path="/your-library" >Lirbary</Route>
                        <Route path="/playlist/:id" component={PlaylistsDetails}></Route>
                    </Switch>
                </div>
            </div>
        );
    }
}