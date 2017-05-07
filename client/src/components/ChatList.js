import React from 'react';
import ChatListEntry from './ChatListEntry';
import { Header, Image, Modal } from 'semantic-ui-react';
import './styles/styles.css';

const ChatList = (props) => {
  return (
    <div className="chatlistentry" >
      {props.messages.map((message, index) => 
        <ChatListEntry message={message} key={index}/>
      )}
    </div>
  )
}

export default ChatList;