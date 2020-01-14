import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import HQ from './components/Headquarters'
import { Log } from './services/Log'


class App extends Component {

  constructor() {
    super();
    this.state = {
      hosts:[],
      areas:[],
      logs:[],
      selectedHost:null
    }
  }
  

  componentDidMount() {
    this.getHosts()
    this.getAreas()
  } 

  getAreas = () =>{
    fetch('http://localhost:4000/areas')
    .then(r=>r.json())
    .then(areas => {
      areas.map(area => {
        area.hosts = []
        return area
      })
      areas.map(area => {
        area.title = area.name.split("_").map(word=>word[0].toUpperCase() + word.slice(1)).join(" ")
        return area
      })
      
      
      let areasArr = [...areas]
      let hostsArr = [...this.state.hosts]
      for (let i in areasArr) {
        for (let x in hostsArr) {
          if(areasArr[i].name === hostsArr[x].area) {
            areasArr[i].hosts.push(hostsArr[x])
          }
        }
      }
      
      console.log(areasArr)
      this.setState({
      areas:areasArr
      }, () => {
        console.log(this.state.areas)
      })
    })
  }

  getHosts = () => {
    fetch('http://localhost:4000/hosts')
    .then(r=> r.json())
    .then(hosts => {

      this.setState({
      hosts:hosts
      }, () => {
        console.log(this.state.hosts)
      })
    })
  }

  

  selectHost = (host) => {
    this.setState({
      selectedHost:host
    },() => {
      console.log(this.state.selectedHost)
    })
  }

  changeArea = (newArea) => {

    let oldArea = this.state.selectedHost.area,
        newSelectedHost = this.state.selectedHost,
        oldAreaObj = this.state.areas.find(area => area.name === oldArea),
        newAreaObj = this.state.areas.find(area => area.name === newArea)
    
    if(newAreaObj.hosts.length < newAreaObj.limit) {
      let oldAreaHosts = oldAreaObj.hosts.filter(host => host.id != this.state.selectedHost.id)
      newAreaObj.hosts.push(this.state.selectedHost)

      oldAreaObj.hosts = oldAreaHosts
      let newAreas = [...this.state.areas].map(area => newAreaObj.id === area.id ? newAreaObj : area )
      newAreas = newAreas.map(area => oldAreaObj.id === area.id ? oldAreaObj : area )
            
      newSelectedHost.area = newArea
      let newLog = Log.notify(`${this.state.selectedHost.firstName} set in area ${newAreaObj.title}`),
          newLogs = [newLog,...this.state.logs]
          console.log(oldAreaObj.id, newAreas)
      this.setState({
        areas:newAreas,
        selectedHost:newSelectedHost,
        logs:newLogs
      }, () => {
        console.log(this.state)
      })
    } else {
      let newLog = Log.error(`Too many hosts. Cannot add ${this.state.selectedHost} to ${newAreaObj.title}`),
          newLogs = [newLog,...this.state.logs]
      this.setState({
        logs:newLogs
      }, () => {
        console.log(this.state)
      })
    }
    
  }

  activateDeactivate = () => {
    let toggledHost = this.state.selectedHost,
        newAreaObj = this.state.areas.find(area => area.name === this.state.selectedHost.area)
    
    
    toggledHost.active = !toggledHost.active
    newAreaObj.hosts.map(host => host.id === toggledHost.id ? toggledHost : host)
    let msg = !this.state.selectedHost.active ? `Decommissioned ${this.state.selectedHost.firstName}`: `Activated ${this.state.selectedHost.firstName}`
    console.log(toggledHost,newAreaObj);
    
    let newAreas = [...this.state.areas].map(area => area.id === newAreaObj.id ? newAreaObj : area ),
        newLog = !this.state.selectedHost.active ? Log.notify(msg) : Log.warn(msg),
        newLogs = [newLog,...this.state.logs]  
    
    this.setState({
      areas:newAreas,
      selectedHost:toggledHost,
      logs:newLogs
    })
  }

  dummyLogs = () => {
    // This is just to show you how this should work. But where should the log data actually get stored?
    // And where should we be creating logs in the first place?
    // Use the Log Service class (located in: 'src/services/Log') we've created anywhere you like.
    // Just remember to import it

    let logs = []

    logs.unshift(Log.warn("This is an example of a warn log"))
    logs.unshift(Log.notify("This is an example of a notify log"))
    logs.unshift(Log.error("This is an example of an error log"))

    return logs
  }

  actDeactAll = (buttonState) => {
    if(!buttonState) {
      let newAreas = this.state.areas
      for(let ind in newAreas) {
        for(let ind2 in newAreas[ind].hosts) {
          newAreas[ind].hosts[ind2].active = true
        }
      }
      
      let newLog = Log.warn(`Activating all hosts!`),
          newLogs = [newLog,...this.state.logs]
      this.setState({
        areas:newAreas,
        logs:newLogs
      })
    } else {
      let newAreas = this.state.areas
      for(let ind in newAreas) {
        for(let ind2 in newAreas[ind].hosts) {
          newAreas[ind].hosts[ind2].active = false
        }
      }

      let newLog = Log.notify('Decommissiong all hosts.'),
          newLogs = [newLog,...this.state.logs]

      this.setState({
        areas:newAreas,
        logs:newLogs
      })
    }
  }

  render(){
    return (
      <Segment id='app'>
        {/* What components should go here? Check out Checkpoint 1 of the Readme if you're confused */}
        <WestworldMap areas={this.state.areas} 
                      selectedHost={this.state.selectedHost}
                      handleClick={this.selectHost} />

        <HQ areas={this.state.areas} 
            selectedHost={this.state.selectedHost} 
            selectHost={this.selectHost}
            toggled={this.activateDeactivate}
            areaChange={this.changeArea}
            logs={this.state.logs}
            allClick={this.actDeactAll} />
      </Segment>
    )
  }
}

export default App;
