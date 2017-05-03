// console.log("hi")
var ProfileReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      console.log('this is action: ', action.payload)
      return action.payload;
    default:
      return state;
  }
};

export default ProfileReducer;