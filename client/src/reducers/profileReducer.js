const ProfileReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      return action.payload.profileData;
    default: return state;
  }
};

export default ProfileReducer;