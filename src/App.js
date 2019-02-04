import React, { Component } from 'react';
import {Card, CardTitle, Row, Col, Button, Modal, Input} from 'react-materialize'
import './App.css';
import Nav from './components/Nav'
import PersonaList from './components/PersonaList';
import PubSub from 'pubsub-js';
import $ from 'jquery';

class App extends Component {

  constructor(){
    super();
    
    this.state={points: 0, checkDetail: false};
    this.savePoints = this.savePoints.bind(this);
  }

  startGame(event){
    event.preventDefault();
    document.getElementById("initial").style.display = "none";
    document.getElementById("game").style.display = "block";
    PubSub.publish("startStopwatch", true);
  }

  componentDidMount(){
    PubSub.subscribe("countPoints",function(topico,pointsGame){
      this.setState({points: this.state.points + pointsGame});
    }.bind(this));

    PubSub.subscribe("finishGame",function(topico,points){
      $("#button-result").click();     
      document.getElementById("results").style.display = "block";
    });
  }

  savePoints(){
    let player = {name: document.getElementById("name").value, 
                  email: document.getElementById("email").value,
                  points: this.state.points
                }
    localStorage.setItem(document.getElementById("email").value, JSON.stringify(player));

    alert("Pontuação salva!");
    
    document.getElementById('save').disabled=true; 

  }

  render() {
    return (
      <div className="layout">
        <div className="initial" id="initial">
          <Row>
            <Col s={4} className="col s4 offset-s4 card">
              <Card header={<CardTitle reveal image={"https://picsum.photos/400/400"} waves='light'/>}
              title="Star Quiz!">
                <Button onClick={this.startGame}>JOGAR</Button>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="game" id="game">
          <Nav/>
          <PersonaList/>
        </div>

        <div className="results" id="results">
          <Modal id="modal" header='Quiz finalizado!' trigger={<Button id="button-result">MODAL</Button>}>
            <h3 className="center">{this.state.points} pontos</h3>
            <p>Preencha o form abaixo para salvar sua pontuação</p>
            <Input s={12} label="Nome" id="name"/>
            <Input s={12} label="Email" id="email"/>
            <Button id="save" onClick={this.savePoints}>SALVAR</Button>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
