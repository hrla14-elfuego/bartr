import * as addressAction from '../actions/actionTypes';

var initialAddress = {
  address: "6060 Center Drive, Los Angeles, CA, United States",
  lat: 33.9759435,
  long: -118.39072899999996
}

export default function AddressSearchReducer(state = initialAddress, action) {
  switch(action.type) {
    case addressAction.ADDRESS_ENTERED:
      console.log('reducer handling address entered action');
      return {
        address: action.address,
        lat: action.lat,
        long: action.long
      };
    default:
      return state;
  }
}
