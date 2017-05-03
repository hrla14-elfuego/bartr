import React from 'react';
import ChatListEntry from './ChatListEntry';
import { Header, Image, Modal } from 'semantic-ui-react'

const ChatList = (props) => {
  return (
    <div>
      {props.messages.map(message => 
        <ChatListEntry message={message}/>
      )}
    </div>
  )
}

export default ChatList;