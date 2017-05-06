import React from 'react';
import axios from "axios";
import { Link } from 'react-router';
import _ from "lodash"
import EngageReqList from "./EngageReqList";
import Chat from "./Chat";

class EngageReq extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEngagement: [],
      messages: [],
      id : null
    }
      this.fetchMessages = this.fetchMessages.bind(this);
      this.fetchCurrentEngagement = this.fetchCurrentEngagement.bind(this);
      this.fetchEngagements = this.fetchEngagements.bind(this);
      this.fetchCurrentId = this.fetchCurrentId.bind(this);
  }

  componentDidMount () {
    this.fetchCurrentEngagement();
  }

  fetchCurrentEngagement() {
    const config = {
      headers: {'Authorization': 'Bearer ' + localStorage.id_token}
    };
    axios.get("/api/engagements", config)
    .then(res => {
      _.each(res.data, data =>{
        this.setState({currentEngagement: [...this.state.currentEngagement, data]})
      })
    })
    .catch(err =>{
        console.log("Error fetchCurrentEngagement", err);
    })
  }

  fetchCurrentId(selectedEngageId) {
    this.setState({id: selectedEngageId})
  }

  fetchMessages(msgs) {
    this.setState({messages: msgs})
  }

  fetchEngagements(eng) {
    let completed;
    _.each(this.state.currentEngagement, (engagements, index) => {
      _.each(engagements, (value, key) => {
        value === eng.id ? completed = index : null
      })
    })
    this.state.currentEngagement.splice(completed, 1);
    this.setState({currentEngagement: this.state.currentEngagement});
  }

  render() {
    return(
      <div>
        <EngageReqList 
          currentEngagement={this.state.currentEngagement} 
          fetchEngagements={this.fetchEngagements}
          fetchId={this.fetchCurrentId} 
          fetchMessages={this.fetchMessages}/>
        <Chat id={this.state.id} messages={this.state.messages} currentEngagement={this.state.currentEngagement}/>
      </div>
    )
  }
}

export default EngageReq;