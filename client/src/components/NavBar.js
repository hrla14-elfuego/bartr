import React from 'react';
import { Link } from 'react-router';
import './styles/styles.css';

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <h1 className='left'>
          <Link to='/'>BARTR</Link>
        </h1>
        <h1 className='right'>
          <Link to='profile'>Profile</Link>
          <Link to='login'>Login</Link>
        </h1>
      </div>
    )
  }
}

export default NavBar;