const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';
const SET_CURRENT_MODAL = 'SET_CURRENT_MODAL';
const SET_CURRENT_ADD_MEMBERS_TO_CHANNEL_MODAL = 'SET_CURRENT_ADD_MEMBERS_TO_CHANNEL_MODAL';
const SET_MODAL_MOUNT = 'SET_MODAL_MOUNT';

export const showModal = () => ({
  type: SHOW_MODAL,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

export const setCurrentModal = (jsxComponent) => ({
  type: SET_CURRENT_MODAL,
  payload: jsxComponent
})

export const setAddMembersToChannelModal = (jsxComponent, channelId) => ({
  type: SET_CURRENT_ADD_MEMBERS_TO_CHANNEL_MODAL,
  payload: jsxComponent,
  channelId
})

export const setModalMount = (mount) => ({
  type: SET_MODAL_MOUNT,
  payload: mount
})

const initialState = {
  currentModal: null,
  currentAddMembersToChannelModal: null,
  modalMount: null,
  modalDisplay: false
}


export default function modals(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
    return {
      ...state,
      modalDisplay: true
    }

    case HIDE_MODAL:
      return {
      ...state,
      modalDisplay: false
    }

    case SET_CURRENT_MODAL:
      return {
        ...state,
        currentModal: action.payload,
      }

    case SET_CURRENT_ADD_MEMBERS_TO_CHANNEL_MODAL:
      return {
        ...state,
        currentAddMembersToChannelModal: action.payload,
        channelId: action.channelId,
      }

    case SET_MODAL_MOUNT:
    return {
      ...state,
      modalMount: action.payload,
    }

    default:
      return state
  }

}
