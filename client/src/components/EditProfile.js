import React from 'react';
import axios from 'axios';
import { each } from 'lodash';
import { Button, Checkbox, Form, Dropdown, Input } from 'semantic-ui-react';
// import { ServiceOptions } from '../Services/ServiceOptions';
import { geocodeByAddress } from 'react-places-autocomplete';
import Autocomplete from 'react-google-autocomplete';
import './styles/styles.css';

class EditProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      userInfo: {
        email: '',
        name: '',
        address: '',
        lat: '',
        lng: '',
        service_id: null,
        auth0_id: localStorage.profile.user_id
      },
      listOfServices: []
    }
    this.getServices = this.getServices.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.addressChange = this.addressChange.bind(this);
    this.serviceChange = this.serviceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getServices();
    const auth0_id = JSON.parse(localStorage.profile).user_id;
    this.setState({
      userInfo: {...this.state.userInfo, auth0_id: auth0_id}
    })
  }

  getServices() {
    axios.get('/api/services')
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
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.id_token
      }
    }
    axios.put(`/api/users/${this.state.userInfo.auth0_id}`, this.state.userInfo, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Err: ', err);
      })
  }

  emailChange(event) {
    this.setState({
      userInfo: {...this.state.userInfo, email: event.target.value}
    })
    // console.log(event.target.value);
  }

  nameChange(event) {
    this.setState({
      userInfo: {...this.state.userInfo, name: event.target.value}
    })
    // console.log(event.target.value);
  }

  addressChange(event, address) {
    geocodeByAddress(address || event.target.value, (err, latLng) => {
      if (err) { 
        console.log('Error: ', err);
      } else {
        // console.log(latLng.lat, latLng.lng);
        this.setState({
          userInfo: {...this.state.userInfo,
            address: address || event,
            lat: latLng.lat,
            lng: latLng.lng
          }
        })
      }
    })
  }

  serviceChange(event, result) {
    let service_id = null;
    each(this.state.listOfServices, (service) => {
      if (service.type === result.value) {
        service_id = service.id;
      }
    })
    this.setState({
      userInfo: {...this.state.userInfo, service_id: service_id}
    })
  }
  
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label style={{fontSize: '20px'}}>Email</label>
          <Input style={{width: '400px', height: '25px', fontSize: '20px'}} placeholder='Email' onChange={(e) => {this.emailChange(e)}}/>
        </Form.Field>
        <Form.Field>
          <label style={{fontSize: '20px'}}>Name</label>
          <Input style={{width: '400px', height: '25px', fontSize: '20px'}} placeholder='Name' onChange={(e) => {this.nameChange(e)}}/>
        </Form.Field>
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
        <h1><Button type='submit'>Submit</Button></h1>
      </Form>
    )
  }
}


export default EditProfile;