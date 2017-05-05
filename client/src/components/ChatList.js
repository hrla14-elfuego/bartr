import React from 'react';
import ChatListEntry from './ChatListEntry';
import { Header, Image, Modal } from 'semantic-ui-react'

const ChatList = (props) => {
  return (
    <div>
      {props.messages.map((message, index) => 
        <ChatListEntry message={message} key={index}/>
      )}
    </div>
  )
}

export default ChatList;