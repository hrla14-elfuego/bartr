import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react';
import { Dropdown, Input, Button, Header, Image, Grid } from 'semantic-ui-react';
import Geosuggest from 'react-geosuggest';

export default class AddressSearch extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // }

  render() {
    return (
      <form className='searchform'>
        <Icon size='big' name='search' /><Input placeholder="Enter Your Location">
        <Geosuggest
          country="us"
          types={['geocode']}
          placeholder="Type your address!"
          initialValue={this.props.AddressSearch.address}
          onSuggestSelect={(loc) => {
            console.log('location selected')
            this.props.doAddressEntered(loc.label, loc.location.lat, loc.location.lng)
          }}
        />
      </Input>
      </form>
    )
  }
}
