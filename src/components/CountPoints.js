import React, { Component } from 'react';
import {Row, Modal, Button,Input, Col} from 'react-materialize'
import $ from 'jquery';
import Specie from './Specie';
import Homeworld from './Homeworld';
import Movie from './Movie';
import Vehicle from './Vehicle';
import PubSub from 'pubsub-js';

export default class CountPoints extends Component {

  constructor(props){
    super(props);
    this.state={points: 0, checkDetail: false};
  }

  render() {
    return (
       <div className="vehicle-layout">
         <Col s={6} className="center">
           <Modal header='Nome do Personagem' trigger={<Button id="question">?</Button>}>
           <form onSubmit={e => {
             e.preventDefault();
             let points = 0;
             if(document.getElementById("personaName").value === this.props.persona.name){
              
               if(this.state.checkDetail === true){
                points = 5;
                alert("Ganhou 5 pontos!");
               }else{
                points = 10;
                alert("Ganhou 10 pontos!");
               }
              }else{
                alert("Errou!");
              }
              
              PubSub.publish("countPoints",points);
             }}>
             <Row>
                 <Input s={12} id="personaName"/>
                 <Button>OK</Button>
             </Row>
           </form>
           </Modal>
           </Col>
           <Col s={6} className="center">

          <Modal header='Details' trigger={<Button onClick={this.checkClick}>...</Button>}>
            <Row>
              <Col s={6}>
                <img src="https://picsum.photos/200/300"/>
              </Col>
              <Col s={6}>
                <Specie specieUrl={this.props.persona.species}/>
                <p><span className="text-bold">Height:</span> {this.props.persona.height}</p>
                <p><span className="text-bold">Hair:</span> {this.props.persona.hair_color}</p>
                <Homeworld homeworldUrl={this.props.persona.homeworld}/>
                <Movie movieUrl={this.props.persona.films}/>
                <Vehicle vehicleUrl={this.props.persona.vehicles}/>
              </Col>
            </Row>
          </Modal>
           </Col>
       </div>
    );
  }
}
