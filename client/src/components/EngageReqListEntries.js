import React, { Component } from 'react';
import { Button, ButtonControl, Well } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

const EngageReqListEntries = (props) => {
  let currMessages = [];
  let currentEngagement = props.currentEngagement;

  _.each(currentEngagement.messages, message => {
    currMessages = [...currMessages, message.message] 
  })

  const messageAndId = () => {
    props.fetchMessages(currMessages);
    props.fetchId(currentEngagement.id);
  }

  // const postReview = () => {
  //   const config = {
  //     headers: {'Authorization': 'Bearer ' + localStorage.id_token}
  //   };
  //   axios.post('/api/reviews', config)
  //        .then(data => {
  //          console.log(data)
  //        })
  // }

  const engagementCompleted = (event, selectedEngagement) => {
    event.preventDefault();
    const config = {
      headers: {'Authorization': 'Bearer ' + localStorage.id_token}
    };
    axios.put(`/api/engagements/${selectedEngagement.id}`, {
      where: {
        id: selectedEngagement.id
      }
    }, config)
    .then(data => {
      console.log('Engagement updated! ', data);
      swal({
        title: 'Engagement Complete!',
        text: 'We hope it was a pleasant exerience!',
        type: 'success'
      })
      props.fetchEngagements(data.data);
    })
    .catch(err => {
      console.log('Error with engagementCompleted: ', err);
    })
  }

  return(
    <Well>       
      <Well onClick={() => messageAndId()}>       
          <div>Reciever Name: {currentEngagement.receiver.name}</div>
          <div>Sender Name: {currentEngagement.sender.name}</div>
          <br/>
      </Well>
      <br/>
      <Button value={currentEngagement} onClick={() => {engagementCompleted(event, currentEngagement)}} bsStyle="primary">Completed?</Button>
    </Well>
  )
}

export default EngageReqListEntries

// Add feature to write reviews from the sweetalert