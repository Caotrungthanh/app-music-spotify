import React, { Component } from 'react';
import hash                 from "../../hash";
import * as $               from "jquery";
import IconCalendar         from '../../assets/icon/calendar.svg';
import IconTime             from '../../assets/icon/time.svg';
import IconCat              from '../../assets/icon/cat.svg';              
import IconCheck            from '../../assets/icon/check.svg';
import IconPlay             from '../../assets/icon/play-button.svg';     

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      tracks: [],
      no_data: false,
    }
  }

  updateValue = (event) => {
    const query = event.target.value;

    this.setState({
      query: query,
      tracks: [],
      no_data: false,
    });
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) 
    {
      localStorage.setItem("token", _token);
      // Set token
      this.setState({
        token: _token
      });
      this.getTrackPlaylist(_token);
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
      this.getTrackPlaylist(this.state.token);
    }
  }

  getTrackPlaylist = (token) => {
    $.ajax({
      url: `https://api.spotify.com/v1/search?q=${this.state.query}&type=track`,
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        if(!data)
        {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({
          tracks: data.tracks.items,
          no_data: false,
        });
        // console.log(JSON.stringify(this.state.tracks));
        console.log(this.state.tracks);

      }
    })
  }
  
  render() {
    var {tracks, no_data} = this.state;
    return(
      <div>
        <div className="input-group mt-3">
          <input 
            type="text" 
            className="form-control inputSearch" 
            ref={(input) => this.query = input}
            onChange={event => {this.setState({query: event.target.value})}} 
            placeholder="Search for Tracks..." />
        </div>

        {no_data ? <p>Loading bro.....</p> : 
        
          <table className="table table-dark table-hover mt-3">
            <thead>
              <tr>
                <th>
                  <img className="icon" src={IconCat} width="30px"  alt="calendar"/>
                </th>
                <th>Tên bài hát</th>
                <th>Nghệ sĩ</th>
                <th>Album</th>
                <th>
                  <img className="icon" src={IconCalendar} width="20px"  alt="calendar"/>
                </th>
                <th>                  
                  <img className="icon" src={IconTime}  width="20px" alt="time"/>
                </th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((result, index) =>
                <tr key={index}>
                  <td>
                    <img className="icon" src={IconPlay} width="30px"  alt="calendar"/>
                    <img className="icon" src={IconCheck} width="30px"  alt="calendar"/>
                  </td>
                  <td key={result.id}>{result.name}</td>
                  <td>{result.artists[0].name}</td>
                  <td>{result.album.name}</td>
                  <td>{result.album.release_date}</td>
                  <td>{ JSON.stringify((Math.round((result.duration_ms/60000) * 100) / 100)).split('.').join(':')}</td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
    );
  }
}