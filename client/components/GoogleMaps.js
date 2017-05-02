import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from 'google-maps-react';
import PropTypes from 'prop-types';
// import ServiceMarker from './ServiceMarker';

class GoogleMaps extends Component {
  constructor(){
    super()

    this.state = {
      currentLocation: {
        lat: null,
        lng: null
      }
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let { initialCenter, zoom } = this.props;
      const { lat, lng } = !this.state.currentLocation.lat || !this.state.currentLocation.lng ? initialCenter : this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }

  render() {
    return (
      <div ref="map" style={{width: 300, height: 600}}>
        <GoogleMap google={this.props.google}>
        </GoogleMap>
      </div>
    );
  }

}

GoogleMaps.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object
}

GoogleMaps.defaultProps = {
  zoom: 15,
  initialCenter: {
    lat: 34.049963,
    lng: -118.300709
  }
}

export default GoogleMaps;

        // {/*defaultZoom={this.state.zoom}*/}
        {/*center={this.props.initialCenter}*/}











        // /*<AnyReactComponent
        //   lat={59.955413}
        //   lng={30.337844}
        //   text={'Kreyser Avrora'}
        // />*/

//   /*GettingStartedGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//     ref={props.onMapLoad}
//     defaultZoom={3}
//     defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
//     onClick={props.onMapClick}>
//     {props.markers.map((marker, index) => (
//       <Marker
//         {...marker}
//         onRightClick={() => props.onMarkerRightClick(index)}
//       />
//     ))}
//   </GoogleMap>
// ));
// // Then, render it:
//   render(
//     <GettingStartedGoogleMap
//       containerElement={
//         <div style={{ height: `100%` }} />
//       }
//       mapElement={
//         <div style={{ height: `100%` }} />
//       }
//       onMapLoad={_.noop}
//       onMapClick={_.noop}
//       markers={markers}
//       onMarkerRightClick={_.noop}
//     />,
//     document.getElementById('root')
//   );*/

  // /*const GettingStartedGoogleMap = withGoogleMap

  // render() {
  //   const mapContainer = <div style={{height: '100%', width: '100%'}}></div>
    
  //   return (
  //       <withGoogleMap
  //       containerElement = { mapContainer }
  //       googleMapElement = {
  //         <GoogleMap
  //           defaultZoom={15}
  //           defaultCenter={this.props.center}
  //           options={{streetViewControl: false, mapTypeControl: false}}>
  //         </GoogleMap>
  //       }>
  //       </withGoogleMap>
  //   )
  // }*/

      // {/*<Map google={this.props.google} zoom={14}>
      //   <Marker onClick={this.onMarkerClick}
      //           name={'Current location'} />
      //   <InfoWindow onClose={this.onInfoWindowClose}>
      //       <div>
      //         <h1>{this.state.selectedPlace.name}</h1>
      //       </div>
      //   </InfoWindow>
      // </Map>*/}