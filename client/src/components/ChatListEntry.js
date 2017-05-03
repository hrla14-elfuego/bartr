import React from 'react';
import { Header, Image, Modal } from 'semantic-ui-react'

const ChatListEntry = (props) => {
  return(
    <Modal>
      <Modal.Header>Service Provider Name</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
        <Modal.Description>
          <Header>Message</Header>
          <p>props.message</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default ChatListEntry;