import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Button } from 'semantic-ui-react';
import { PageHeader } from 'react-bootstrap';
import axios from 'axios';
import './styles/styles.css';

class UserProfile extends Component {
  constructor (props) {
    super (props)

    this.state = {
      lat: null,
      lng: null
    }
    
    this.fetchUser = this.fetchUser.bind(this);
    this.fetchScore = this.fetchScore.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchScore() {
    axios.get(API_ENDPOINT + '/api/users')
  }

  fetchUser() {
    console.log('WE IN FETCHUSERS FOR USERPROFILE')
    console.log(JSON.parse(localStorage.profile))
    let auth = JSON.parse(localStorage.profile).user_id
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.id_token
      }
    }
    axios.get(API_ENDPOINT + `/api/users/${auth}`, config)
        .then((res) => {
          console.log('Response in fetchUsers in UserProfile', res);
          this.setState({lat: res.data.geo_lat, lng: res.data.geo_long});
          this.loadMap();
        })
        .catch(err => {
          console.log('Error in fetchUsers in UserProfile: ', err);
        })
  }

  loadMap() {
    const homeUrl = "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/residence-512.png";
      const google = window.google;
      const maps = google.maps;
      
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 15;
      const center = new maps.LatLng(this.state.lat, this.state.lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
      this.googleMap = this.map

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
  }

  render() {
    return(
      <div>
        <div className='profileHeader'>
          <PageHeader>User Profile <small>Account Info</small></PageHeader>
          {/*<div className='userProfileHeader'>User Profile</div>*/}
        </div>
        <div className='userprofile'>
          <h2 style={{textAlign: 'center', fontSize: '50px', fontFamily: 'Papyrus, fantasy'}}>{this.props.profile.name ? 'Hello, ' + this.props.profile.name : null}</h2>
          <img src={this.props.profile.picture_large} height="200px" />
          <br/>
          <div className="google-maps" ref="map" style={{width: 'absolute', height: 600}}></div>
          <br/>
          <h1 style={{margin: 'auto'}}><Link to='editprofile'><Button>Edit Profile</Button></Link></h1>
        </div>
      </div>
    )
  }
}

export default UserProfile;