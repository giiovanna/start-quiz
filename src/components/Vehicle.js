import React, { Component } from 'react';
import $ from 'jquery';

export default class Vehicle extends Component {

  constructor(props){
    super(props);
    this.state={vehicles: []};
  }

  componentWillMount(){
    for (let index = 0; index < this.props.vehicleUrl.length; index++) {
      $.ajax({
        url:this.props.vehicleUrl[index],
        dataType:'json',
        success:function(response){
         this.setState({vehicles: this.state.vehicles.concat(response)});
        }.bind(this)
      });
    }
  }

  render() {
    return (
      <div className="vehicle-layout">
        <p className="text-bold">Vehicles:</p>
        {
          this.state.vehicles.map(function(vehicle){
            return(
              <p>{vehicle.name}</p>
            );
          })
        }
      </div>
    );
  }
}
