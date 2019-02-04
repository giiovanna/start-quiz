import React, { Component } from 'react';
import {Navbar, NavItem, Icon} from 'react-materialize'
import Stopwatch from './Stopwatch'

export default class Nav extends Component {

  constructor(){
    super();

    this.state={lista: []};
  }

  render() {
    return (
      <Navbar brand='Star Quiz!' right>
        <NavItem><Icon large>access_time</Icon></NavItem>
        <NavItem><Stopwatch/></NavItem>
      </Navbar>
    );
  }
}
