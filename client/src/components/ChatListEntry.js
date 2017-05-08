import React from 'react';
import { Header, Image, Card } from 'semantic-ui-react'
import './styles/styles.css';


const ChatListEntry = (props) => {
  let style = {marginLeft: 0};
  if(props.index % 2 !== 0){
    style ={marginLeft: "500%"}
  } else {
    style={marginLeft: 0}
  }
  return(
    <div className="chatlistentry" style={style} >
    
      <Card.Content >
        <Card.Description>          
          <p className="bubble">{props.message}</p>
        </Card.Description>
      </Card.Content>
    <br/>
    </div> 
  )
}

export default ChatListEntry;
// <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
{/*<Card.Content image>*/}