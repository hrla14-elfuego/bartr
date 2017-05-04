import React, { Component } from 'react';
import _ from 'lodash';
import MessagesList from './MessagesList';

class PastEngagementsListEntry extends Component {
  constructor(props){
    super(props)

    this.state = {
      messages: [],
      change: false
    }
// ...this.props.engagement.messages,...messages
    this.fetchMessages = this.fetchMessages.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
    console.log('inside CDM ', this.state.messages)
  }

  fetchMessages() {
    let msgs = [];
    _.each(this.props.engagement.messages, message => {
      console.log(message);
      msgs = [message, ...msgs]
    })
    console.log('inside fetch msgs', msgs);
    this.setState({messages: msgs});
    console.log('PLEASE ', this.state.messages);
    //   console.log(this.props.engagement.messages);
    //   console.log(this.props.engagement.messages[0].message);
    // _.each(this.props.engagement.messages, message => {
    //   console.log(message);
    //   this.setState({messages:[message, ...this.state.messages]})
    //   console.log('inside the each ', this.state.messages);
    // })
    //   console.log('outside the each', this.state.messages);
  }

  handleClick(event) {
    event.preventDefault();
    this.state.change === false ? this.setState({change: true}) : this.setState({change: false})
  }

  render() {
    console.log('we inside render yall ', this.state.messages)
    if(this.state.change === false) {
      return(
        <div onClick={this.handleClick}>
          <div>
            <div>
              <div>{this.props.engagement.sender.name}</div>
              <div>{this.props.engagement.reviews[0].review}</div>
              <div>{this.props.engagement.reviews[0].score}</div>
              <div>{this.props.engagement.receiver.name}</div>
              <div>{this.props.engagement.reviews[1].review}</div>
              <div>{this.props.engagement.reviews[1].score}</div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div onClick={this.handleClick}>
          <div>
            <div>
              <div>{this.props.engagement.sender.name}</div>
              <div>{this.props.engagement.reviews[0].review}</div>
              <div>{this.props.engagement.reviews[0].score}</div>
              <div>{this.props.engagement.receiver.name}</div>
              <div>{this.props.engagement.reviews[1].review}</div>
              <div>{this.props.engagement.reviews[1].score}</div>
            </div>
          </div>
          <MessagesList messages={this.state.messages}/>
        </div>
      )
    }
  }
}

export default PastEngagementsListEntry;
/*import React from 'react';

const PastEngagementsListEntry = (props) => {
  return(
    <div>
      <li>{props.engagement.sender.name}</li>
      <li>{props.engagement.reviews[0].review}</li>
      <li>{props.engagement.reviews[0].score}</li>
      <li>{props.engagement.receiver.name}</li>
      <li>{props.engagement.reviews[1].review}</li>
      <li>{props.engagement.reviews[1].score}</li>
    </div>
  )
}

export default PastEngagementsListEntry*/