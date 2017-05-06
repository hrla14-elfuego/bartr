import React from 'react';
import { Well, ListGroup, ListGroupItem } from 'react-bootstrap';

const MessagesListEntry = (props) => {
  return(
    <ListGroupItem>{props.message.message}</ListGroupItem>
  )
}

export default MessagesListEntry
