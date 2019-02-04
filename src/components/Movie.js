import React, { Component } from 'react';
import $ from 'jquery';

export default class Movie extends Component {

  constructor(props){
    super(props);
    this.state={movies: []};
  }

  componentWillMount(){
    for (let index = 0; index < this.props.movieUrl.length; index++) {
      $.ajax({
        url:this.props.movieUrl[index],
        dataType:'json',
        success:function(response){
         this.setState({movies: this.state.movies.concat(response)});
        }.bind(this)
      });
    }
  }

  render() {
    return (
      <div className="movie-layout">
        <p className="text-bold">Movie:</p>
        {
          this.state.movies.map(function(movie){
            return(
              <p>{movie.title}</p>
            );
          })
        }
      </div>
    );
  }
}
