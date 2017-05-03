import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Autocomplete from 'react-google-autocomplete'
import { geocodeByAddress } from 'react-places-autocomplete'
import { Dropdown, Input, Button, Header, Image, Grid } from 'semantic-ui-react';
import { ServiceOptions } from '../Services/ServiceOptions';

import ServiceProviderList from './ServiceProviderList';

import _ from 'lodash';
import axios from 'axios';

class GoogleMaps extends Component {
  constructor(){
    super()

    this.state = {
      service: '',
      currentAddress: '',
      currentLocation: {
        lat: null,
        lng: null
      },
      users: [{lat: 34.055136, lng: -118.308628, name: 'Justin', service: 'Barber'},{lat: 34.044917, lng: -118.296672, name: 'Jason', service: 'Mechanic'}]
    }

    this.loadMap = this.loadMap.bind(this);
    this.setMarkers = this.setMarkers.bind(this);
    this.handleCurrentAddress = this.handleCurrentAddress.bind(this);
    this.handleSubmitCurrentLocation = this.handleSubmitCurrentLocation.bind(this);
    this.handleService = this.handleService.bind(this);
    this.serviceFilter = this.handleService.bind(this);
    this.withinRange = this.withinRange.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount() {
    this.loadMap();
  }

  // componentDidUpdate() {
  //   this.serviceFilter();
  // }
/////////////////////// Sets Markers on Map and ties them to an info window/////////////////////////////

  fetchUsers() {
    axios.get('/services')
         .then(data => {
           _.each(data, datum => {
             this.setState({users:[...this.state.users, datum]})
           })
         }).catch(err => {
           console.log('Error with fetchUsers: ', err);
         })
  }

/////////////////////// Sets Markers on Map and ties them to an info window/////////////////////////////

  setMarkers(map) {
      const maps = google.maps;
      _.each(this.state.users, user => {
        let marker = new maps.Marker({
          position: {lat: user.lat, lng: user.lng},
          map: map
        })
        let contentString = `<div id="content">` + `<div id="siteNotice">` + `</div>` + 
        `<h1 id="firstHeading" class="firstHeading">${user.name}</h1>` +
        `<image wrapped size="medium" src="http://images4.wikia.nocookie.net/marveldatabase/images/9/9b/Ultimate_spiderman.jpg" height="85" width="85"/>` + 
        `<div id="bodyContent">` + `<h2>${user.service}</h2>` + `</div>`;
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
    const homeUrl = "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/residence-512.png";
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
        url: homeUrl,
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
///////////////////////////// Need to control submit occurring before place selected ///////////////////////////////

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

//////////////////////////////////// Filter through services ///////////////////////////////

  serviceFilter(event) {
    event.preventDefault();
    axios.get(`/services/${this.state.service}/${this.state.currentLocation}`)
         .then(data => {
           console.log(data);
           _.each(data, datum => {
            datum.service === this.state.service && withinRange(this.state.currentLocation.lat, this.state.currentLocation.lng, data.lat, data.lng) <= 10 ? this.setState({users:[...this.state.users, datum]}) : null
           })
         })
  }

//////////////////////////////////// Set state of chosen service from drop down ///////////////////////////////

  handleService(event, result) {
    event.preventDefault();
    this.setState({service: result.value});
  }

//////////////////////////////////// Find if the coordinates are within range of the user ///////////////////////////////

  withinRange(lat1,lng1,lat2,lng2) {
      const R = 3959; 
      let deg2rad = (deg) => {
        return deg * (Math.PI/180)
      }
      let dLat = deg2rad(lat2-lat1);  
      let dLng = deg2rad(lng2-lng1); 
      let a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLng/2) * Math.sin(dLng/2)
        ; 
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      let d = R * c; 
      return d;
    }

//////////////////////////////////// Search Bar to render coordinates ///////////////////////////////

  render() {
    return (
      <div style={{textAlign:'center'}}>
        <form onSubmit={this.handleSubmitCurrentLocation}>
          <Input placeholder="Enter Your Location">
            <Autocomplete
              style={{width: 600}}
              onChange={this.handleCurrentAddress}
              onPlaceSelected={(place) => {
                console.log(place);
                this.setState({currentAddress: place.formatted_address});
              }}
              types={['address']}
              componentRestrictions={{country: "USA"}}
            />
          </Input>
        </form>
        <br/>
        <form>
          <Dropdown onChange={this.handleService} placeholder="Select Your Service" fluid selection options={ServiceOptions} style={{width: 600}}>
          </Dropdown>
        </form>
        <br/>
        <div className="google-maps" ref="map" style={{width: 600, height: 600}}></div>
        <br/>
        <br/>
        <br/>
        <ServiceProviderList users={this.state.users}/>
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

// When we have more services
// fluid search selection options={ServiceOptions}