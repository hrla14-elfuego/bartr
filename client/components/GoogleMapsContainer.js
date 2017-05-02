import React, { Component } from 'react';
import GoogleMaps from './GoogleMaps';

class GoogleMapsContainer extends Component {
  
  
  render() {
    return (
      <div>
        <GoogleMaps google={this.props.google}>
        </GoogleMaps>
      </div>
    )
  }
}

export default GoogleMapsContainer;