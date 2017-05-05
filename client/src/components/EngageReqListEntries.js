import React from 'react';
import { Well } from 'react-bootstrap';

const EngageReqListEntries = (props) => {
  let currMessages = [];
    
  _.each(props.currentEngagement.messages, message =>{
    currMessages = [message.message, ...currMessages] 
  })

  const messageAndId = () => {
    props.fetchMessages(currMessages);
    props.fetchId(props.currentEngagement.id);
  }

  return(
    <Well onClick={() => messageAndId()}>       
        <div>Reciever Name: {props.currentEngagement.receiver.name}</div>
        <div>Sender Name: {props.currentEngagement.sender.name}</div>
    </Well>
  )
} 

export default EngageReqListEntries
