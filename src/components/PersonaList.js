import React, { Component } from 'react';
import {Card, CardTitle,Row, Col, Modal, Button,Input, Pagination} from 'react-materialize'
import $ from 'jquery';

import CountPoints from './CountPoints';

export default class PersonaList extends Component {

    constructor(){
      super();

      this.state={lista: []};

      this.points = 0;
    }
    
    componentWillMount(){
      $.ajax({
        url:"https://swapi.co/api/people/",
        dataType:'json',
        success:function(response){
          this.setState({lista:response.results});
        }.bind(this)
      });
    }
  
    checkClick(Answer, event){
      event.preventDefault();
    }

    render() {
      return (
        <Row>
          {
            this.state.lista.map(function(persona){
              return(
                <Col s={3} className='grid-example'>
                  <Card header={<CardTitle reveal image={"https://picsum.photos/300/300"} waves='light'/>}>
                  <Row>
                      <CountPoints persona={persona}/>
                  </Row>
                  </Card>
                </Col>
              );
            })                
          }
        </Row>

        // <Pagination className="center" items={10} activePage={2} maxButtons={8} />

      );
    }
}
