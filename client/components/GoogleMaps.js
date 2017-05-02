import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Marker} from 'google-maps-react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class GoogleMaps extends Component {
  constructor(){
    super()

    this.state = {
      currentLocation: {
        lat: null,
        lng: null
      },
      locations: [[34.055136,-118.308628, 'Justin'],[34.044917,-118.296672, 'Jason']]
    }

    this.loadMap = this.loadMap.bind(this);
    this.setMarkers = this.setMarkers.bind(this);
  }

  componentDidMount() {
    this.loadMap();
  }

  setMarkers(map) {
      const maps = google.maps;
      let contentString = `<Modal>` + `<Modal.Header>Justin</Modal.Header>` + `<Modal.Content image>` + 
      `<Image wrapped size="medium" src="/assets/images/avatar/large/rachel.png"/>` + `</Modal>`;
      let infoWindow = new maps.InfoWindow({
        content: contentString
      })
      _.each(this.state.locations, location => {
        let marker = new maps.Marker({
          position: {lat: location[0], lng: location[1]},
          map: map
        })
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
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


  render() {
    return (
      <div className="google-maps" ref="map" style={{width: 600, height: 600}}>
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
