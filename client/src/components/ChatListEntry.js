import React from 'react';
import { Header, Image, Card } from 'semantic-ui-react'

const ChatListEntry = (props) => {
  return(
    <Card style={{textAlign: "center"}}>
      <Card.Content >
        <Card.Description>
          <Header>Message</Header>
          <p>{props.message}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default ChatListEntry;
// <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
{/*<Card.Content image>*/}