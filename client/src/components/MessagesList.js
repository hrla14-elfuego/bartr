import React from 'react';
import MessagesListEntry from './MessagesListEntry';
import { ListGroup } from 'react-bootstrap'

const MessagesList = (props) => {
  return(
    <ListGroup>
      {props.messages.map(message => 
        <MessagesListEntry key={message.id} message={message}/> 
      )}
    </ListGroup>
  )
}

export default MessagesList;