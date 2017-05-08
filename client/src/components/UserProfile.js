import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Button } from 'semantic-ui-react';
import { PageHeader } from 'react-bootstrap';
import axios from 'axios';
import './styles/userProfileStyles.css';

class UserProfile extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      name: '',
      address: '',
      service: '',
      lat: '',
      lng: '',
      listOfServices: [] 
    }
    
    this.fetchUser = this.fetchUser.bind(this);
    this.fetchScore = this.fetchScore.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }

  componentDidMount() {
    this.getServices();
    this.fetchUser();

  }

  fetchScore() {
    axios.get(API_ENDPOINT + '/api/users')
  }

  getServices() {
    axios.get(API_ENDPOINT + '/api/services')
      .then(result => {
        _.each(result.data, service => {
          this.setState({
            listOfServices: this.state.listOfServices.concat([{text: service.type, value: service.id, key: service.id}])
          })
        })
      })
      .catch(err => {
        console.log('Error loading listOfServices: ', err);
      })
  }

  fetchUser() {
    let auth = JSON.parse(localStorage.profile).user_id
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.id_token
      }
    }
    axios.get(API_ENDPOINT + `/api/users/${auth}`, config)
      .then((res) => {
        let userService = null;
        _.each(this.state.listOfServices, (service) => {
          if (service.value === res.data.service_id) {
            userService = service.text;
          }
        })
        this.setState({...this.state,
          name: res.data.name,
          address: res.data.address,
          service: userService,
          lat: res.data.geo_lat,
          lng: res.data.geo_long
        })
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
    console.log(this.state)
    return(
      <div className="profile-page-content">
        <div className="user-profile-page card">
          <div className="user-profile-img">
            {/*<img className="bg-top" src="http://www.petsprin.com/i/2016/12/high-resolution-wallpaper-city-wallpaper-picture.jpg" />*/}
            <img className="avatar" src={this.props.profile.picture_large ? this.props.profile.picture_large : 'http://donatered-asset.s3.amazonaws.com/assets/default/default_user-884fcb1a70325256218e78500533affb.jpg'}/>
          </div>
          <div className="user-profile-info">
            <h1 className="name">{this.state.name}</h1>
            <p className="service">{this.state.service ? this.state.service : null}</p>
          </div> 
          <div className="address">{this.state.address ? this.state.address : null}</div>
          <Link to='/editprofile'><button>Edit Profile</button></Link>
        </div>
        <div className="google-maps" ref="map"/>
      </div>
    )
  }
}

export default UserProfile;

// http://allswalls.com/images/hdr-nature-background-wallpaper-3.jpg