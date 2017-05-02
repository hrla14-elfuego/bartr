// console.log("hi")
var ProfileReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      // console.log("this is action.payload.profileData in profilereducer line 4",action.payload.data)
      return action.payload.data
      
    default: return state;
  }
};

export default ProfileReducer;