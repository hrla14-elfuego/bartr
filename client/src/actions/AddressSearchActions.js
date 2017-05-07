import * as action from './actionTypes';

export function addressEntered(formatted_address, lat, long) {
  return {
    type: action.ADDRESS_ENTERED,
    address: formatted_address,
    lat: lat,
    long: long
  }
}