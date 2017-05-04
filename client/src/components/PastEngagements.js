import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import PastEngagementsList from './PastEngagementsList';

class PastEngagements extends React.Component {
  constructor(){
    super()

    this.state = {
      pastEngagements: [],
      messages: []
    }
    this.fetchPast = this.fetchPast.bind(this);
  }
  
  componentDidMount() {
    this.fetchPast();
  }

  fetchPast() {
    const config = {
      headers: {'Authorization': 'Bearer ' + token}
    };
    axios.get('/engagements?completed=true', config)
         .then(data => {
           console.log(data);
           _.each(data, datum => {
            this.setState({pastEngagements:[datum, ...this.state.pastEngagements]})
           })
         })
         .catch(err => {
           console.log("Error in fetchPast: " , err)          
         })
  }

  render() {
    return(
      <div>
        <PastEngagementsList engagements={this.state.engagements}/>
      </div>
    )
  }
}

export default PastEngagements;