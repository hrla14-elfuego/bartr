import React from 'react';
import PastEngagementsListEntry from './PastEngagementsListEntry';

const PastEngagementsList = (props) => {
  return(
    <div>
      {props.engagements.map(engagement => 
        <PastEngagementsListEntry engagement={engagement}/>
      )}
    </div>
  )
}

export default PastEngagementsList;