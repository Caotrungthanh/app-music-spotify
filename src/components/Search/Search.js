import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: "",
    }
  }

  updateValue(event) {

    event.preventDefault();
    this.setState({
      artistName: event.target.value
    });
    console.log(event.target.value);
  }


  render() {

    return(
      <div>
        <div class="input-group mt-3">
          <input type="text" class="form-control inputSearch" value={this.state.artistName} onChange={event => this.updateValue(event)} placeholder="Search for Artists..." />
        </div>
      </div>
    );
  }
}