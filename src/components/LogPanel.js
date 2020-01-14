import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';

class LogPanel extends Component {
  
  state = {
    button:false
  }
  
  handleClick = () => {
    this.props.handleClick(this.state.button)
    this.setState({
      button:!this.state.button
    })
  }
  
  render() {
    return(
      <Segment className="HQComps" id="logPanel">
        <pre>
          {this.props.logs.map((log, i) => <p key={i} className={log.type}>{log.msg}</p>)}
        </pre>
        
        {/* Button below is the Activate All/Decommisssion All button */}
        <Button
          fluid
          onClick={this.handleClick}
          color={this.state.button ? "green" : "red"}
          content={this.state.button ? "DEACTIVATE ALL" : "ACTIVATE ALL"}
          />
          {/* This isn't always going to be the same color...*/}
          {/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
      </Segment>
    )
  }
}

export default LogPanel;