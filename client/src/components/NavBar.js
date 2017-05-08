import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, MenuItem, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import './styles/styles.css';
import { hashHistory } from 'react-router';
import { loginRequest, loginSuccess, logoutSuccess, setToken } from '../actions/auth0';
import { emitr } from '../utils/AuthService';
import swal from 'sweetalert'

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
    swal({
      title: 'Logout Successful!',
      type: 'success'
    });
  }

  render() {
      return (
        <Navbar fluid fixedTop style={{backgroundColor: 'black', border: '0.15em solid #909090'}} inverse collapseOnSelect>
            <Navbar.Brand>
            <Link to='/home'>BARTR</Link>
            </Navbar.Brand>
          <Navbar.Collapse>
            <Nav pullRight>
              { !this.props.isAuthenticated ? (
                <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={this.props.onLoginClick}><Icon name='arrow circle outline right'/>Login / Sign Up</MenuItem>
                </NavDropdown>
              ) : (
                <NavDropdown eventKey={3} title={<span><Icon size='large' name='list layout'/></span>} id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={() => hashHistory.push('profile')}><Icon name='user'/>Profile</MenuItem>
                  <MenuItem eventKey={3.2} onClick={() => hashHistory.push('pastengagements')}><Icon name='calendar'/>Past Engagements</MenuItem>
                  <MenuItem eventKey={3.3} onClick={() => hashHistory.push('currentengagements')}><Icon name='comments'/>Current Engagements</MenuItem>
                  <MenuItem eventKey={3.4} onClick={() => hashHistory.push('map')}><Icon name='map'/>Map</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.5} onClick={this.logoutSequence}><Icon name='log out'/>Logout</MenuItem>
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
  return {
    onLoginClick: () => dispatch(loginRequest()),
    onLogoutClick: () => dispatch(logoutSuccess()),
    loginSuccess: (profile) => dispatch(loginSuccess(profile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
