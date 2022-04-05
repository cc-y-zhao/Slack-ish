const GET_ALL_USERS = "search/GET_ALL_USERS";
// const GET_ONE_USER = "search/GET_ONE_USER";
// const CREATE_ONE_USER = "search/CREATE_USER";
// const EDIT_ONE_USER = "search/EDIT_ONE_USER";
// const DELETE_ONE_USER = "search/DELETE_ONE_USER";

const loadAllUsers = (users) => ({ type: GET_ALL_USERS, users });


export const loadUsers = () => async (dispatch) => {
  const response = await fetch(`/api/search/`);
  console.log('this is our response in our thunk of search ', response)
  if (response.ok) {
    const users = await response.json();
    console.log('this is our user from our if statement in our thunk of search ', users)
    dispatch(loadAllUsers(users));
    return users;
  } else {
    const errors = await response.json();
    return errors;
  }
};

let initialState = {};

const searchReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_ALL_USERS: {
      newState = { ...state };
      // console.log('actions.channels in channelsReducer-------', action.channels)
      // console.log('typeof actions.channels in channelsReducer-------', typeof action.channels === Array)
      action.users.users.forEach((user) => {
        newState[user.id] = user;
      });
      // console.log('newState in channelsReducer-------', newState)
      console.log('this ist the newstate after the forEach in the reducer', newState);
      return newState;
    }





    default:
      return state;
  }




};

export default searchReducer;
