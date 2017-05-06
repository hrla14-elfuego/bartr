import React from 'react';
import axios from "axios";
import { Button, Form, TextArea } from 'semantic-ui-react'
import ChatList from './ChatList';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: '',
      engagementId: null
    }
    this.changeId = this.changeId.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.updateChatHistory = this.updateChatHistory.bind(this);
    this.handleIdAndMessage = this.handleIdAndMessage.bind(this);
  }

  changeId(){
    // this.setState({messages:[]})
    this.setState({engagementId: this.props.id})
  }
  
  handleMessage(event) {
    event.preventDefault();
    this.setState({message: event.target.value});
  }
  
  updateChatHistory(event) {
    event.preventDefault();
    const config = {
      headers: {'Authorization': 'Bearer ' + localStorage.id_token,
                'Content-Type': 'application/json' }
      };
    axios.post("/api/messages", {
      "engagement_id": this.state.engagementId, 
      "message": this.state.message
    }, config)
    .then(res => {
      this.setState({messages: [this.state.message, ...this.state.messages]});
    })
    .catch(err => {
      if(err){
        console.log("there was err fetching data", err)
      }
    })
  }

  handleIdAndMessage(event) {
    this.handleMessage(event);
    // this.changeId();
  }

  render() {
    console.log(this.props.currentEngagement)
    let messages =  [...this.state.messages, ...this.props.messages];
    return (
      <div>
        <Form onSubmit={this.updateChatHistory}>
          <Form.Field onClick={this.changeId} onChange={this.handleIdAndMessage}  control={TextArea} label='Chat!' placeholder='Send em a message' />
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
        <ChatList messages={messages}/>
      </div>
    )
  }
}

export default Chat;