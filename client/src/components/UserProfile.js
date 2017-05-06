import React from 'react';
import { Link } from 'react-router';
import { Button } from 'semantic-ui-react';
 
const UserProfile = ({ profile, error }) => {
  console.log('this is userprofile PROFILE: ', profile)
  return(
    <div>
      <h1 style={{textAlign: 'center', fontSize: '50px'}}>{profile.name ? 'Hello, ' + profile.name : null}</h1>
      <img src={profile.picture_large} height="200px" />
      <br/>
      <h1 style={{margin: 'auto'}}><Link to='editprofile'><Button>Edit Profile</Button></Link></h1>
    </div>
  )
}

export default UserProfile;