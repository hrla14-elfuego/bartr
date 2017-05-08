import React from 'react';
import MessagesListEntry from './MessagesListEntry';
import { ListGroup } from 'react-bootstrap'

const MessagesList = (props) => {
  return(
    <div>
      {props.messages.map(message => 
        <MessagesListEntry key={message.id} message={message}/> 
      )}
    </div>
  )
}

export default MessagesList;