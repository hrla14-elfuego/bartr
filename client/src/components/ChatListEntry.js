import React from 'react';
import { Header, Image, Card } from 'semantic-ui-react'
import './styles/styles.css';


const ChatListEntry = (props) => {
  return(
    <div className="chatlistentry" >
    <Card >
      <Card.Content >
        <Card.Description>          
          <p className="bubble">{props.message}</p>
        </Card.Description>
      </Card.Content>
    </Card>
    </div>
  )
}

export default ChatListEntry;
// <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
{/*<Card.Content image>*/}