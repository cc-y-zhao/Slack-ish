const GET_ALL_USERS = "search/GET_ALL_USERS";
// const GET_ONE_USER = "search/GET_ONE_USER";
// const CREATE_ONE_USER = "search/CREATE_USER";
// const EDIT_ONE_USER = "search/EDIT_ONE_USER";
// const DELETE_ONE_USER = "search/DELETE_ONE_USER";

const loadAllUsers = (users) => ({ type: GET_ALL_USERS, users });


export const loadUsers = () => async (dispatch) => {
  const response = await fetch(`/api/search/`);

  if (response.ok) {
    const users = await response.json();

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

      let users_dict = {}

      action.users.users.forEach((user) => {
        users_dict[user.id] = user;
      });

      newState['users'] = users_dict;
      newState['users_list'] = action.users.users
      return newState;
    }

    default:
      return state;
  }

};

export default searchReducer;
