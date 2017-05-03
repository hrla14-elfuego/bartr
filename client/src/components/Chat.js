import React from 'react';
import axios from "axios";
import { Button, Form, TextArea } from 'semantic-ui-react'
import ChatList from './ChatList';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: ''
    }

    this.handleChatSubmit = this.handleChatSubmit.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  componentDidMount () {
    axios.get()
  }

  handleChatSubmit(event) {
    event.preventDefault();
    this.setState({messages: [this.state.message, ...this.state.messages]})
  }

  handleMessage(event) {
    event.preventDefault();
    this.setState({message: event.target.value});
  }

  render() {
    // console.log(this.props);
    return(
      <div>
      <Form onSubmit={this.handleChatSubmit}>
        <Form.Field onChange={this.handleMessage} control={TextArea} label='Chat!' placeholder='Send em a message' />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
      <ChatList messages={this.state.messages}/>
      </div>
    )
  }
}

export default Chat;

