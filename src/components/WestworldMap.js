import React from 'react';
import { Segment } from 'semantic-ui-react';

import Area from './Area'

const WestworldMap = (props) => {

  const genAreas = () => {
    return props.areas.map((area, i) => {
      return <Area key={i} 
                   area={area} 
                   activeHosts={props.activeHosts} 
                   selectHost={props.selectHost}
                   selectedHostId={props.selectedHostId}/>
    })
  }
  return (
    <Segment id="map" >
      {genAreas()}
    </Segment>
  )
}

export default WestworldMap
