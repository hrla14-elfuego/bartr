import React, { Component } from 'react';
import _ from 'lodash';
import MessagesList from './MessagesList';
import { Well } from 'react-bootstrap';
import { Button, Form, TextArea } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import options from '../options/ScoreOptions';
import axios from 'axios';

class PastEngagementsListEntry extends Component {
  constructor(props){
    super(props)

    this.state = {
      messages: [],
      review: '',
      score: null,
      change: false
    }
    this.fetchMessages = this.fetchMessages.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    this.handleReviewText = this.handleReviewText.bind(this);
    this.handleSelectedScore = this.handleSelectedScore.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    let msgs = [];
    _.each(this.props.engagement.messages, message => {
      msgs = [...msgs, message]
    })
    this.setState({messages: msgs});
  }

  handleClick(event) {
    event.preventDefault();
    this.state.change === false ? this.setState({change: true}) : this.setState({change: false})
  }

  handleReviewSubmit(event, engagement) {
    event.preventDefault();
    const config = {
      headers: {'Authorization': 'Bearer ' + localStorage.id_token}
    };
    axios.post(API_ENDPOINT + '/api/reviews', {
      "engagement_id": engagement.id,
      "score": this.state.score,
      "review": this.state.review
    } , config)
      .then(data => {
        console.log('Review posted! ', data);
      })
      .catch(err => {
        console.log('Error in Review POST: ', err)
      })
  }
  
  handleReviewText(event) {
    this.setState({review: event.target.value});
  }

  handleSelectedScore(event, result){
    event.preventDefault();
    this.setState({score: result.value});
    console.log(this.state.score)
  }

  render() {
    let engagement = this.props.engagement;
    let name, currentUser;
    if(this.state.change === false) {
      return (
        <Well onClick={this.handleClick}>
          <div>{this.props.engagement.sender.name}</div>
          <div>{this.props.engagement.receiver.name}</div>
        </Well>
      )
    } else {
      if(!this.props.engagement.reviews[0] && !this.props.engagement.reviews[1]) {
        return(
          <Well>
            <Well onClick={this.handleClick}>
              <div>{this.props.engagement.sender.name}</div>
              <div>{this.props.engagement.receiver.name}</div>
            </Well>
            <br/>
            <Form value={engagement} onSubmit={() => {this.handleReviewSubmit(event, engagement)}}>
              <Form.Field onChange={this.handleReviewText} control={TextArea} label='Leave a Review!' placeholder='Write your Review' />
              <br/>
              <Dropdown onChange={this.handleSelectedScore} placeholder="Score this Engagement" fluid selection options={options.options} style={{width: 600}}>
              </Dropdown>
              <br/>
              <Form.Field control={Button}>Submit</Form.Field>
            </Form>
            <br/>
            Message History
            <MessagesList messages={this.state.messages}/>
          </Well>
        )
      } else {
        if(!this.props.engagement.reviews[1]) {
          if(this.props.engagement.reviews[0].sender_id === this.props.engagement.sender.id) {
            currentUser = this.props.engagement.sender;
            name = this.props.engagement.sender.name;
          } else {
            currentUser = this.props.engagement.receiver;
            name = this.props.engagement.receiver.name;
          }
          if(currentUser.email === JSON.parse(localStorage.profile).email) {
            return(
              <Well>
                <Well onClick={this.handleClick}>
                  <div>{this.props.engagement.sender.name}</div>
                  <div>{this.props.engagement.receiver.name}</div>
                </Well>
                <br/>
                  <div>{name}</div>
                  <div>Review: {this.props.engagement.reviews[0].review}</div>
                  <div>Score: {this.props.engagement.reviews[0].score}</div>
                <br/>
                Message History
                <MessagesList messages={this.state.messages}/>
              </Well>
            )
        } else if (currentUser.email !== JSON.parse(localStorage.profile).email) {
          return (
            <Well>
              <Well onClick={this.handleClick}>
                <div>{this.props.engagement.sender.name}</div>
                <div>{this.props.engagement.receiver.name}</div>
              </Well>
              <br/>
              <Form value={engagement} onSubmit={() => {this.handleReviewSubmit(event, engagement)}}>
                <Form.Field onChange={this.handleReviewText} control={TextArea} label='Leave a Review!' placeholder='Write your Review' />
                <br/>
                <Dropdown onChange={this.handleSelectedScore} placeholder="Score this Engagement" fluid selection options={options.options} style={{width: 600}}>
                </Dropdown>
                <br/>
                <Form.Field control={Button}>Submit</Form.Field>
              </Form>
              <br/>
              Message History
              <MessagesList messages={this.state.messages}/>
            </Well>
          )
        } 
      } else {
        return (
          <Well>
            <Well onClick={this.handleClick} >
              <div>{this.props.engagement.sender.name}</div>
              <div>{this.props.engagement.receiver.name}</div>
            </Well>
            <br/>
              <div>{this.props.engagement.sender.name}</div>
              <div>Review: {this.props.engagement.reviews[0].review}</div>
              <div>Score: {this.props.engagement.reviews[0].score}</div>
            <br/>
              <div>{this.props.engagement.receiver.name}</div>
              <div>Review: {this.props.engagement.reviews[1].review}</div>
              <div>Score: {this.props.engagement.reviews[1].score}</div>
            <br/>
            Message History
            <MessagesList messages={this.state.messages}/>
          </Well>
          )
        }
      }
    }
  }
}

export default PastEngagementsListEntry;
