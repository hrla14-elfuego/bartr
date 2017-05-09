import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, MenuItem, NavItem, NavDropdown, Nav } from 'react-bootstrap';
import { Icon } from 'semantic-ui-react';
import './styles/styles.css';
import { hashHistory } from 'react-router';
// import { loginRequest, loginSuccess, logoutSuccess, setToken } from '../actions/Auth0Actions';
import { emitr } from '../utils/Auth0Utils';
import swal from 'sweetalert'
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/Auth0Actions'
import * as authSelectors from '../auth/Auth0Selectors'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Navbar style={{backgroundColor: "black", border: '1px solid gray'}} inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
            <Link to='/home'>BARTR</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              { !this.props.profile ? (
                <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={this.props.actions.loginRequest}><Icon name='arrow circle outline right'/>Login / Sign Up</MenuItem>
                </NavDropdown>
              ) : (
                <NavDropdown eventKey={3} title={<span><Icon size='large' name='list layout'/></span>} id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={() => hashHistory.push('profile')}><Icon name='user'/>Profile</MenuItem>
                  <MenuItem eventKey={3.2} onClick={() => hashHistory.push('pastengagements')}><Icon name='calendar'/>Past Engagements</MenuItem>
                  <MenuItem eventKey={3.3} onClick={() => hashHistory.push('currentengagements')}><Icon name='comments'/>Current Engagements</MenuItem>
                  <MenuItem eventKey={3.4} onClick={() => hashHistory.push('map')}><Icon name='map'/>Map</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.5} onClick={this.props.actions.logout}><Icon name='log out'/>Logout</MenuItem>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: authSelectors.getProfile(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
