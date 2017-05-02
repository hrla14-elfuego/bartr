import axios from 'axios';

export function searchLocation() {
  const url = 'https://jsonplaceholder.typicode.com/photos';
  let info;
  axios.get(url)
    .then(res => {
      info = res;
      console.log(res)
    })
  // console.log(info);

  return {
    type: 'SEARCH',
    payload: info
  }
}

export function getProfile() {
  var profileData;
  axios.get('/api/users')
    .then(res => {
      // console.log(res.data);
      profileData = res.data;
    })
  return {
    type: 'GET_PROFILE',
    payload: profileData
  }
}