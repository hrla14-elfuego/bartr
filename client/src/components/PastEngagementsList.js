import React from 'react';
import PastEngagementsListEntry from './PastEngagementsListEntry';

const PastEngagementsList = (props) => {
  return(
    <div className="messagelistentry">
      {props.engagements.map(engagement => 
        <PastEngagementsListEntry key={engagement.id} engagement={engagement}/>
      )}
    </div>
  )
}

export default PastEngagementsList;