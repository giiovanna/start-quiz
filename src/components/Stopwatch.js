import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {Button} from 'react-materialize'


export default class Stopwatch extends Component {
  constructor(){
    super();
    this.state={
       contador:0,
       estado:"Start"
     }
     this.handleContadorplus= this.handleContadorplus.bind(this);
     this.aumentar= this.aumentar.bind(this);

    // this.handleContadorplus();
  }
  
  componentDidMount(){
     PubSub.subscribe("startStopwatch",function(topico,erro){
        this.setState({
          estado: "Counting"
        });
        this._interval=setInterval(this.aumentar,1000);

      }.bind(this));
  }

  handleContadorplus(){
     if (this.state.estado==="Start"){
       this.setState({
         estado: "Counting"
       });
       this._interval=setInterval(this.aumentar,1000);
     }
  }

  aumentar(){
    if (this.state.contador >= 65){
      this.setState({
        estado: "Start"
      });
      clearInterval(this._interval);

      PubSub.publish("finishGame",true);
    }

    if(this.state.estado==="Counting"){
      this.setState({
        contador: this.state.contador+1
      });
    }
  }

    getSeconds(){
        return('0'+ this.state.contador % 60).slice(-2);
    }
    
    getMinutes(){
        return Math.floor(this.state.contador / 60);
    }
  render() {
    return (
      <div className=" text-center">
        <p className="margin-0">{this.getMinutes()}:{this.getSeconds()}</p>
      </div>
    );
  }
}
