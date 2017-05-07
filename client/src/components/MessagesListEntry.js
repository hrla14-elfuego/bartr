import React from 'react';
import { Well, ListGroup, ListGroupItem } from 'react-bootstrap';

const MessagesListEntry = (props) => {
  return(
    // <ListGroupItem >{props.message.message} </ListGroupItem> 
    <div class="container">
        {props.message.message}
    <div class="bubble">
      </div>
      </div>
  )
}

export default MessagesListEntry
