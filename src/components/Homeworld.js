import React, { Component } from 'react';
import $ from 'jquery';

export default class Homeworld extends Component {

  constructor(props){
    super(props);
    this.state={homeworld: []};
  }

  componentWillMount(){
    $.ajax({
      url:this.props.homeworldUrl,
      dataType:'json',
      success:function(response){
        this.setState({homeworld:response});
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="homeworld-layout">
        <p><span className="text-bold">Planet: </span>{this.state.homeworld.name}</p>
      </div>
    );
  }
}
