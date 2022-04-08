const GET_ALL_USERS = "search/GET_ALL_USERS";
// const GET_CHANNEL_USERS = "search/GET_CHANNEL_USERS";
const GET_ALL_USERS_RESULTS = "search/GET_ALL_RESULTS";
const CLEAR_SEARCH_INPUT  = "search/CLEAR_SEARCH_INPUT";
// const GET_ONE_USER = "search/GET_ONE_USER";
// const CREATE_ONE_USER = "search/CREATE_USER";
// const EDIT_ONE_USER = "search/EDIT_ONE_USER";
// const DELETE_ONE_USER = "search/DELETE_ONE_USER";

const loadAllUsers = (users) => ({ type: GET_ALL_USERS, users });
const loadChannelUsers = (users) => ({ type: GET_ALL_USERS, users});
const loadAllUsersResults = (results, searchInput) => ({ type: GET_ALL_USERS_RESULTS, results, searchInput });
const clearSearchInput = () => ({ type: CLEAR_SEARCH_INPUT });


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

export const loadChannelUsersResults = (channelId) => async (dispatch) => {
  const response = await fetch("/api/search/users-in-channel/?channelId="+channelId);
  if (response.ok) {
    const results = await response.json();
    dispatch(loadChannelUsers(results));
    return results;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const loadUsersResults = (searchInput) => async (dispatch) => {
  const response = await fetch("/api/search/users?searchInput="+searchInput);
  if (response.ok) {
    const results = await response.json();
    dispatch(loadAllUsersResults(results, searchInput));
    return results;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const resetSearchInput = () => async (dispatch) => {
  dispatch(clearSearchInput());
  return;
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

    case GET_ALL_USERS_RESULTS: {
      newState = { ...state };

      let users_results = action.results.users_results;

      newState['users_results'] = users_results;
      newState['search_input'] = action.searchInput

      return newState;
    }

    case CLEAR_SEARCH_INPUT: {
      newState = { ...state };

      newState['search_input'] = '';
      newState['users_results'] = [];

      return newState;
    }

    default:
      return state;
  }

};

export default searchReducer;
