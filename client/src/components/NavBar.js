import React from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import './styles/styles.css';

const NavBar = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) => {
console.log(profile);
  return (
    <div>
      <h1 className='left'>
        <Link to='/'>BARTR</Link>
      </h1>
      { !isAuthenticated ? (
        <button className='button' onClick={onLoginClick}>Login / Sign Up</button>
      ) : (
        <div>
          <h1>
            <Link to='profile'>Profile</Link>
          </h1>
          {/*<span>Welcome, {profile.nickname}</span>*/}
          {/*<Link>Current Engagements</Link>*/}
          <button className='button' onClick={onLogoutClick}>Logout</button>
        </div>
      )}
      { error &&
        <p>{error}</p>
      }
    </div>
  )
}

export default NavBar;