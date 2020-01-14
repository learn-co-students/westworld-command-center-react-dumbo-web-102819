import React from 'react'
import { Card } from 'semantic-ui-react'

import Host from './Host'

const HostList = (props) => {

  const genHosts = () => {
    if (props.hosts){
      return props.hosts.map((host, i) => {
        return <Host key={i} 
                     host={host} 
                     selectHost={props.selectHost}
                     selectedHostId={props.selectedHostId}></Host>
      })
    } else {
      return null
    }
  }

  return(
    <Card.Group itemsPerRow={props.limit/2}>
      {genHosts()}
    </Card.Group>
  )
}

export default HostList
