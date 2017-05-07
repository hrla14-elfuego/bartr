import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import _ from 'lodash';
import { Button, Checkbox, Form, Dropdown, Input } from 'semantic-ui-react';
import { geocodeByAddress } from 'react-places-autocomplete';
import Autocomplete from 'react-google-autocomplete';
import './styles/styles.css';

class EditProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      userInfo: {
        address: '',
        geo_lat: '',
        geo_lng: '',
        service_id: '',
        auth0_id: ''
      },
      service: '',
      listOfServices: []
    }
    this.getServices = this.getServices.bind(this);
    this.addressChange = this.addressChange.bind(this);
    this.newServiceChange = this.newServiceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(localStorage.id_token)
    this.setInitialInfo();
    this.getServices();
    const auth0_id = JSON.parse(localStorage.profile).user_id;
    this.setState({
      userInfo: {...this.state.userInfo, auth0_id: auth0_id}
    })
  }

  setInitialInfo() {
    const auth0_id = JSON.parse(localStorage.profile).user_id;
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.id_token}`
        }
      }
    axios.get(API_ENDPOINT + `/api/users/${auth0_id}`, config)
      .then((res) => {
        this.setState({
          userInfo: {...this.state.userInfo,
            address: res.data.address,
            geo_lat: res.data.geo_lat,
            geo_lng: res.data.geo_lng,
            service_id: res.data.service_id,
          }
        })
        console.log(res)
        console.log(this.state)
      })
      .catch((err) => {
        console.log(err);
      })
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

  handleSubmit() {
    const auth0_id = JSON.parse(localStorage.profile).user_id;
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.id_token
      }
    }
    if(!this.state.service) {
      axios.put(`${API_ENDPOINT}/api/users/${this.state.userInfo.auth0_id}`, this.state.userInfo, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log('Err: ', err);
        })
    } else {
      axios.put(`${API_ENDPOINT}/api/users/${this.state.userInfo.auth0_id}`, this.state.userInfo, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log('Err: ', err);
        })
      axios.post(API_ENDPOINT + '/api/services/', {
        type: this.state.service
      }, config)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log('Error in Service POST: ', err);
        })
    }
  }

  emailChange(event) {
    this.setState({
      userInfo: {...this.state.userInfo, email: event.target.value}
    })
  }

  nameChange(event) {
    this.setState({
      userInfo: {...this.state.userInfo, name: event.target.value}
    })
  }
 
  newServiceChange(event) {
    this.setState({service: event.target.value})
  }

  addressChange(event, address) {
    geocodeByAddress(address || event.target.value, (err, latLng) => {
      if (err) { 
        console.log('Error: ', err);
      } else {
        this.setState({
          userInfo: {...this.state.userInfo,
            address: address || event,
            geo_lat: latLng.lat,
            geo_lng: latLng.lng
          }
        })
        console.log(this.state.userInfo);
      }
    })
  }

  serviceChange(event, result) {
    let service_id = null;
    console.log('list of services: ', this.state.listOfServices)
    _.each(this.state.listOfServices, (service) => {
      console.log('result.value: ', result.value)
      if (service.value === result.value) {
        service_id = service.value;
      }
    })
    this.setState({
      userInfo: {...this.state.userInfo, service_id: service_id}
    })
    console.log('STATE: ', this.state.userInfo);
  }
  
  render() {
    console.log(this.state)
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label style={{fontSize: '20px'}}>Address</label>
          <Input placeholder='Address' style={{ display: 'inline-block' }}>
            <Autocomplete
              style={{width: '400px', height: '25px', fontSize: '20px'}}
              onChange={(e) => {this.addressChange(e, null)}}
              onPlaceSelected={(place) => {
                console.log(place);
                this.addressChange(null, place.formatted_address);
              }}
              types={['address']}
              componentRestrictions={{country: 'USA'}}>
            </Autocomplete>
          </Input>
        </Form.Field>
        <label style={{fontSize: '20px'}}>Service</label>
        <br/>
        <Dropdown style={{width: '400px', display: 'inline-block', height: '10px', fontSize: '20px'}}
          placeholder='Select Service'
          fluid selection options={this.state.listOfServices}
          onChange={this.serviceChange} />
        <br/>
        <br/>
        <Form.Field>
          <label style={{fontSize: '20px'}}>Can't Find Your Skill? Add a Service!</label>
          <Input style={{width: '400px', height: '25px', fontSize: '20px'}} placeholder='Service' onChange={(event) => {this.newServiceChange(event)}}/>
        </Form.Field>
        <h1><Button type='submit'>Submit</Button></h1>
      </Form>
    )
  }
}


export default EditProfile;