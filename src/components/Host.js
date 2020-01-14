import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  const handleClick = () => {
    props.handleClick(props.host)
  }

  return <Card className={(props.selectedHost !== null) && (props.host.id === props.selectedHost.id) ? "host selected" : "host"} 
               onClick={handleClick} 
               image={props.host.imageUrl} 
               raised />
}



export default Host
