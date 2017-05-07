import * as addressAction from '../actions/actionTypes';

export default function AddressSearchReducer(state = null, action) {
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