import React,{ Component }                              from 'react';
import * as $                                           from "jquery";
import hash                                             from "../../hash";


export default class Categories extends Component
{
    constructor(props) 
    {
      super(props);
      this.state = {
        token: null,
        categories: [],
        no_data: false,
        playlists: [],
      };
      // this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
      // this.tick = this.tick.bind(this);
    }
  
    componentDidMount() 
    {
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
        this.getCategories(_token);
        this.getFeatured(_token);
      }
      // this.interval = setInterval(() => this.tick(), 5000);
    }
  
    // componentWillUnmount() 
    // {
    //   // clear the interval to save resources
    //   clearInterval(this.interval);
    // }
  
    tick() 
    {
      if(this.state.token) 
      {
        this.getCategories(this.state.token);
        this.getFeatured(this.state.token);
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

    render() {
        const { categories, playlists } = this.state;
        // console.log(playlists,categories);
        return (
          <div>                 
            {/* START CATEGORIES */}
              <div className="mainContent row">
                <h2 className="title">Categories</h2>
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

            {/* START FEATURED */}
              <div className="mainContent row">
                <h2 className="title">Featured</h2>
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
          </div>
        ) 
    }
}
