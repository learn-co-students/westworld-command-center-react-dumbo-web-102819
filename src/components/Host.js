import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  const handleClick = (event) => {
    props.selectHost(props.host.id, props.host)
  }

  return(
    <Card
      className={props.selectedHostId == props.host.id ? "host selected" : "host"}
      onClick={handleClick}
      image={props.host.imageUrl}
      raised
    />
  )
}

export default Host
