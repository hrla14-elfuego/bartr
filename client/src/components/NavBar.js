import React from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import './styles/styles.css';

const NavBar = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) => {
// console.log(state);
  return (
    <div>
      <h1 className='left'>
        <Link to='/'>BARTR</Link>
      </h1>
      <h1 className='right'>
        <Link to='profile'>Profile</Link>
      </h1>
      { !isAuthenticated ? (
        <button className='button' onClick={onLoginClick}>Login</button>
      ) : (
        <div>
          <img src={profile.picture} height="40px" />
          {/*<span>Welcome, {profile.nickname}</span>*/}
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