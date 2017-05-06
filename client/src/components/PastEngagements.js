import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import PastEngagementsList from './PastEngagementsList';

class PastEngagements extends React.Component {
  constructor(){
    super()

    this.state = {
      pastEngagements: []
    }
    this.fetchPast = this.fetchPast.bind(this);
  }
  
  componentDidMount() {
    this.fetchPast();
  }

  fetchPast() {
    const config = {
      headers: {'Authorization': 'Bearer ' + localStorage.id_token}
    };
    axios.get(API_ENDPOINT + '/api/engagements?completed=true', config)
         .then(res => {
           console.log(res);
           _.each(res.data, datum => {
             console.log('this is res.data. ', datum)
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
        <PastEngagementsList engagements={this.state.pastEngagements}/>
      </div>
    )
  }
}

export default PastEngagements;