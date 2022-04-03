const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";
const GET_ONE_CHANNEL = "channels/GET_ONE_CHANNEL";
const CREATE_ONE_CHANNEL = "channels/CREATE_CHANNEL";
const EDIT_ONE_CHANNEL = "channels/EDIT_ONE_CHANNEL";
const DELETE_ONE_CHANNEL = "channels/EDIT_ONE_CHANNEL";

const loadAllChannels = (channels) => ({ type: GET_ALL_CHANNELS, channels });
const loadOneChannel = (channel) => ({ type: GET_ONE_CHANNEL, channel });
const createOneChannel = (channel) => ({
  type: CREATE_ONE_CHANNEL,
  newChannel: channel,
});
const editChannels = (channel) => ({
  type: EDIT_ONE_CHANNEL,
  editedChannel: channel,
});
const deleteOneChannel = (channel) => ({
  type: DELETE_ONE_CHANNEL,
  deletedChannel: channel,
});

export const loadChannels = () => async (dispatch) => {
  // console.log("owner_id in loadChannels---------", owner_id)
  const response = await fetch(`/api/channels/`);
  if (response.ok) {
    const channels = await response.json();
    // console.log("channels in loadChannels---------", channels)
    dispatch(loadAllChannels(channels.channels));
    return channels;
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

    case CREATE_ONE_CHANNEL: {
      return { [action.newChannel.id]: action.newChannel, ...state };
    }

    // case EDIT_ONE_CHANNEL: {
    //   return { [action.editedChannel.id]: action.editedChannel, ...state };
    // }

    case DELETE_ONE_CHANNEL: {
      newState = { ...state };
      delete newState[action.deletedChannel.id];
      return newState;
    }
    default:
      return state;
  }
};

export default channelsReducer;
