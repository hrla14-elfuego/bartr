import { connect } from 'react-redux';
import UserProfile from '../components/UserProfile';

const mapStateToProps = (state) => {
  const { profile, error } = state.auth;
  
  return {
    profile,
    error
  }
}

// const mapDispatchToProps = (dispatch) => {

// }

const ProfileContainer = connect(mapStateToProps, null)(UserProfile);

export default ProfileContainer;