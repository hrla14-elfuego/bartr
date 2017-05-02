import { getProfile } from '../actions/actionCreator';

const action = (getProfile());

const ProfileReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      console.log(action, state)
      return action.payload.profileData;
    default: return state;
  }
};

export default ProfileReducer;