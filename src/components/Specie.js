import React, { Component } from 'react';
import $ from 'jquery';

export default class Homeworld extends Component {

  constructor(props){
     super(props);
     this.state={specie: []};
    }
    
    componentWillMount(){
      $.ajax({
        url:this.props.specieUrl,
        dataType:'json',
        success:function(response){
          this.setState({specie:response});
        }.bind(this)
      });
    }

  render() {
    return (
      <div className="specie-layout">
        <p><span className="text-bold">Specie: </span>{this.state.specie.name}</p>
      </div>
    );
  }
}
