import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import Host from './Host'

class HostList extends Component {
  
  
  oneHostArray = () => {
    let newArr = []
    for(let objInd in this.props.areas) {
      for(let objInd2 in this.props.areas[objInd].hosts) {
        newArr.push(this.props.areas[objInd].hosts[objInd2])
      }
    }
    return newArr
  }

  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.oneHostArray().map((host,index) => !host.active ? <Host host={host} key={index} selectedHost={this.props.selectedHost} handleClick={this.props.onHostSelect} /> : null )}
      </Card.Group>
    );
  }
}

export default HostList
