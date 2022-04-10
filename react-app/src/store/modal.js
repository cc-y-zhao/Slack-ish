const SHOW_MODAL = "SHOW_MODAL";
const HIDE_MODAL = "HIDE_MODAL";
const SET_CURRENT_MODAL = "SET_CURRENT_MODAL";
const SET_MODAL_MOUNT = "SET_MODAL_MOUNT";

export const showModal = () => ({
  type: SHOW_MODAL,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

export const setCurrentModal = (jsxComponent) => ({
  type: SET_CURRENT_MODAL,
  payload: jsxComponent,
});

export const setCurrentEditModal = (jsxComponent, id, messageId) => ({
  type: SET_CURRENT_MODAL,
  payload: jsxComponent,
  id,
  messageId,
});

export const setModalMount = (mount) => ({
  type: SET_MODAL_MOUNT,
  payload: mount,
});

// **SEARCH MODAL**
const SHOW_SEARCH_MODAL = "SHOW_SEARCH_MODAL";
const HIDE_SEARCH_MODAL = "HIDE_SEARCH_MODAL";
const SET_CURRENT_SEARCH_MODAL = "SET_CURRENT_SEARCH_MODAL";
const SET_SEARCH_MODAL_MOUNT = "SET_SEARCH_MODAL_MOUNT";

export const showSearchModal = () => ({
  type: SHOW_SEARCH_MODAL,
});

export const hideSearchModal = () => ({
  type: HIDE_SEARCH_MODAL,
});

export const setCurrentSearchModal = (jsxComponent) => ({
  type: SET_CURRENT_SEARCH_MODAL,
  payload: jsxComponent,
});

export const setSearchModalMount = (mount) => ({
  type: SET_SEARCH_MODAL_MOUNT,
  payload: mount,
});

// **ADD MEMBERS TO CHANNEL SEARCH MODAL**
export const setAddMembersChannelSearchModal = (jsxComponent, channelId) => ({
  type: SET_CURRENT_SEARCH_MODAL,
  payload: jsxComponent,
  channelId,
});

export const setChannelUsersSearchModal = (jsxComponent, channelId) => ({
  type: SET_CURRENT_SEARCH_MODAL,
  payload: jsxComponent,
  channelId,
});

const initialState = {
  currentModal: null,
  currentSearchModal: null,
  modalMount: null,
  searchModalMount: null,
  modalDisplay: false,
  searchDisplay: false,
};

export default function modals(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalDisplay: true,
      };

    case HIDE_MODAL:
      return {
        ...state,
        modalDisplay: false,
      };

    case SET_CURRENT_MODAL:
      return {
        ...state,
        currentModal: action.payload,
        id: action.id,
        messageId: action.messageId,
      };

    case SET_MODAL_MOUNT:
      return {
        ...state,
        modalMount: action.payload,
      };

    //**SEARCH MODAL **//
    case SHOW_SEARCH_MODAL:
      return {
        ...state,
        searchDisplay: true,
      };

    case HIDE_SEARCH_MODAL:
      return {
        ...state,
        searchDisplay: false,
      };

    case SET_CURRENT_SEARCH_MODAL:
      return {
        ...state,
        currentSearchModal: action.payload,
        channelId: action.channelId,
      };

    case SET_SEARCH_MODAL_MOUNT:
      return {
        ...state,
        searchModalMount: action.payload,
      };

    default:
      return state;
  }
}
