import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from 'react-google-autocomplete'
import { geocodeByAddress } from 'react-places-autocomplete'
import { Input, Button, Header, Image, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';

class GoogleMaps extends Component {
  constructor(){
    super()

    this.state = {
      currentAddress: '',
      currentLocation: {
        lat: null,
        lng: null
      },
      locations: [[34.055136,-118.308628, 'Justin', 'Barber'],[34.044917,-118.296672, 'Jason', 'Tech']]
    }

    this.loadMap = this.loadMap.bind(this);
    this.setMarkers = this.setMarkers.bind(this);
    this.handleCurrentAddress = this.handleCurrentAddress.bind(this);
    this.handleSubmitCurrentLocation = this.handleSubmitCurrentLocation.bind(this);
  }

  componentDidMount() {
    this.loadMap();
  }

/////////////////////// Sets Markers on Map and ties them to an info window/////////////////////////////

  setMarkers(map) {
      const maps = google.maps;
      _.each(this.state.locations, location => {
        let marker = new maps.Marker({
          position: {lat: location[0], lng: location[1]},
          map: map
        })
        let contentString = `<div id="content">` + `<div id="siteNotice">` + `</div>` + 
        `<h1 id="firstHeading" class="firstHeading">${location[2]}</h1>` +
        `<image wrapped size="medium" src="http://images4.wikia.nocookie.net/marveldatabase/images/9/9b/Ultimate_spiderman.jpg" height="85" width="85"/>` + 
        `<div id="bodyContent">` + `<h2>${location[3]}</h2>` + `</div>`;
        let infoWindow = new maps.InfoWindow({
          content: contentString
        })
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        })
      })
    }

/////////////////////// Loads map at their location. Adds marker for their location too/////////////////////////////


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
        url: "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/residence-512.png",
        scaledSize: new google.maps.Size(40,40),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(20,20)
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

//////////////////////////////////// Changes state of currentAddress to geocode ///////////////////////////////

handleCurrentAddress(event) {
  event.preventDefault();
  this.setState({currentAddress: event.target.value});
}

///////////////////////////// Geocodes location to give lat and lng and runs loadMap ///////////////////////////////

handleSubmitCurrentLocation(event) {
  event.preventDefault();
  geocodeByAddress(this.state.currentAddress, (err, latLng) => {
    if(err) {
      console.log('Error with geocoding: ', err);
    } else {
      console.log('Lat and Lng obtained: ', latLng.lat, latLng.lng);
      this.setState({currentLocation:{lat:latLng.lat, lng:latLng.lng}});
      this.loadMap();
    }
  })
}

//////////////////////////////////// Search Bar to render coordinates ///////////////////////////////

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitCurrentLocation}>
          <Input placeholder="Enter your location">
            <Autocomplete
              style={{width: 600}}
              onChange={this.handleCurrentAddress}
              onPlaceSelected={(place) => {
                console.log(place);
              }}
              types={['address']}
              componentRestrictions={{country: "USA"}}
            />
          </Input>
        </form>
        <div className="google-maps" ref="map" style={{width: 600, height: 600}}>
        </div>
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

