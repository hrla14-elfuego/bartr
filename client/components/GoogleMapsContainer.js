import React, { Component } from 'react';
import GoogleMaps from './GoogleMaps';
import ServiceMarker from './ServiceMarker';

class GoogleMapsContainer extends Component {
  render() {
    const style = {
      width: '50vw',
      height: '50vh'
    }
    return (
      <div>
        <GoogleMaps google={this.props.google}>
        </GoogleMaps>
      </div>
    )
  }
}

export default GoogleMapsContainer