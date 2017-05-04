import React from 'react';

const MessagesListEntry = (props) => {
  return(
    <div>
      <li>{props.message.message}</li>
    </div>
  )
}

export default MessagesListEntry