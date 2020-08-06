import React,{ Component }                              from 'react';
import * as $                                           from "jquery";
import hash                                             from "../../hash";


export default class Categories extends Component
{
    constructor(props) 
    {
      super(props);
      this.state = {
        token       : null,
        categories  : [],
        playlists   : [],
        history     : [],
        recently    : [],
        meplaylists : [],
        releases    : [],
        no_data     : false,
      };
      // this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
      // this.tick = this.tick.bind(this);
    }
  
    componentDidMount() {
      // Set token
      let _token = hash.access_token;
      if (_token) {
        localStorage.setItem("token", _token);
        // Set token
        this.setState({
          token: _token
        });
        this.getCategories(_token);
        this.getFeatured(_token);
        this.getHistoryPlayed(_token);
        this.getPlayLists(_token);
        this.getRecentlyPlayed(_token);
        this.getNewReleases(_token);
      }
      // this.interval = setInterval(() => this.tick(), 5000);
    }
  
    // componentWillUnmount() 
    // {
    //   // clear the interval to save resources
    //   clearInterval(this.interval);
    // }
  
    tick() {
      if(this.state.token) {
        this.getCategories(this.state.token);
        this.getFeatured(this.state.token);
        this.getHistoryPlayed(this.state.token);
        this.getPlayLists(this.state.token);
        this.getRecentlyPlayed(this.state.token);
        this.getNewReleases(this.state.token);
      }
    }
  
    getCategories = (token) => {
      $.ajax({
        url: "https://api.spotify.com/v1/browse/categories",
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
            categories: data.categories.items,
            no_data: false,
          });
        }
      });
    }

    getFeatured = (token) => {
      $.ajax({
        url: "https://api.spotify.com/v1/browse/featured-playlists",
        type: "GET",
        beforeSend: xhr => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: featured => {
          if( !featured )
          {
            this.setState({
              no_data: true,
            });
            return;
          }
          this.setState({
            playlists: featured.playlists.items,
            no_data: false,
          });
        }
      })
    }

    getHistoryPlayed = (token) => {
      $.ajax({
        url: "https://api.spotify.com/v1/me/player/recently-played?type=track&limit=6",
        type: "GET",
        beforeSend: xhr => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: data => {
          if( !data )
          {
            this.setState({
              no_data: true,
            });
            return;
          }
          this.setState({
            history: data.items,
            no_data: false,
          });
          console.log(this.state.history);
        }
      })
    }

    getPlayLists = (token) => {
      $.ajax({
        url: "https://api.spotify.com/v1/me/playlists",
        type: "GET",
        beforeSend: xhr => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: data => {
          if( !data )
          {
            this.setState({
              no_data: true,
            });
            return;
          }
          this.setState({
            meplaylists: data.items,
            no_data: false,
          });
          // console.log(this.state.meplaylists);
        }
      })
    }

    getRecentlyPlayed = (token) => {
      $.ajax({
        url: "https://api.spotify.com/v1/me/top/artists",
        type: "GET",
        beforeSend: xhr => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: recently => {
          if( !recently )
          {
            this.setState({
              no_data: true,
            });
            return;
          }
          this.setState({
            recently: recently.items,
            no_data: false,
          });
        }
      })
    }

    getNewReleases = (token) => {
      $.ajax({
        url: "https://api.spotify.com/v1/browse/new-releases",
        type: "GET",
        beforeSend: xhr => {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: releases => {
          if( !releases )
          {
            this.setState({
              no_data: true,
            });
            return;
          }
          this.setState({
            releases: releases.track,
            no_data: false,
          });
          // console.log(this.state.releases);
        }
      })
    }

    render() {
        const { categories, playlists, history, recently, meplaylists, releases } = this.state;
        // console.log(playlists,categories);
        return (
          <div>    
            {/* START RECENTLY PLAYED */}
              <div className="mainContent row">
                  <h2 className="title">Gợi Ý Nghệ Sĩ </h2>
                  <div className="cardWrap d-flex row w-100">
                    { recently.map((recently, i) => (   
                      <div className="cardFeatured" key={recently.id}>
                        <div className="cardImage artists">
                          <img className="w-100" src={recently.images[0].url} alt={recently.id}/>      
                          <div className="cardContent">
                            <h4>{recently.name}</h4>
                            <p>{recently.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>  
            {/* END RECENTLY PLAYED */}   

            {/* START HISTORY PLAYED */}
              <div className="mainContent row">
                <h2 className="title">Bạn Đã Nghe !</h2>
                <div className="cardWrap d-flex row w-100">
                  { history.map((history, i) => (   
                    <div className="cardFeatured" key={history.id}>
                      <div className="cardImage">
                        <img className="w-100" src={history.track.album.images[0].url} alt={history.id}/>      
                        <div className="cardContent">
                          <h4>{history.track.album.name}</h4>
                          <p>{history.track.artists[0].name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>  
            {/* END HISTORY PLAYED */}    

            {/* START PLAYLISTS */}
            <div className="mainContent row">
                <h2 className="title">Playlists của bạn</h2>
                <div className="cardWrap d-flex row w-100">
                  { meplaylists.map((meplaylist, i) => (   
                    <div className="cardFeatured" key={meplaylist.id}>
                      <div className="cardImage">
                        <img className="w-100" src={meplaylist.images[0].url} alt={meplaylist.id}/>      
                        <div className="cardContent">
                          <h4>{meplaylist.name}</h4>
                          <p>{meplaylist.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>  
            {/* END PLAYLISTS */}

            {/* START FEATURED */}
              <div className="mainContent row">
                <h2 className="title">Theo Thể Loại</h2>
                <div className="cardWrap d-flex row w-100">
                  { playlists.map((playlist, i) => (   
                    <div className="cardFeatured" key={playlist.id}>
                      <div className="cardImage">
                        <img className="w-100" src={playlist.images[0].url} alt={playlist.id}/>      
                        <div className="cardContent">
                          <h4>{playlist.name}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>  
            {/* END FEATURED */} 

            {/* START CATEGORIES */}
              <div className="mainContent row">
                <h2 className="title">Theo Danh Mục</h2>
                <div className="cardWrap d-flex row w-100">
                  {categories.map((category, i) => (   
                    <div className="card" key={i}>
                        <div className="cardImage">
                            <img className="w-100" src={category.icons[0].url} alt=""/>      
                            <div className="cardContent">
                              <h4>{category.name}</h4>
                            </div>
                            {/* <Playlists category_id={category.i}/> */}
                        </div>
                    </div>
                  ))}
                </div>
              </div>   
            {/* END CATEGORIES */}
          </div>
        ) 
    }
}
