import React from 'react';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, MenuItem, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import './styles/styles.css';

const NavBar = ({ isAuthenticated, profile, error, onLoginClick, onLogoutClick }) => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
        <Link to='/'>BARTR</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav className='navbar'>
          { !isAuthenticated ? (
            <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} onClick={onLoginClick}>Login / Sign Up</MenuItem>
            </NavDropdown>
          ) : (
            <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
              {/*<LinkContainer to='profile'>*/}
              <MenuItem eventKey={3.1}><Link to='profile'>Profile</Link></MenuItem>
              {/*</LinkContainer>*/}
              <MenuItem divider />
              <MenuItem eventKey={3.2} onClick={onLogoutClick}>Logout</MenuItem>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;