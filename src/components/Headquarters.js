import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';

import Details from './Details'
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'


class Headquarters extends Component {
  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.

  render(){
    return(
      <Grid celled='internally'>
        <Grid.Column width={8}>
          <ColdStorage inactiveHosts={this.props.inactiveHosts} 
                       selectHost={this.props.selectHost}
                       selectedHostId={this.props.selectedHostId}/>
        </Grid.Column>
        <Grid.Column width={5}>
          <Details areas={this.props.areas}
                   selectedHost={this.props.selectedHost} 
                   toggleActive={this.props.toggleActive}
                   setHostArea={this.props.setHostArea}/>
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel activateAll={this.props.activateAll}
                    deactivateAll={this.props.deactivateAll}
                    logs={this.props.logs}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Headquarters;
