import React, { Component }                             from "react";
import video                                            from "./../../assets/image/Login/maker.gif"
import * as $                                           from "jquery";
import { authEndpoint, clientId, redirectUri, scopes }  from "../../config";
import hash                                             from "../../hash";
import Home                                             from "../Home";
import FacebookLoginBtn                                 from 'react-facebook-login';
import GoogleLoginBtn                                   from "react-google-login";

export default class Login extends Component {
  constructor() 
  {
    super();
    this.state = {
      token: null,
      username: '',
      password: '',
      userInfo: {
        display_name: '',
        images: [{ url: '' }],
      },
      no_data: false,
      isOpen: true,
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }
// LOGIN WITH SPOTIFY
  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    // console.log(_token);
    if (_token) 
    {
      localStorage.setItem("token", _token);
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  } 

  tick() {
    if(this.state.token) 
    {
      this.getCurrentlyPlaying(this.state.token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        if(!data)
        {
          this.setState({
            no_data: false,
          });
          return;
        }
        this.setState({
          userInfo: data,
          no_data: true,
        });
        console.log(data);
      }
    });
  }

// LOGIN WITH FACEBOOK
  responseFacebook = (response) => {
    // console.log(response);
    if(response.status !== 'unknown' && !this.state.data)
    {
      console.log(response);
        this.setState({
            no_data: true,
            userInfo: {
                display_name: response.name,
                images: [{ url: response.picture.data.url }],
            },
        })
    }
  }

// LOGIN WITH GOOGLE 
  responseGoogle = (response) => {
    // console.log(response);
    this.setState({
      no_data: true,
      userInfo: {
        display_name: response.profileObj.name,
        images: [{ url: response.profileObj.imageUrl }],
      },
    });
  };

// LOGIN WITH FORM
  onChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  submitForm = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    if(username === 'ngancao' && password === '123') {
      localStorage.setItem('token', 'sdsadasrsdcvt6feef');
      this.setState({
        userInfo: {
          display_name: "Cao Hoàng Bảo Ngân",
          images: [{ url: "https://i.pinimg.com/736x/63/ed/86/63ed864934232be42a5c0e465385b043.jpg" }],
        },
        no_data: true
      })
    }
  }

  changeForm = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    console.log(this.state.isOpen);
  }
  render() {
    if(this.state.no_data)
    {
      return ( 
        <Home userInfo={this.state.userInfo}/>
      );
    }

    let facebookData;
      this.state.auth ? facebookData = (
        <Home userInfo={this.state.userInfo}/>
      ) :
      facebookData = (
        <FacebookLoginBtn
            appId="560881421252443"
            autoLoad={true}
            fields="name,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} 
            icon={<i className="fa fa-facebook"></i>}
            textButton = {false}
            cssClass="btnFacebook"
        >
        </FacebookLoginBtn>
      );
    
      let googleData;
      this.state.auth ? googleData = (
        <Home userInfo={this.state.userInfo}/>
      ) : googleData = (
          <GoogleLoginBtn
            clientId="753493954664-crerfq529io8oq9cfqi6qetkep8dvvqf.apps.googleusercontent.com"
            render={(renderProps) => (
              <button className="btnGoogle" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <i class="fa fa-google-plus"></i>
              </button>
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        );

        let changeText = this.state.isOpen ? 'Log In' : 'Sign up';
        let LogIn;
        this.state.isOpen ? LogIn = (  
          <form onSubmit={this.submitForm}>
            <div className="form-group">
              <input
                className="form-control input-login"
                type="text"
                placeholder="Nhập tên tài khoản"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control input-login"
                type="password"
                placeholder="Nhập mật khẩu"
                name="password"
                autoComplete="on"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <input type="submit" className="btn btn-login"/>
          </form>
        ) : LogIn = (
          <form onSubmit={this.submitForm}>
            <div className="form-group signup-group">
              <input
                className="form-control input-signup"
                type="text"
                placeholder="Nhập tên tài khoản"
                name="username"
                // value={this.state.username}
                // onChange={this.onChange}
              />
            </div>
            <div className="form-group signup-group">
              <input
                className="form-control input-signup"
                type="password"
                placeholder="Nhập mật khẩu"
                name="password"
                autoComplete="on"
                // value={this.state.password}
                // onChange={this.onChange}
              />
            </div>
            <div className="form-group signup-group">
              <input
                className="form-control input-signup"
                type="email"
                placeholder="Nhập Email"
                name="password"
                autoComplete="on"
                // value={this.state.password}
                // onChange={this.onChange}
              />
            </div>
            <div className="form-group signup-group">
              <input
                className="form-control input-signup"
                type="number"
                placeholder="Nhập số điện thoại"
                name="password"
                autoComplete="on"
                // value={this.state.password}
                // onChange={this.onChange}
              />
            </div>
            <input type="submit" className="btn btn-login"/>
          </form>
        );
    return (
      <div className="form">
        <div className="container">
          <div className="form--login">
            <div className="row">
              <div className="col-12 col-md-7 form--login__image">
                <img src={video} alt="gif"/>
              </div>    
              <div className="col-12 col-md-5 form--login__auth">
                <div className="title">
                  <h2 onClick={this.changeForm}>{changeText}</h2>
                  {LogIn}
                </div>
                {this.state.isOpen === true && (
                  <div className="social">
                    <h3 className="text-center p-3 w-100">or sign with</h3>
                    <div className="social--login">
                      <div className="social--login__spotify">
                        {!this.state.token && (
                          <a className="btn btnSpotify" href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`} title="Spotify">
                            <i class="fa fa-spotify"></i>
                          </a>
                        )}
                      </div>
                      <div className="social--login__facebook">
                        {facebookData}
                      </div>
                      <div className="social--login__google">
                        {googleData}
                      </div>
                    </div>
                  </div>
                )}
              </div>        
            </div>
          </div>
        </div>
      </div>
    );
  }
}
