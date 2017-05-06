import axios from 'axios';

export const GET_SERVICES = 'GET_SERVICES';

export function getServices() {
  let services = axios.get(API_ENDPOINT + '/api/services')
    .then(res => {
      console.log(res)
    })
  return {
    type: 'GET_SERVICES',
    services
  }
}

export function getProfile() {
  let profileData = axios.get(API_ENDPOINT + '/api/users')
  return {
    type: 'GET_PROFILE',
    payload: profileData
  }
}