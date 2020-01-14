import React from 'react';
import '../stylesheets/Area.css'
import Host from './Host'
import { Card } from 'semantic-ui-react'

const Area = (props) => {

  console.log("Area Hosts?", props)

  return (
  <div className='area' id={props.name}>
    <h3 className='labels'>{props.name.split("_").map(word=>word[0].toUpperCase() + word.slice(1)).join(" ")}</h3>
    <Card.Group itemsPerRow={props.limit}>
      {props.hosts.map(host => host.active ? <Host host={host} handleClick={props.handleClick} selectedHost={props.selectedHost} />  : null)}
    </Card.Group>
  </div>
  )

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
