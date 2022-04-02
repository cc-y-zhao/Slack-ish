const GET_CHANNELS = 'channels/GET_CHANNELS'
const GET_CHANNEL = 'channels/GET_CHANNEL'
const CREATE_CHANNELS = 'channels/CREATE_CHANNELS'
const EDIT_CHANNELS = 'channels/EDIT_CHANNELS'
const DELETE_CHANNELS = 'channels/EDIT_CHANNELS'

const loadChannels = (channels) => ({ type: CREATE_CHANNELS, channels })
const loadChannel = (channel) => ({ type: GET_CHANNEL, channel })
const createChannels = (create_channels) => ({ type: CREATE_CHANNELS, create_channels })
const editChannels = (edit_channels) => ({ type: EDIT_CHANNELS, edit_channels })
const deleteChannels = (delete_channels) => ({ type: DELETE_CHANNELS, delete_channels })
