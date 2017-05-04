import React from 'react';
import MessagesListEntry from './MessagesListEntry';

const MessagesList = (props) => {
  console.log('inside messagelist ', props.messages)
  return(
    <div>
      {props.messages.map(message => 
        <MessagesListEntry key={message.id} message={message}/>
      )}
    </div>
  )
}

export default MessagesList;