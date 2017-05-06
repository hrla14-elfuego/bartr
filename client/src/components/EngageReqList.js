import React from 'react';
import _ from 'lodash';
import EngageReqListEntries from "./EngageReqListEntries"


const EngageReqList = (props) => {
  return (
    <div >
      {props.currentEngagement.map((currentEngagement, index) =>
        <EngageReqListEntries currentEngagement={currentEngagement} key={index} fetchEngagements={props.fetchEngagements} fetchId={props.fetchId} fetchMessages={props.fetchMessages}/>
      )}
    </div>
  )
}

export default EngageReqList;