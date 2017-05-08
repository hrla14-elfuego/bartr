import { connect } from 'react-redux';
import UserProfile from '../components/UserProfile';
import * as authSelectors from '../auth/Auth0Selectors'

const mapStateToProps = (state) => {
  
  return {
    profile: authSelectors.getProfile(state),
    error: authSelectors.getError(state),
  }
};

// const mapDispatchToProps = (dispatch) => {

// }

const ProfileContainer = connect(mapStateToProps, null)(UserProfile);

export default ProfileContainer;