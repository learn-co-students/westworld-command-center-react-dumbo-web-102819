import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details';
import LogPanel from './LogPanel'
import ColdStorage from './ColdStorage'

class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.


  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage areas={this.props.areas} selectedHost={this.props.selectedHost} selectHost={this.props.selectHost}/> 
        </Grid.Column>
        <Grid.Column width={5}>
          <Details host={this.props.selectedHost} toggled={this.props.toggled} areaChange={this.props.areaChange} />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel logs={this.props.logs} handleClick={this.props.allClick}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
