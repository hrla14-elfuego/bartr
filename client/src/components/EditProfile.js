import React from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Dropdown, Input } from 'semantic-ui-react';
import { ServiceOptions } from '../Services/ServiceOptions';
import { geocodeByAddress } from 'react-places-autocomplete';
import Autocomplete from 'react-google-autocomplete';
import './styles/styles.css';

class EditProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      address: {
        lat: '',
        lng: ''
      },
      service: null
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
  }

  getServices() {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.id_token
      }
    }
    axios.get('/api/services', config)
      .then((err, res) => {
        err ? console.log('Err: ', err) : console.log(res);
      })
  }

  handleSubmit() {
    console.log(this.state);
    const token = localStorage.id_token;
    console.log(token);
  }

  emailChange(event) {
    this.setState({
      email: event.target.value
    })
    // console.log(event.target.value);
  }

  nameChange(event) {
    this.setState({
      name: event.target.value
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
          address: {
            lat: latLng.lat,
            lng: latLng.lng
          }
        })
      }
    })
  }

  serviceChange(event, result) {
    this.setState({
      service: result.value
    })
  }
  
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <Input style={{width: '400px'}} placeholder='Email' onChange={(e) => {this.emailChange(e)}}/>
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <Input style={{width: '400px'}} placeholder='Name' onChange={(e) => {this.nameChange(e)}}/>
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <Input style={{width: '400px'}}placeholder='Address'>
            <Autocomplete
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
        <Dropdown style={{width: '400px', display: 'inline-block'}}
          placeholder='Select Service'
          fluid selection options={ServiceOptions}
          onChange={this.serviceChange} />
        <h1><Button type='submit'>Submit</Button></h1>
      </Form>
    )
  }
}


export default EditProfile;