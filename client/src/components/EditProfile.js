import React from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Dropdown } from 'semantic-ui-react';
import {ServiceOptions} from '../Services/ServiceOptions';

class EditProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      profileEdit: {
        email: '',
        name: '',
        address: '',
        service: null
      }
    }

    
  }

  handleSubmit() {

  }
  
  

  render() {
    console.log(ServiceOptions);
    return (
      <Form>
        <Form.Field>
          <label>Email</label>
          <input placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input placeholder='Address' />
        </Form.Field>
        <Dropdown placeholder='Select Service' fluid selection options={ServiceOptions} />
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}


export default EditProfile;