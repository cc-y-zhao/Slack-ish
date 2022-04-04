// const CREATE_ONE_MESSAGE = "messages/CREATE_ONE_MESSAGE";
// // const EDIT_ONE_MESSAGE = "messages/EDIT_ONE_MESSAGE";

// const createOneMessage = (message) => ({ type: CREATE_ONE_MESSAGE, newMessage: message });
// // const editOneMessage = (message) => ({ type: EDIT_ONE_MESSAGE, editedMessage: message });

// export const createMessage = (channel_id, message) => async (dispatch) => {
//     const response = await fetch(`/api/messages/${channel_id}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(message),
//     });
//     if (response.ok) {
//       const newMessage = await response.json();
//       dispatch(createOneMessage(newMessage));
//       return newMessage;
//     } else {
//       const errors = await response.json();
//       return errors;
//     }
//   };

// //   export const editChannel = (editedChannel) => async (dispatch) => {
// //     console.log("editing channel", editedChannel);
// //     console.log("editing channel id------", editedChannel.id);

// //     const response = await fetch(`/api/channels/${editedChannel.id}`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(editedChannel),
// //     });

// //     if (!response.ok) {
// //       return response.errors;
// //     }
// //     const updatedChannel = await response.json();

// //     dispatch(editOneChannel(updatedChannel));
// //     return updatedChannel;

// let initialState = {}
// export const messageReducer = (state = initialState, action ) => {
//     let newState;
// }
