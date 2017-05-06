import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, MenuItem, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import './styles/styles.css';
import { hashHistory } from 'react-router';
import { loginRequest, loginSuccess, logoutSuccess, setToken } from '../actions/auth0';
import { emitr } from '../utils/AuthService';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.logoutSequence = this.logoutSequence.bind(this);
  }

  componentDidMount() {
    emitr.on('login_sequence_complete', (val) => {
      this.props.loginSuccess(val.profile);
      hashHistory.push('/');
    })
  }

  logoutSequence() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.props.onLogoutClick();
    hashHistory.push('/');
    alert('Logout Successful!');
    console.log('invoked');
  }

  render() {
    console.log('this.props in navbar: ', this.props);
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
              { !this.props.isAuthenticated ? (
                <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={this.props.onLoginClick}>Login / Sign Up</MenuItem>
                </NavDropdown>
              ) : (
                <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                  {/*<LinkContainer to='profile'>*/}
                  <MenuItem eventKey={3.1}><Link to='profile'>Profile</Link></MenuItem>
                  <MenuItem eventKey={3.2}><Link to='pastengagements'>Past Engagements</Link></MenuItem>
                  <MenuItem eventKey={3.3}><Link to='currentengagements'>Current Engagements</Link></MenuItem>
                  {/*</LinkContainer>*/}
                  <MenuItem divider />
                  <MenuItem eventKey={3.4} onClick={this.logoutSequence}>Logout</MenuItem>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated, profile, error } = state.auth;
  return {
    isAuthenticated,
    profile,
    error
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('mapping dispatch to props');
  return {
    onLoginClick: () => dispatch(loginRequest()),
    onLogoutClick: () => dispatch(logoutSuccess()),
    loginSuccess: (profile) => dispatch(loginSuccess(profile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

// export default NavBar;