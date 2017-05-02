import React from 'react';
import { Link } from 'react-router';
 
class UserProfile extends React.Component {
  render() {
    return(
      <div>
        <h1>
          User Profile!
        </h1>
        <Link to='editprofile'>Edit Profile</Link>
        <br/>
        <Link to='pastengagements'>Past Engagements</Link>
      </div>
    )
  }
}

export default UserProfile;