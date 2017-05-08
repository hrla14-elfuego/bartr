import React from 'react';
import { Well, ListGroup, ListGroupItem } from 'react-bootstrap';

const MessagesListEntry = (props) => {
  return(
    // <ListGroupItem >{props.message.message} </ListGroupItem> 
    <div>
        <p className="bubble">{props.message.message} </p>
    <div >
      </div>
      </div>
  )
}

export default MessagesListEntry
