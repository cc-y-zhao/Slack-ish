const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";
const GET_ONE_CHANNEL = "channels/GET_ONE_CHANNEL";
const CREATE_ONE_CHANNEL = "channels/CREATE_CHANNEL";
const EDIT_ONE_CHANNEL = "channels/EDIT_ONE_CHANNEL";
const DELETE_ONE_CHANNEL = "channels/DELETE_ONE_CHANNEL";
const CREATE_ONE_DM = "channels/CREATE_ONE_DM";

const createOneDm = (dm) => ({ type: CREATE_ONE_DM, dm });
const loadAllChannels = (channels) => ({ type: GET_ALL_CHANNELS, channels });
const loadOneChannel = (channel) => ({ type: GET_ONE_CHANNEL, channel });
const createOneChannel = (channel) => ({
  type: CREATE_ONE_CHANNEL,
  newChannel: channel,
});
const editOneChannel = (channel) => ({
  type: EDIT_ONE_CHANNEL,
  editedChannel: channel,
});
const deleteOneChannel = (channel) => ({
  type: DELETE_ONE_CHANNEL,
  deletedChannel: channel,
});

export const loadChannels = (user_id) => async (dispatch) => {
  // console.log("owner_id in loadChannels---------", owner_id)
  const response = await fetch(`/api/channels/user/${user_id}`);
  if (response.ok) {
    const channels = await response.json();
    // console.log("channels in loadChannels---------", channels);
    dispatch(loadAllChannels(channels.channels));
    return channels;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const loadChannel = (channel_id) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channel_id}`);

  if (response.ok) {
    const channel = await response.json();
    // console.log("single channel in loadChannel---------", channel);
    dispatch(loadOneChannel(channel));
    return channel;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createChannel = (channel) => async (dispatch) => {
  const response = await fetch("/api/channels/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(channel),
  });
  if (response.ok) {
    const newChannel = await response.json();
    dispatch(createOneChannel(newChannel));
    return newChannel;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const editChannel = (editedChannel) => async (dispatch) => {
  console.log("editing channel", editedChannel);
  console.log("editing channel id------", editedChannel.id);

  const response = await fetch(`/api/channels/${editedChannel.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedChannel),
  });

  if (!response.ok) {
    return response.errors;
  }
  const updatedChannel = await response.json();

  dispatch(editOneChannel(updatedChannel));
  return updatedChannel;

  // const response = await fetch(`api/channels/${editedChannel.id}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(editedChannel),
  // });

  // if (!response.ok) {
  //   return response.errors;
  // }
  // const editedChannel = await response.json();

  // dispatch(editOneChannel(editedChannel));
  // return editedChannel;
};

// export const editChannel = (editedChannel) => async (dispatch) => {

//   console.log("editedChannel in channels store--------", editedChannel)
//   const channel_id = editedChannel.id
//   const response = await fetch(`api/channels/${channel_id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(editedChannel),
//   });

//   if (!response.ok) {
//     return response.errors;
//   }
//   const editedChannel = await response.json();

//   dispatch(editOneChannel(editedChannel));
//   return editedChannel;
// };

export const deleteChannel = (channel_id) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channel_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deletedChannel = await response.json();
    dispatch(deleteOneChannel(deletedChannel));
    return deletedChannel;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const createDm = (session_user_id, search_user_id) => async dispatch => {
  const response = await fetch(`/api/channels/${session_user_id}/${search_user_id}`, {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
  })
  if (response.ok) {
    const createDm = await response.json();
    dispatch(createOneDm(createDm))
    return createDm
  } else {
    return response.json('Could not handle request')
  }
}
// **********************************MESSAGES**********************************************
// **********************************MESSAGES**********************************************
// **********************************MESSAGES**********************************************
// **********************************MESSAGES**********************************************

const CREATE_ONE_MESSAGE = "messages/CREATE_ONE_MESSAGE";
const EDIT_ONE_MESSAGE = "messages/EDIT_ONE_MESSAGE";
const DELETE_ONE_MESSAGE = "messages/DELETE_ONE_MESSAGE";

