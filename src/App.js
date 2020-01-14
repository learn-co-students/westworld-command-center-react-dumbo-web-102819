import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';

import Headquarters from './components/Headquarters'
import WestworldMap from './components/WestworldMap'
import { Log } from './services/Log'


class App extends Component {

  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.

  state = {
    areas: [],
    hosts: [],
    activeHosts: [],
    inactiveHosts: [],
    selectedHostId: null,
    selectedHost: null,
    logs: []
  }

  selectHost = (hostId, host) => {
    this.setState({
      selectedHostId: hostId,
      selectedHost: host
    })
  }

  getHostsInThisArea = (area) => {
    return this.state.hosts.filter((host) => {
      return host.area == area.name
    })
  }

  activateAll = () => {
    let newHosts = this.state.hosts
    let newSelectedHost = this.state.selectedHost
    newHosts = newHosts.map((host) => {
      return {...host, active: true}
    })
    newSelectedHost["active"] = true
    this.setState({
      hosts:newHosts,
      selectedHost:newSelectedHost,
      logs: [...this.state.logs, Log.warn("Activating all hosts!")]
    }, ()=>{
      let hostActives = this.getHostActives(newHosts)
      this.setState({
        activeHosts: hostActives[0],
        inactiveHosts: hostActives[1]
      })
    })
  }

  deactivateAll = () => {
    let newHosts = this.state.hosts
    let newSelectedHost = this.state.selectedHost
    newHosts = newHosts.map((host) => {
      return {...host, active: false}
    })
    newSelectedHost["active"] = false
    this.setState({
      hosts:newHosts,
      selectedHost:newSelectedHost,
      logs: [...this.state.logs, Log.notify("Decommissioning all hosts!")]
    }, ()=>{
      let hostActives = this.getHostActives(newHosts)
      this.setState({
        activeHosts: hostActives[0],
        inactiveHosts: hostActives[1]
      })
    })
  }

  setHostArea = (host, areaName) => {
    //logic check for overcrowded area first
    let area = this.state.areas.find((area)=>{
      return area.name == areaName
    })
    let thisAreaHosts = this.getHostsInThisArea(area)

    if(thisAreaHosts.length == area.limit){
      this.setState({
        logs: [...this.state.logs, Log.error(`Too many hosts. Cannot add ${host.firstName} to ${this.formatAreaName(areaName)}`)]
      })
      return false
    } else {
      let newHost = {...host, area: areaName}
      let foundIndex = 0
      this.state.hosts.forEach((hostHolder, i) => {
        if(hostHolder.id == newHost.id){
          foundIndex = i
        }
      })
      let newHosts = []
      if (foundIndex == 0){
        newHosts = [newHost, ...this.state.hosts.slice(foundIndex+1)]
      } else {
        newHosts = [...this.state.hosts.slice(0, foundIndex), newHost, ...this.state.hosts.slice(foundIndex+1) ]
      }
      this.setState({
        hosts: newHosts,
        selectedHost: newHost,
        logs: [...this.state.logs, Log.notify(`${newHost.firstName} set in area ${this.formatAreaName(areaName)}`)]
      }, ()=>{
          let hostActives = this.getHostActives(this.state.hosts)
          this.setState({
            activeHosts:hostActives[0],
            inactiveHosts:hostActives[1]
          })
      })
      return true
    }
  }

  formatAreaName = (name) => {
    return name.split("_").map((word) => {
      return word.charAt(0).toUpperCase()+word.slice(1)
    }).join(" ")
  }

  toggleActive = (host, hostId) => {
    //TODO, toggle a host's active attr
    let newHost = {...host, active: !host["active"]}
    let foundIndex = 0
    this.state.hosts.forEach((hostHolder, i) => {
      if(hostHolder.id == newHost.id){
        foundIndex = i
      }
    })
    let newHosts = []
    if (foundIndex == 0){
      newHosts = [newHost, ...this.state.hosts.slice(foundIndex+1)]
    } else {
      newHosts = [...this.state.hosts.slice(0, foundIndex), newHost, ...this.state.hosts.slice(foundIndex+1) ]
    }
    let logMessage = newHost["active"] ? Log.warn(`Activated ${newHost.firstName}`) : Log.notify(`Decommissioned ${newHost.firstName}`)
    this.setState({
      hosts:newHosts,
      selectedHost:newHost,
      logs: [...this.state.logs, logMessage]
    }, ()=>{
      let hostActives = this.getHostActives(this.state.hosts)
      this.setState({
        activeHosts:hostActives[0],
        inactiveHosts:hostActives[1]
      })
    })
  }

  getHostActives = (hosts) => {
    let activeHosts = []
    let inactiveHosts = []
    hosts.forEach((host) => {
      host.active ? activeHosts.push(host) : inactiveHosts.push(host)
    })
    return [activeHosts, inactiveHosts]
  }

  componentDidMount(){
    fetch('http://localhost:4000/areas')
    .then(r => r.json())
    .then((areas)=>{
      fetch('http://localhost:4000/hosts')
      .then(r => r.json())
      .then((hosts) => {
        let hostActives = this.getHostActives(hosts)
        this.setState({
          areas: areas,
          hosts: hosts,
          activeHosts: hostActives[0],
          inactiveHosts: hostActives[1],
          //for testing
          selectedHostId: hosts[0].id,
          selectedHost: hosts[0]
        })
      })
    })
  }

  render(){
    return (
      <Segment id='app'>
        <WestworldMap areas={this.state.areas} 
                      activeHosts={this.state.activeHosts} 
                      selectHost={this.selectHost}
                      selectedHostId={this.state.selectedHostId}/>
        <Headquarters areas={this.state.areas}
                      inactiveHosts={this.state.inactiveHosts} 
                      selectHost={this.selectHost} 
                      selectedHostId={this.state.selectedHostId}
                      selectedHost={this.state.selectedHost}
                      toggleActive={this.toggleActive}
                      setHostArea={this.setHostArea}
                      activateAll={this.activateAll}
                      deactivateAll={this.deactivateAll}
                      logs={this.state.logs}/>
      </Segment>
    )
  }
}

export default App;
