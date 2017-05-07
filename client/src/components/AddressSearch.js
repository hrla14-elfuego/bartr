import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Autocomplete from 'react-google-autocomplete';
import { Icon } from 'semantic-ui-react';
import { Dropdown, Input, Button, Header, Image, Grid } from 'semantic-ui-react';

export default class AddressSearch extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // }

  render() {
    return (
      <form className='searchform'>
        <Icon size='big' name='search' /><Input placeholder="Enter Your Location">
        <Autocomplete
          style={{width: 600}}
          // onChange={this.props.addressEntered}
          onPlaceSelected={(loc) => {
            console.log('location selected')
            this.props.doAddressEntered(loc.formatted_address, loc.geometry.location.lat(), loc.geometry.location.lng())
          }}
          types={['address']}
          componentRestrictions={{country: "USA"}}
        />
      </Input>
      </form>
    )
  }
}
