import React, { Component } from 'react';
import ServiceMap from '../components/ServiceMap';
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    AddressSearch: state.AddressSearch
  }
};

class GoogleMapsContainer extends Component {
  render() {
    return (
      <div>
        <ServiceMap />
      </div>
    )
  }
}

const ServiceMapWithData = connect(
  mapStateToProps
)(ServiceMap);

export default ServiceMapWithData