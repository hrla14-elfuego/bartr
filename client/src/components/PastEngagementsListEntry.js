import React from 'react';

const PastEngagementsListEntry = (props) => {
  return(
    <div>
      <li>{props.engagement.sender.name}</li>
      <li>{props.engagement.reviews[0].review}</li>
      <li>{props.engagement.reviews[0].score}</li>
      <li>{props.engagement.receiver.name}</li>
      <li>{props.engagement.reviews[1].review}</li>
      <li>{props.engagement.reviews[1].score}</li>
    </div>
  )
}

export default PastEngagementsListEntry