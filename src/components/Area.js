import '../stylesheets/Area.css'
import HostList from './HostList';

import React, { Component } from 'react';

class Area extends Component {

  cleanName = (name) => {
    return name.split("_").map((word)=>{
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(" ")
  }

  render(){
    let hostsHere = this.props.activeHosts.filter(host => host.area == this.props.area.name)
    return (
      <div className='area' id={this.props.area.name}>
        <h3 className='labels'>{this.cleanName(this.props.area.name)}</h3>
        <HostList limit={this.props.area.limit}
                  hosts={hostsHere}
                  selectHost={this.props.selectHost}
                  selectedHostId={this.props.selectedHostId}/>
      </div>
    )
  }
}

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;