import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../store/modal";

import { loadChannel, editMessage, deleteMessage } from "../../store/channels";

import "../CreateChannelForm/CreateChannelForm.css";

const EditMessageForm = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const channel_id = useSelector((state) => state.modals.id);
  const user_id = useSelector((state) => state.session.user).id;
  const id = useSelector((state) => state.modals.messageId);

  useEffect(() => {
    dispatch(loadChannel(channel_id));
  }, [dispatch, channel_id]);

  const messageToEdit = useSelector(
    (state) => state.channels[channel_id].messages[id]
  );
  const [content, setContent] = useState(messageToEdit?.content);

  const updateContent = (e) => setContent(e.target.value);

  useEffect(() => {
    const validationErrors = [];

    if (content?.length === 0) validationErrors.push("");
    if (content?.length > 12000)
      validationErrors.push("Your message is too long.");

    setErrors(validationErrors);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let editedMessage = {
      id,
      user_id,
      channel_id,
      content,
    };

    if (editedMessage) {
      await dispatch(editMessage(editedMessage)).then(() =>
        dispatch(loadChannel(channel_id))
      );
      setErrors([]);
      dispatch(hideModal());
    }
  };

  return (
    <div className="CreateChannelFormWrapper">
      <div className="CreateChannelFormHeader">
        <h1>Edit Message</h1>
      </div>
      <div className="CreatChannelFormBody">
        <form onSubmit={handleSubmit}>
          <div className="CreateChannelFormErrors">{errors}</div>
          <input type="hidden" value={user_id} />
          <input type="hidden" value={channel_id} />
          <textarea
            type="text"
            required
            placeholder="Message"
            value={content}
            onChange={updateContent}
          />
          <div className="UpdateMessageButtonContainer">
            <div className="UpdateMessageButton">
              <button type="submit" disabled={errors.length > 0}>
                Update
              </button>
            </div>
            <div className="DeleteMessageButton">
              <button
                onClick={async () => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this message?"
                    )
                  ) {
                    await dispatch(deleteMessage(channel_id, id)).then(() =>
                      dispatch(loadChannel(channel_id))
                    );
                  }
                }}
              >
                Delete
              </button>
              {/* <button
                onClick={async () => {
                  await dispatch(deleteMessage(channel_id, id)).then(() =>
                    dispatch(loadChannel(channel_id))
                  );
                }}
              >
                Delete
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMessageForm;
