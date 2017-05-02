import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from 'google-maps-react';
import PropTypes from 'prop-types';
// import ServiceMarker from './ServiceMarker';
import _ from 'lodash';

class GoogleMaps extends Component {
  constructor(){
    super()

    this.state = {
      currentLocation: {
        lat: null,
        lng: null
      },
      locations: [[34.049837,-118.300708],[34.044917,-118.296672]]
    }

    this.loadMap = this.loadMap.bind(this);
    this.setMarkers = this.setMarkers.bind(this);
  }

  componentDidMount() {
    this.loadMap();
  }

  setMarkers(map) {
      _.each(this.state.locations, location => {
        let marker = new google.maps.Marker({
          position: {lat: location[0], lng: location[1]},
          map: map
        })
      })
    }

  loadMap() {
    if (this.props && this.props.google) {
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

      const home = {
        url: "http://findicons.com/files/icons/1580/devine_icons_part_2/128/home.png",
        scaledSize: new google.maps.Size(30,30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(15,15)
      }
      const marker = new maps.Marker({
        map: this.map,
        draggable: false,
        animation: maps.Animation.DROP,
        position: center,
        icon: home,
        title: "Your Location"
      })
      marker.setMap(this.map);
      this.setMarkers(this.map);
    }
  }


  render() {
    return (
      <div ref="map" style={{width: 600, height: 600}}>
        Loading Map...
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