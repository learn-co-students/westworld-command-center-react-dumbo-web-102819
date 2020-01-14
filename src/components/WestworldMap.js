import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'


const WestworldMap = (props) => {

  return (
    <Segment id="map" >
      {props.areas.map((area, index) => <Area name={area.name} 
                                              limit={area.limit} 
                                              hosts={area.hosts} 
                                              key={index}
                                              handleClick={props.handleClick} 
                                              selectedHost={props.selectedHost} />)}
    </Segment>
  )
}

export default WestworldMap
