import React from 'react';
import { Link } from 'react-router';
import { Button } from 'semantic-ui-react';
import { PageHeader } from 'react-bootstrap';
import './styles/styles.css';
 
const UserProfile = ({ profile, error }) => {
  return(
    <div>
      <div className='profileHeader'>
        <PageHeader>User Profile <small>Account Info</small></PageHeader>
        {/*<div className='userProfileHeader'>User Profile</div>*/}
      </div>
      <div className='userprofile'>
        <h2 style={{textAlign: 'center', fontSize: '50px', fontFamily: 'Papyrus, fantasy'}}>{profile.name ? 'Hello, ' + profile.name : null}</h2>
        <img src={profile.picture_large} height="200px" />
        <br/>
        <h1 style={{margin: 'auto'}}><Link to='editprofile'><Button>Edit Profile</Button></Link></h1>
      </div>
    </div>
  )
}

export default UserProfile;