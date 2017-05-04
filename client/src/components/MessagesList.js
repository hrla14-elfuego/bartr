import React from 'react';
import MessagesListEntry from './MessagesListEntry';

const MessagesList = (props) => {
  return(
    <div>
      {props.messages.map(message => 
        <MessagesListEntry message={message}/>
      )}
    </div>
  )
}

export default MessagesList;