const createOneMessage = (channel_id, message) => ({
  type: CREATE_ONE_MESSAGE,
  newMessage: message,
  channel_id,
});

const editOneMessage = (message) => ({
  type: EDIT_ONE_MESSAGE,
  editedMessage: message,
});

const deleteOneMessage = (channel_id, message) => ({
  type: DELETE_ONE_MESSAGE,
  deletedMessage: message,
  channel_id,
});
// const editOneMessage = (message) => ({ type: EDIT_ONE_MESSAGE, editedMessage: message });

export const createMessage = (channel_id, message) => async (dispatch) => {
  // console.log("REDUCER CHANNEL ID~~~:", typeof channel_id);

  const response = await fetch(`/api/messages/${channel_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  if (response.ok) {
    const newMessage = await response.json();
    dispatch(createOneMessage(channel_id, newMessage));
    return newMessage;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const editMessage = (editedMessage) => async (dispatch) => {
  console.log("editing Message", editedMessage);
  console.log("editing Message id------", editedMessage.id);

  const response = await fetch(`/api/messages/${editedMessage.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedMessage),
  });

  if (!response.ok) {
    return response.errors;
  }
  const updatedMessage = await response.json();

  dispatch(editOneMessage(updatedMessage));
  return updatedMessage;
};

export const deleteMessage = (channel_id, message_id) => async (dispatch) => {
  const response = await fetch(`/api/messages/${message_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deletedMessage = await response.json();
    dispatch(deleteOneMessage(channel_id, deletedMessage));
    return deletedMessage;
  } else {
    const errors = await response.json();
    return errors;
  }
};

let initialState = {};

const channelsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_CHANNELS: {
      newState = { ...state };
      // console.log('actions.channels in channelsReducer-------', action.channels)
      // console.log('typeof actions.channels in channelsReducer-------', typeof action.channels === Array)
      action.channels.forEach((channel) => {
        newState[channel.id] = channel;
      });
      // console.log('newState in channelsReducer-------', newState)
      return newState;
    }

    case GET_ONE_CHANNEL: {
      newState = { ...state };
      newState[action.channel.id] = action.channel;
      // newState.current = action.channel.id; extra stuff for later on (highlighted channel sidebar)
      // console.log('newState in channelsReducer-------', newState)

      return newState;
    }

    case CREATE_ONE_CHANNEL: {
      return { [action.newChannel.id]: action.newChannel, ...state };
    }

    case CREATE_ONE_MESSAGE: {
      newState = { ...state };
      // console.log(
      //   "REDUCERACTAULY CHANNEL ID~~~:",
      //   newState[action.channel_id].messages
      // );
      // console.log("REDUCERACTAULY newMessage~~~:", action.newMessage.id);
      newState[action.channel_id].messages[action.newMessage.id] =
        action.newMessage;

      return newState;
    }

    case EDIT_ONE_MESSAGE: {
      newState = { ...state };
      console.log("action in EDIT ONE MESSAGE-----", action);
      newState[action.editedMessage.channel_id].messages[
        action.editedMessage.id
      ] = action.editedMessage;

      return newState;
    }

    case DELETE_ONE_MESSAGE: {
      newState = { ...state };
      // console.log('newState[action.channel_id]-------',
      //   newState[action.channel_id]);
      console.log("CHANNEL_ID IN DELETE_ONE_MESSAGE-------", action.channel_id);
      delete newState[action.channel_id].messages[action.deletedMessage.id];

      return newState;
    }

    case EDIT_ONE_CHANNEL: {
      newState = { ...state };
      newState[action.editedChannel.id] = action.editedChannel;
      return newState;
    }

    case DELETE_ONE_CHANNEL: {
      newState = { ...state };
      delete newState[action.deletedChannel.id];
      return newState;
    }

    case CREATE_ONE_DM: {
      return { [action.dm.id]: action.dm, ...state };
    }

    default:
      return state;
  }
};

export default channelsReducer;
