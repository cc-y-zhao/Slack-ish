const GET_ALL_CHANNELS = 'channels/GET_ALL_CHANNELS'
const GET_ONE_CHANNEL = 'channels/GET_ONE_CHANNEL'
const CREATE_ONE_CHANNEL = 'channels/CREATE_CHANNEL'
const EDIT_ONE_CHANNEL = 'channels/EDIT_ONE_CHANNEL'
const DELETE_ONE_CHANNEL = 'channels/EDIT_ONE_CHANNEL'

const loadChannels = (channels) => ({ type: GET_ALL_CHANNELS, channels })
const loadChannel = (channel) => ({ type: GET_ONE_CHANNEL, channel })
const createOneChannel = (channel) => ({ type: CREATE_ONE_CHANNEL, newChannel: channel })
const editChannels = (channel) => ({ type: EDIT_ONE_CHANNEL, editedChannel: channel })
const deleteChannels = (channel) => ({ type: DELETE_ONE_CHANNEL, deletedChannel: channel })


export const createChannel = (channel) => async (dispatch) => {
  const response = await fetch('/api/channels/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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





let initialState = {};

const channelsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_CHANNELS: {
      newState = { ...state };
      action.channels.forEach((channel) => {
        newState[channel.id] = channel;
      });
      return newState;
    }

    case CREATE_ONE_CHANNEL: {
      return { [action.newChannel.id]: action.newChannel, ...state };
    }

    case EDIT_ONE_CHANNEL: {
      return { [action.editedChannel.id]: action.editedChannel, ...state };
    }

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
