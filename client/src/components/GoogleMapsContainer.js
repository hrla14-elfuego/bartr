import React, { Component } from 'react';
import GoogleMaps from './GoogleMaps';

class GoogleMapsContainer extends Component {
  
  
  render() {
    return (
      <div>
        <GoogleMaps google={window.google}>
        </GoogleMaps>
      </div>
    )
  }
}

export default GoogleMapsContainer;